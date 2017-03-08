// C: comments.
// 0:DomainAuthorityFeature_DUMultiInstanceUrlV2_0_10
// 1:DomainAuthorityFeature_DUMultiInstanceUrlV2_0_12
// 2:DomainAuthorityFeature_DUMultiInstanceUrlV2_0_11
// 3:DomainAuthorityFeature_DUMultiInstanceUrlV2_0_9
// 4:DomainAuthorityFeature_DUMultiInstanceUrlV2_0_13
// 5:UrlDepth
// 6:OnlineMemoryUrlFeature_0
// include <\data\TLARanking\xliu\FusionV1\MicroSegmentUtils-20170216.js>

//------------------------------------------------ Book Match Condition Config - Begin ------------------------------------------------
var c_SubIntentId_BookSingleEntity = 401;
var c_SubIntentId_BookOthers = 402;

var intentMatchCondition = [];
intentMatchCondition[c_SubIntentId_BookSingleEntity] = [0, 1, 0];
intentMatchCondition[c_SubIntentId_BookOthers] = [0, 1, 0];

var constraintMatchCondition = [];
constraintMatchCondition[c_SubIntentId_BookSingleEntity] = [3, 3, 3, 3, 3];
constraintMatchCondition[c_SubIntentId_BookOthers] = [3, 3, 3, 3, 3];
//------------------------------------------------ Book Match Condition Config - End ------------------------------------------------

//------------------------------------------------ Constant Define - Begin ------------------------------------------------
var c_subIntentIdQLF = 2662;
var c_subIntentScoreQLF = 2663;

//Feature Ids
var c_FeatureId_PEScoreTopSite = 0;
var c_FeatureId_PEScoreConstraint = 1;
var c_FeatureId_PEScoreGuarding = 2;
var c_FeatureId_PEScoreLowQuality = 3;
var c_FeatureId_PEScoreDiversity = 4;
var c_FeatureId_UrlDepth = 5;
var c_FeatureId_RankomaticScore = 6;

//Marker Ids
var c_MarkerId_WordCandidatePresence_MultiInstanceTitle = 9;
var c_MarkerId_WordCandidatePresence_Body = 11;

//Intermediate Feature Value
var c_officialSiteScore = 100;
var c_entityMatchScore_1st = 20000;
var c_entityMatchScore_2nd = 15000;
var c_entityMatchScore_3rd = 10000;
var c_entityMatchScore_4th = 5000;
var c_intentMatchScore_1st = 3000;
var c_intentMatchScore_2nd = 2000;
var c_intentMatchScore_3rd = 1000;
var c_constraintMatchScore_1st = 800;
var c_constraintMatchScore_2nd = 600;
var c_constraintMatchScore_3rd = 400;
var c_constraintMatchScore_4th = 200;
var c_constraintMatchScoreOpposed = 1;
var c_guardingScore = 1000;

// Postweb Slot Tagging Threshold
var c_PostwebConstraintTitleTop5Thres = 3;
var c_PostwebConstraintTitleTop10Thres = 5;
var c_PostwebConstraintBodyTop5Thres = 4;
var c_PostwebConstraintBodyTop10Thres = 8;

//Other Setting
var c_maxCaptionCharLength = 512;
var c_officialSiteDPThres = 5;
var c_entityMatchScoreThres_LB = c_entityMatchScore_4th;

// Stopwords used in PostWeb Slot Tagging
var c_stopWordsList = new Array("about", "an", "and", "are", "as", "at", "be", "but", "by", "com", "for", "from", "how", "if", "in", "is", "it", "of", "on", "or", "that", "the", "this", "to", "was", "what", "when", "where", "which", "who", "will", "with", "would", "www", "a", "i", "your", "s", "com", "book", "books", "novel", "novels", "the", "a", "an", "full", "short", "brief", "complete", "story", "poem", "series", "read", "buy");

var c_baseFusionScore=-8.0;
var c_entityMatchFusionScore=0.75;
var c_intentMatchFusionScore=0.75;
var c_constraintMatchFusionScore=0.75;
var c_authorityFusionScore=0.75;
//------------------------------------------------ Constant Define - End ------------------------------------------------

var msSemanticFrame;

if (!addquerylist.IsEmpty()) {
    for (var addquery = addquerylist.top; !addquery.IsNull() ; addquery = addquery.next) {
        if (addquery.name == "MSSemanticFrame") {
            msSemanticFrame = addquery.value;
            break;
        }
    }
}

var documentCount = documents.count;
if (IsNull(msSemanticFrame)) {
    AssignAbstentionSegmentScore();
}
else {
    var subIntentId = qlfs[c_subIntentIdQLF];
    var subIntentScore = qlfs[c_subIntentScoreQLF];

    var query = extractedquery;

    var MSSFDecodeResult = MSSFDecode(msSemanticFrame);
    var wordDropQuery = query.replace(/word:\("?(\w+)[^\)]+\)/g, "$1").replace(/rankonly:/g, "");
    var queryTermArray = wordDropQuery.split(" ");
    if (subIntentId == c_SubIntentId_BookOthers && queryTermArray.length > 10) {
        AssignAbstentionSegmentScore();
    }
    else {
        var queryTermDict = {};
        for (var i = 0, len = queryTermArray.length; i < len; i++) {
            var term = queryTermArray[i];
            if (IsNull(queryTermDict[term])) {
                queryTermDict[term] = i;
            }
        }

        var matchDataArray = [];
        for (var i = 0, len = documentCount; i < len; ++i) {
            var curDoc = documents[i];
            var markerVector = curDoc.markers;

            var title = curDoc.rawtitle;
            var url = curDoc.url;
            var snippet = curDoc.rawsnippet;

            title = IsNull(title) ? "" : StreamNormalization(title);
            url = IsNull(url) ? "" : url.toLowerCase().substring(0, c_maxCaptionCharLength);
            snippet = IsNull(snippet) ? "" : StreamNormalization(snippet);

            var wordFoundTitleArray = ParseWordCandidatePresence(markerVector[c_MarkerId_WordCandidatePresence_MultiInstanceTitle]);
            var wordFoundBodyArray = ParseWordCandidatePresence(markerVector[c_MarkerId_WordCandidatePresence_Body]);
            var matchData = new MatchData(title, url, snippet, wordFoundTitleArray, wordFoundBodyArray);
            matchDataArray.push(matchData);
        }        
        MainRanker(subIntentId, subIntentScore, MSSFDecodeResult, matchDataArray, intentMatchCondition[subIntentId], constraintMatchCondition[subIntentId], documents, documentCount);
    }
}

//------------------------------------------------ Post-web Slot Tagging - Begin ------------------------------------------------
function PostWebSlotTagging_Local(MSSFDecodeResult, query, matchDataArray) {
    var filterTermDict = {};
    var i, j, len, code, termCount, termArray;
    var stopWordsList = c_stopWordsList;
    for (i = 0, len = stopWordsList.length; i < len; i++) {
        code = GenerateHashCode(stopWordsList[i]);
        filterTermDict[code] = 1;
    }
    for (i = 0, len = MSSFDecodeResult.entity.length; i < len; i++) {
        termArray = MSSFDecodeResult.entity[i].text.split(' ');
        for (j = 0, termCount = termArray.length; j < termCount; j++) {
            code = GenerateHashCode(termArray[j]);
            filterTermDict[code] = 1;
        }
    }
    for (i = 0, len = MSSFDecodeResult.constraint.length; i < len; i++) {
        termArray = MSSFDecodeResult.constraint[i].original.split(' ');
        for (j = 0, termCount = termArray.length; j < termCount; j++) {
            code = GenerateHashCode(termArray[j]);
            filterTermDict[code] = 1;
        }
    }
    for (i = 0, len = MSSFDecodeResult.siteConstraint.length; i < len; i++) {
        termArray = MSSFDecodeResult.siteConstraint[i].split(' ');
        for (j = 0, termCount = termArray.length; j < termCount; j++) {
            code = GenerateHashCode(termArray[j]);
            filterTermDict[code] = 1;
        }
    }
    for (i = 0, len = MSSFDecodeResult.otherSlots.length; i < len; i++) {
        termArray = MSSFDecodeResult.otherSlots[i].split(' ');
        for (j = 0, termCount = termArray.length; j < termCount; j++) {
            code = GenerateHashCode(termArray[j]);
            filterTermDict[code] = 1;
        }
    }

    var candidateListTemp = query.split(' ');
    var candidateList = [];
    for (i = 0, len = candidateListTemp.length; i < len; i++) {
        var candidate = candidateListTemp[i];
        if (candidate !== "" && IsNull(filterTermDict[GenerateHashCode(candidate)])) {
            candidateList.push(new CandidateTermClass(candidate));
        }
    }

    var maxDRScore = 0;
    var drScoreTop1MatchData = matchDataArray[0];
    var top1MatchData = matchDataArray[0];
    var candCount = candidateList.length;
    var curCandidate, curCandTerm;
    for (i = 0, len = documentCount; i < len; ++i) {
        if (i >= 10) {
            break;
        }
        var matchData = matchDataArray[i];
        for (j = 0; j < candCount; j++) {
            curCandidate = candidateList[j];
            curCandTerm = curCandidate.term;
            var isCandidateMatchTitle = WordsFoundForTitleSnippet_Local(curCandTerm, matchData.wordFoundTitleArray, matchData.title) == 1;
            var isCandidateMatchSnippet = WordsFoundForTitleSnippet_Local(curCandTerm, matchData.wordFoundBodyArray, matchData.snippet) == 1;

            if (isCandidateMatchTitle) {
                if (i < 5) {
                    curCandidate.titleTop5Count++;
                }
                curCandidate.titleTop10Count++;
            }
            if (isCandidateMatchSnippet) {
                if (i < 5) {
                    curCandidate.bodyTop5Count++;
                }
                curCandidate.bodyTop10Count++;
            }
        }

        var drScore = documents[i].l2score;
        if (drScore > maxDRScore) {
            maxDRScore = drScore;
            drScoreTop1MatchData = matchData;
        }
    }

    for (j = 0; j < candCount; j++) {
        curCandidate = candidateList[j];
        if (curCandidate.titleTop5Count >= c_PostwebConstraintTitleTop5Thres || curCandidate.titleTop10Count >= c_PostwebConstraintTitleTop10Thres || curCandidate.bodyTop5Count >= c_PostwebConstraintBodyTop5Thres || curCandidate.bodyTop10Count >= c_PostwebConstraintBodyTop10Thres) {
            curCandTerm = curCandidate.term;
            MSSFDecodeResult.constraint.push(new ConstraintClass(curCandTerm, "", "", ""));
        }
    }
    return MSSFDecodeResult;
}

//------------------------------------------------ Post-web Slot Tagging - End ------------------------------------------------


//------------------------------------------------ PEScore Decoder - Begin ------------------------------------------------
function PETopSiteScoreDecode_Local(PETopSiteScore, urlKeyword, url, urlPathDepth) {
    var scoreTemp = PETopSiteScore;

    var basicSection = PETopSiteScoreBasicSectionDecode(scoreTemp);
    var result = new PETopSiteScoreDecodeResult(basicSection.score, basicSection.isSpecific, basicSection.isIntent);

    var keyword1 = urlKeyword.keyword1;
    var keyword2 = urlKeyword.keyword2;
    var keyword3 = urlKeyword.keyword3;

    scoreTemp = scoreTemp >>> 6;
    if (scoreTemp > 0) {
        var extendSection1 = PETopSiteScoreExtendSectionDecode_Local(scoreTemp);
        var isExtend1 = true;
        if (extendSection1.pathDepth > 0 && extendSection1.pathDepth != urlPathDepth) {
            isExtend1 = false;
        }
        if (isExtend1 && extendSection1.keyWordMatch1 == 1 && !IsArrayPhraseMatchForUrl_Local(keyword1, url)) {
            isExtend1 = false;
        }
        if (isExtend1 && extendSection1.keyWordMatch2 == 1 && !IsArrayPhraseMatchForUrl_Local(keyword2, url)) {
            isExtend1 = false;
        }
        if (isExtend1 && extendSection1.keyWordMatch3 == 1 && !IsArrayPhraseMatchForUrl_Local(keyword3, url)) {
            isExtend1 = false;
        }
        if (isExtend1) {
            result = new PETopSiteScoreDecodeResult(extendSection1.score, extendSection1.isSpecific, extendSection1.isIntent);
        }
        else {
            scoreTemp = scoreTemp >>> 12;
            if (scoreTemp > 0) {
                var extendSection2 = PETopSiteScoreExtendSectionDecode_Local(scoreTemp);
                var isExtend2 = true;
                if (extendSection2.pathDepth > 0 && extendSection2.pathDepth != urlPathDepth) {
                    isExtend2 = false;
                }
                if (isExtend2 && extendSection2.keyWordMatch1 == 1 && !IsArrayPhraseMatchForUrl_Local(keyword1, url)) {
                    isExtend2 = false;
                }
                if (isExtend2 && extendSection2.keyWordMatch2 == 1 && !IsArrayPhraseMatchForUrl_Local(keyword2, url)) {
                    isExtend2 = false;
                }
                if (isExtend2 && extendSection2.keyWordMatch3 == 1 && !IsArrayPhraseMatchForUrl_Local(keyword3, url)) {
                    isExtend2 = false;
                }
                if (isExtend2) {
                    result = new PETopSiteScoreDecodeResult(extendSection2.score, extendSection2.isSpecific, extendSection2.isIntent);
                }
            }
        }    
    }
    return result;
}

function PETopSiteScoreExtendSectionDecode_Local(score) {
    var scoreTemp = score;
    var PETopSiteScoreBasicSectionTemp = PETopSiteScoreBasicSectionDecode(scoreTemp);
    scoreTemp = scoreTemp >>> 6;
    var pathDepth = scoreTemp & 7;

    scoreTemp = scoreTemp >>> 3;
    var keyWordMatch1 = scoreTemp & 1;

    scoreTemp = scoreTemp >>> 1;
    var keyWordMatch2 = scoreTemp & 1;

    scoreTemp = scoreTemp >>> 1;
    var keyWordMatch3 = scoreTemp & 1;

    return new PETopSiteScoreExtendSection(PETopSiteScoreBasicSectionTemp.score, PETopSiteScoreBasicSectionTemp.isSpecific, PETopSiteScoreBasicSectionTemp.isIntent, keyWordMatch1, 0, 0, pathDepth);
}
//------------------------------------------------ PEScore Decoder - End ------------------------------------------------


//------------------------------------------------ Generate Entity Matching Feature - Begin ------------------------------------------------
function GenerateEntityMatchingScore_Local(entityList, matchData) {
    var entityMatchFeature = 0;
    var entityCount = entityList.length;

    var title = matchData.title;
    var wordFoundTitleArray = matchData.wordFoundTitleArray;
    var snippet = matchData.snippet;
    var wordFoundBodyArray = matchData.wordFoundBodyArray;

    for (var i = 0; i < entityCount; i++) {
        var entityItem = entityList[i];
        var entity = entityItem.text;
        if (entityItem.score >= 1.0) {
            if (entity.indexOf(' ') != -1) {
                if (IsPhraseMatchForTitleSnippet(entity, title)) {
                    entityMatchFeature += c_entityMatchScore_1st;
                }
                else if (IsPhraseMatchForTitleSnippet(entity, snippet)) {
                    entityMatchFeature += c_entityMatchScore_2nd;
                }
                else if (WordsFoundForTitleSnippet(entity, wordFoundTitleArray, title) == 1) {
                    entityMatchFeature += c_entityMatchScore_3rd;
                }
                else if (WordsFoundForTitleSnippet(entity, wordFoundBodyArray, snippet) == 1) {
                    entityMatchFeature += c_entityMatchScore_4th;
                }
            }
            else {
                if (WordsFoundForTitleSnippet(entity, wordFoundTitleArray, title) == 1) {
                    entityMatchFeature += c_entityMatchScore_1st;
                }
                else if (WordsFoundForTitleSnippet(entity, wordFoundBodyArray, snippet) == 1) {
                    entityMatchFeature += c_entityMatchScore_2nd;
                }
            }
        }
        else {
            entityMatchFeature += WordsFoundForTitleSnippet(MSSFDecodeResult.entity1, wordFoundTitleArray, title);
        }
    }

    if (entityCount !== 0) {
        entityMatchFeature = entityMatchFeature / entityCount;
    }

    return NormalizeEntityMatchingScore(entityMatchFeature);
}
//------------------------------------------------ Generate Entity Matching Feature - End ------------------------------------------------


//------------------------------------------------ Generate Constraint Matching Feature - Begin ------------------------------------------------
function GenerateConstraintMatchingScore_Local(constraintMatchConditionArray, constraintList, matchData, authorityScore, constraintMatchUrlScore, documentPosition) {
    var consMatchFeature = 0;
    var hasOpposed = false;
    var consCount = constraintList.length;
    for (var i = 0; i < consCount; i++) {
        var consMatchForOne = CalculateConstraintMatchingScoreForSingleConstraint(constraintMatchConditionArray, constraintList[i], matchData, authorityScore, constraintMatchUrlScore, documentPosition);
        consMatchFeature += consMatchForOne;
        if (consMatchForOne == 1) {
            hasOpposed = true;
        }
    }
    if (hasOpposed) {
        consMatchFeature = 1;
    }
    else if (consCount !== 0) {
        consMatchFeature = consMatchFeature / consCount;
    }
    return consMatchFeature;
}

//------------------------------------------------ Generate Constraint Matching Feature - End ------------------------------------------------

//------------------------------------------------ Main Ranker - Begin ------------------------------------------------
function MainRanker(subIntentId, subIntentScore, MSSFDecodeResult, matchDataArray, intentMatchCondition, constraintMatchCondition, documentsLocal, documentCount) {
    var keyFeaturesOfDocuments = [];
    //var docCount = documentCount;
    var top20doc = Math.min(documentCount, 20);
    var i, curDoc, featureVector, matchData, url;
    var entityMatchScoreArray = new Array(0, 0, 0);
    var entityMatchScoreThreshold = 0;
    var entityMatchingScorePosTop1 = 0;
    
    var isTrigger = true;
    var drScoreArray = new Array(20);
    for (i = 0; i < 20; i++) {
        drScoreArray[i] = 0;
    }
    var maxDRScore = 0;
    var maxDRScorePos = 0;
    for (i = 0; i < top20doc; ++i) {
        if (i == 3) {
            entityMatchScoreArray.sort(SortNumberDesc);
            entityMatchScoreThreshold = entityMatchScoreArray[1];
            if (entityMatchScoreThreshold <= c_entityMatchScoreThres_LB) {
                entityMatchScoreThreshold = entityMatchScoreArray[0];
            }
            // Trigger Condition 1
            if (entityMatchScoreThreshold <= c_entityMatchScoreThres_LB || entityMatchingScorePosTop1 < entityMatchScoreThreshold) {
                isTrigger = false;
                break;
            }
        }
        curDoc = documentsLocal[i];
        featureVector = curDoc.rerankfeatures;
        matchData = matchDataArray[i];
        url = matchData.url;
        var entityMatchScore = GenerateEntityMatchingScore_Local(MSSFDecodeResult.entity, matchData);
        var topSiteScoreResult = PETopSiteScoreDecode_Local(featureVector[c_FeatureId_PEScoreTopSite], MSSFDecodeResult.urlKeyword, url, featureVector[c_FeatureId_UrlDepth]);
        var authorityScore = GenerateAuthorityScore(topSiteScoreResult.authorityScore, MSSFDecodeResult.entity, MSSFDecodeResult.siteConstraint, url, curDoc.hostid, curDoc.domainid, MSSFDecodeResult.officialSite, i);
        
        var specificSiteScore = topSiteScoreResult.isSpecific;
        keyFeaturesOfDocuments.push(new KeyFeatures(entityMatchScore, 0, authorityScore, specificSiteScore, 0, 0, topSiteScoreResult));
        
        if (i == 0) {
            entityMatchingScorePosTop1 = entityMatchScore;
        }
        if (i < 3) {
            entityMatchScoreArray[i] = entityMatchScore;
        }
        var curDRScore = curDoc.l2score;
        drScoreArray[i] = curDRScore;
        if (curDRScore > maxDRScore) {
            maxDRScore = curDRScore;
            maxDRScorePos = i;
        }
    }
    
    LogDebug("IsTrigger Condition1:" + isTrigger + "\t");
    
    if (!isTrigger) {
        AssignAbstentionSegmentScore();
        return;
    }
    
    // Trigger Condition 2
    var entityMatchingScoreDRScoreTop1 = keyFeaturesOfDocuments[maxDRScorePos].entityMatchScore;
    if (entityMatchingScoreDRScoreTop1 < entityMatchScoreThreshold) {
        AssignAbstentionSegmentScore();
        return;
    }
    LogDebug("IsTrigger Condition2:" + isTrigger + "\t");
    
    // Trigger Condition 3
    var specificSiteCountInTop5 = 0;
    var entityMatchCountInTop10 = 0;
    var entityMatchCountInTop20 = 0;
    for (i = 0; i < top20doc; i++) {
        if (keyFeaturesOfDocuments[i].entityMatchScore >= entityMatchScoreThreshold) {
            if (i < 10) {
                entityMatchCountInTop10++;
            }
            entityMatchCountInTop20++;
        }
        if (i < 5) {
            if (keyFeaturesOfDocuments[i].specificSiteScore > 0) {
                specificSiteCountInTop5++;
            }
        }
    }
    var isKnownQuery = false;
    if ((subIntentId != c_SubIntentId_BookOthers && subIntentScore >= 100)) {
        isKnownQuery = true;
    }
    LogDebug("entityMatchCountInTop10:" + entityMatchCountInTop10 + "\t")

    
    isTrigger = false;
    if (!isTrigger && isKnownQuery) {
        if (IsTriggerForKnownQuery(entityMatchCountInTop20)) {
            isTrigger = true;
        }
        else {
            AssignAbstentionSegmentScore();
        }
    }
    for (i = 0; i < top20doc; ++i) {
        curDoc = documentsLocal[i];
        featureVector = curDoc.rerankfeatures;
        matchData = matchDataArray[i];
        url = matchData.url;

        var topSiteScoreResult = keyFeaturesOfDocuments[i].topSiteScoreResult;
        var intentMatchScore = GenerateIntentMatchingScore(intentMatchCondition, MSSFDecodeResult.intent, matchData, topSiteScoreResult.isIntent);
        
        var lowQualitySiteScore = featureVector[c_FeatureId_PEScoreLowQuality];
        
        var guardingScore = GenerateGuardingScore(featureVector[c_FeatureId_PEScoreGuarding], MSSFDecodeResult.guardingkeyword, matchData);

        keyFeaturesOfDocuments[i].intentMatchScore = intentMatchScore;
        keyFeaturesOfDocuments[i].guardingScore = guardingScore;
        keyFeaturesOfDocuments[i].lowQualitySiteScore = lowQualitySiteScore;
    }
    drScoreArray.sort(SortNumberDesc);
    var drScoreThreshold = drScoreArray[16];
    LogDebug("IsTrigger:" + isTrigger + "\t");
    LogDebug("isKnownQuery:" + isKnownQuery + "\t");
    LogDebug("IsTriggerForUnKnownQuery:" + IsTriggerForUnKnownQuery(keyFeaturesOfDocuments, specificSiteCountInTop5, entityMatchScoreThreshold, matchDataArray) + "\t");
    
    if (isTrigger || (!isKnownQuery && IsTriggerForUnKnownQuery(keyFeaturesOfDocuments, specificSiteCountInTop5, entityMatchScoreThreshold, matchDataArray))) {     
        // Get not-guarding documents
        MSSFDecodeResult = PostWebSlotTagging_Local(MSSFDecodeResult, wordDropQuery, matchDataArray);
        var rankVector = [];
        var rankVectorInOriPlace = [];
        var guardVector = [];
        for (i = 0; i < top20doc; ++i) {           
            if (!IsGuard(keyFeaturesOfDocuments[i], documentsLocal[i].rerankfeatures, i, entityMatchScoreThreshold, documentsLocal[i].l2score, maxDRScore)) {
                rankVector.push({ index: i, signal: 0.0 });
                rankVectorInOriPlace.push({ index: i });        
            }
            else {
                //documents[i].score = 1000.0 - i;
                guardVector.push({ index: i, signal: 0.0 });             
            }         
        }

        var scoringVector = rankVector.concat(guardVector);
        var scoringVectorLength = scoringVector.length;
        // Scoring on the scoring documents
        for (i = 0; i < scoringVectorLength; i++) {
            var curIndex = scoringVector[i].index;
            var curKeyFeatures = keyFeaturesOfDocuments[curIndex];
            var curDoc = documentsLocal[curIndex];
            var curRerankFeatures = curDoc.rerankfeatures;
            var cureMatchData = matchDataArray[curIndex];           
            if (curDoc.l2score > drScoreThreshold && (curKeyFeatures.lowQualitySiteScore === 0 || curKeyFeatures.authorityScore > c_officialSiteScore || curRerankFeatures[c_FeatureId_PEScoreDiversity] > 0)) {
                scoringVector[i].signal = SCORING(MSSFDecodeResult, curKeyFeatures, curRerankFeatures, cureMatchData, entityMatchScoreThreshold, constraintMatchCondition, curIndex);
            }
            else {
                scoringVector[i].signal = c_baseFusionScore;
            }      
        }

        // For each host, only keep the highest score document
        var hostScoreMapping = {};
        var hostId;
        for (i = 0; i < scoringVectorLength; ++i) {
            hostId = documentsLocal[scoringVector[i].index].hostid;
            if (!IsNull(hostScoreMapping[hostId])) {
                if (scoringVector[i].signal > hostScoreMapping[hostId]) {
                    hostScoreMapping[hostId] = scoringVector[i].signal;
                }
            }
            else {
                hostScoreMapping[hostId] = scoringVector[i].signal;
            }
        }

        var rankDocLength = rankVector.length;
        for (i = 0; i < rankDocLength; ++i) {
            var curRerankFeatures = documentsLocal[rankVector[i].index].rerankfeatures;
            var curKeyFeatures = keyFeaturesOfDocuments[rankVector[i].index];
            hostId = documentsLocal[rankVector[i].index].hostid;
            if (!IsNull(hostScoreMapping[hostId]) && !(curKeyFeatures.authorityScore >= c_officialSiteScore || curRerankFeatures[c_FeatureId_PEScoreDiversity] > 0)) {
                if (scoringVector[i].signal < hostScoreMapping[hostId]) {
                    rankVector[i].signal = c_baseFusionScore;
                }
                else {
                    rankVector[i].signal = scoringVector[i].signal;
                }
            }
        }
        rankVector.sort(SortSignalDescending);
        var currGuardCount=0;
        var guardDocLength=guardVector.length;
        for (i = 0; i < rankDocLength; ++i) {
            documents[rankVector[i].index].score = rankVector[i].signal;
            if(currGuardCount<guardDocLength){
                while(rankVectorInOriPlace[i].index > guardVector[currGuardCount].index){
                    documents[guardVector[currGuardCount].index].score=rankVector[i].signal;
                    currGuardCount++;
                    if(currGuardCount>=guardDocLength) break;
                }
            }
        }
        for(;currGuardCount<guardDocLength;currGuardCount++){
            documents[guardVector[currGuardCount].index].score=c_baseFusionScore;
        }
        for(i = top20doc; i < documentCount; i++){
            documents[i].score=c_baseFusionScore;
        }
    }
    else {
        AssignAbstentionSegmentScore();
    }
}

function IsGuard(keyFeatures, rerankFeatures, documentPosition, entityMatchScoreThreshold, l2score, maxDRScore) {
    if (rerankFeatures[c_FeatureId_RankomaticScore] >= 5) {
        return true;
    }
    if (documentPosition == 0 && rerankFeatures[c_FeatureId_UrlDepth] == 0) {
        return true;
    }
    if (l2score == maxDRScore && keyFeatures.lowQualitySiteScore === 0) {
        return true;
    }
    
    if (keyFeatures.entityMatchScore >= entityMatchScoreThreshold && ((keyFeatures.intentMatchScore === 0 && subIntentId == c_SubIntentId_BookOthers) || (subIntentId == c_SubIntentId_BookSingleEntity && keyFeatures.intentMatchScore == c_intentMatchScore_2nd)) && keyFeatures.constraintMatchScore !== c_constraintMatchScoreOpposed && keyFeatures.lowQualitySiteScore === 0 && (keyFeatures.guardingScore === c_guardingScore || keyFeatures.authorityScore > c_officialSiteScore) && documentPosition < 5) {
        return true;
    }
    return false;
}

function IsTriggerForKnownQuery(entityMatchCountInTop20) {
    return entityMatchCountInTop20 >= 5;
}

function IsTriggerForUnKnownQuery(keyFeaturesOfDocuments, specificSiteCountInTop5, entityMatchScoreThreshold, matchDataArray) {
    var goodSiteCountInTop10 = 0;
    var authoritySiteCountInTop5 = 0;
    var length = Math.min(documentCount, 10);
    for (var i = 0; i < length; i++) {
        if (keyFeaturesOfDocuments[i].entityMatchScore >= entityMatchScoreThreshold && keyFeaturesOfDocuments[i].intentMatchScore >= c_intentMatchScore_2nd && keyFeaturesOfDocuments[i].authorityScore > 0) {
            goodSiteCountInTop10++;
        }
        
        if (i < 5) {
            LogDebug("authorityScore:"+keyFeaturesOfDocuments[i].authorityScore+"\t");
            url = matchDataArray[i].url;
            if (keyFeaturesOfDocuments[i].authorityScore == 8 || keyFeaturesOfDocuments[i].authorityScore == 6 || (url.indexOf("amazon.com") != -1 && url.indexOf("/dp/") != -1)) {
                authoritySiteCountInTop5++;
            }
        }
    }
    
    LogDebug("goodSiteCountInTop10:"+goodSiteCountInTop10+"\t"+"authoritySiteCountInTop5:"+authoritySiteCountInTop5+"\t");
    return goodSiteCountInTop10 >= 1 && authoritySiteCountInTop5 >= 1;
}

function SCORING(MSSFDecodeResult, keyFeatures, rerankFeatures, matchData, entityMatchScoreThreshold, constraintMatchCondition, documentPosition) {
    var score = c_baseFusionScore;

    var entityMatchScore = keyFeatures.entityMatchScore;
    var intentMatchScore = keyFeatures.intentMatchScore;
    var authorityScore = keyFeatures.authorityScore;

    if (entityMatchScore > 0 && intentMatchScore >= c_intentMatchScore_3rd) {
        var url = matchData.url;
        var constraintMatchUrlScore = PEConstraintScoreDecode(rerankFeatures[c_FeatureId_PEScoreConstraint], MSSFDecodeResult.urlKeyword, url, rerankFeatures[c_FeatureId_UrlDepth]);
        var constraintMatchScore = GenerateConstraintMatchingScore_Local(constraintMatchCondition, MSSFDecodeResult.constraint, matchData, authorityScore, constraintMatchUrlScore, documentPosition);

        if (constraintMatchScore != c_constraintMatchScoreOpposed) {
            if (entityMatchScore >= entityMatchScoreThreshold) {
                score += 4*c_entityMatchFusionScore;
            }
            else if (entityMatchScore >= c_entityMatchScore_1st){
                score += 4*c_entityMatchFusionScore;
            }
            else if (entityMatchScore >= c_entityMatchScore_2nd){
                score += 3*c_entityMatchFusionScore;
            }
            else if (entityMatchScore >= c_entityMatchScore_3rd){
                score += 2*c_entityMatchFusionScore;
            }
            else if (entityMatchScore >= c_entityMatchScore_4th){
                score += c_entityMatchFusionScore;
            }
            score += c_intentMatchFusionScore;
            if (authorityScore >= 24) {
                score += 4*c_authorityFusionScore;
            }
            else if (authorityScore >= 16) {
                score += 3*c_authorityFusionScore;
            }
            else if (authorityScore >= 4) {
                score += 2*c_authorityFusionScore;
            }
            else if (authorityScore >= 1) {
                score += 1*c_authorityFusionScore;
            }

            
            if (keyFeatures.contentQualityScore > 0) {
                score += 1*c_authorityFusionScore;
                if (constraintMatchScore >= c_constraintMatchScore_4th)
                    score += c_constraintMatchFusionScore;
            }
            
            return score;
        }
    }
    return c_baseFusionScore;
}

function AssignAbstentionSegmentScore() {
    for (i=0; i<documentCount; i++) {
        var doc=documents[i];
        doc.score = c_baseFusionScore;
    }
}
//------------------------------------------------ Main Ranker - End ------------------------------------------------


//------------------------------------------------ Utilities - Begin ------------------------------------------------
function IsArrayPhraseMatchForUrl_Local(array, urlStream) {
    if (IsNull(array) || IsNull(urlStream))
        return false;

    var length = array.length;
    for (var i = 0; i < length; i++) {
        var tmp = "/" + array[i] + "/";
        if (IsPhraseMatchForUrl(tmp, urlStream))
            return true;
    }
    return false;
}


function WordsFoundForTitleSnippet_Local(phrase, wordFoundArray, stream) {
    if (IsNull(phrase) || phrase === "" || IsNull(stream))
        return 0;

    var termMatchedRatio = 0;
    var phraseWords = phrase.split(" ");
    var matchedCount = 0;
    var phraseWordsLength = phraseWords.length;
    var wordFoundArrayLength = wordFoundArray.length;
    for (var i = 0; i < phraseWordsLength; i++) {
        var term = phraseWords[i];
        var termIndex = queryTermDict[term];
        if (termIndex < wordFoundArrayLength) {
            // Use word found array
            if (wordFoundArray[termIndex] > 0) {
                matchedCount++;
            }
        }
        if (termIndex >= wordFoundArrayLength || wordFoundArray[termIndex] == 0) {
            if (IsPhraseMatchForTitleSnippet(term, stream)) {
                matchedCount++;
            }
        }
    }
    termMatchedRatio = matchedCount * 1.0 / phraseWords.length;
    return termMatchedRatio;
}
//------------------------------------------------ Utilities - End ------------------------------------------------
