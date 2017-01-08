// C: comments.
// 0:DomainAuthorityFeature_DUMultiInstanceUrlV2_0_4
// 1:DomainAuthorityFeature_DUMultiInstanceUrlV2_0_7
// 2:DomainAuthorityFeature_DUMultiInstanceUrlV2_0_5
// 3:DomainAuthorityFeature_DUMultiInstanceUrlV2_0_6
// 4:DomainAuthorityFeature_DUMultiInstanceUrlV2_0_8
// 5:UrlDepth
// 6:OnlineMemoryUrlFeature_0

//------------------------------------------------ DrugSideEffects Config - Begin ------------------------------------------------
var c_SubIntentId_LyricsSongLyrics = 201;
var c_SubIntentId_LyricsSongLyricsArtist = 202;


var intentMatchCondition = [];
intentMatchCondition[c_SubIntentId_LyricsSongLyrics] = [0, 2, 0];
intentMatchCondition[c_SubIntentId_LyricsSongLyricsArtist] = [0, 2, 0];


var constraintMatchCondition = [];
constraintMatchCondition[c_SubIntentId_LyricsSongLyrics] = [0, 1, 1, 1, 1];
constraintMatchCondition[c_SubIntentId_LyricsSongLyricsArtist] = [0, 1, 1, 1, 1];

//------------------------------------------------ DrugSideEffects Config - End ------------------------------------------------

//------------------------------------------------ Constant Define - Begin ------------------------------------------------
var c_subIntentIdQLF = 2662;
var c_subIntentScoreQLF = 2663;

//Feature Ids
var c_FeatureId_PEScoreTopSite = 0;//AuthorityScore that is the aggregate score of authority score, boost score, reduce score.
var c_FeatureId_PEScoreConstraint = 1; //Not found this score
var c_FeatureId_PEScoreGuarding = 2; //GuardingScore which is the aggregate score of guardingSocre_url and guardingScore_title by freeform ranker.
var c_FeatureId_PEScoreLowQuality = 3; //BadSiteScore
var c_FeatureId_PEScoreDiversity = 4; //DiversitySiteScore
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
var c_entityMatchScoreThres_LB = 5000;//250;

// Stopwords used in PostWeb Slot Tagging
var c_stopWordsList = new Array("about", "an", "and", "are", "as", "at", "be", "but", "by", "com", "for", "from", "how", "if", "in", "is", "it", "of", "on", "or", "that", "the", "this", "to", "was", "what", "when", "where", "which", "who", "will", "with", "would", "www", "a", "i", "your", "s");
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
    for (var i = 0; i < documentCount; ++i) {
        documents[i].score = 1000.0 - i;
    }
}
else {
    var subIntentId = qlfs[c_subIntentIdQLF];
    var subIntentScore = qlfs[c_subIntentScoreQLF];

    var query = extractedquery;

    var MSSFDecodeResult = MSSFDecode(msSemanticFrame);
    var wordDropQuery = query.replace(/word:\((\w+)[^\)]+\)/g, "$1").replace(/rankonly:/g, "");
    var queryTermArray = wordDropQuery.split(" ");
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
        var marketVector = curDoc.markers;

        var title = curDoc.rawtitle;
        var url = curDoc.url;
        var snippet = curDoc.rawsnippet;

        title = IsNull(title) ? "" : StreamNormalization(title);
		url = IsNull(url) ? "" : url.toLowerCase().substring(0, c_maxCaptionCharLength);
		snippet = IsNull(snippet) ? "" : StreamNormalization(snippet);

        var wordFoundTitleArray = ParseWordCandidatePresence(marketVector[c_MarkerId_WordCandidatePresence_MultiInstanceTitle]);
        var wordFoundBodyArray = ParseWordCandidatePresence(marketVector[c_MarkerId_WordCandidatePresence_Body]);

        var matchData = new MatchData(title, url, snippet, wordFoundTitleArray, wordFoundBodyArray);
        matchDataArray.push(matchData);
    }
    MainRanker(subIntentId, subIntentScore, MSSFDecodeResult, matchDataArray, intentMatchCondition[subIntentId], constraintMatchCondition[subIntentId], documents,     documentCount);
	

}

//------------------------------------------------ MSSemanticFrame Decoder - Begin ------------------------------------------------
function MSSFDecode(addQuery) {
    var entity = [];
    var intent = [];
    var constraint = [];
    var urlKeyword = new UrlKeywordClass([], [], []);
    var guardingkeyword = [];
    var officialSite = [];
    var siteConstraint = [];
    var otherSlots = [];

    var items = addQuery.split(",");
    for (var i = 0, itemLen = items.length; i < itemLen; i++) {
        if (items[i] === "") {
            continue;
        }
        var keyValuePair = items[i].split(":");
        if (keyValuePair.length != 2) {
            continue;
        }
        if (keyValuePair[1] === "") {
            continue;
        }
        var key = keyValuePair[0];
        var value = keyValuePair[1];
        var j, len;
        if (key == "entity" || key == "Entity") {
            var entityListTemp = value.split("^");
			var entitySet = {};
            for (j = 0, len = entityListTemp.length; j < len; j++) {
                var entityItemArray = entityListTemp[j].split("&");
                var entityItemArrayLen = entityItemArray.length;
                if (entityItemArrayLen >= 1 && entityItemArray[0] === "") {
                    continue;
                }
				var entitySpan = entityItemArray[0];
				var entitySpanCode = GenerateHashCode(entitySpan);
				var entityScore = "1.0";
				if (IsNull(entitySet[entitySpanCode])) {
					if (entityItemArrayLen == 2) {
						entityScore = entityItemArray[1];
					}
					entity.push(new EntityClass(entitySpan, entityScore));
					entitySet[entitySpanCode] = 1;
				}	
            }
        }
        else if (key == "intent" || key == "Intent") {
            intent = value.split("|");
        }
        else if (key == "constraint" || key == "Constraint") {
            var constraintListTemp = value.split("^");
			var constraintSet = {};
            for (j = 0, len = constraintListTemp.length; j < len; j++) {
                var constraintItemArray = constraintListTemp[j].split("&");
                if (constraintItemArray.length != 4) {
                    continue;
                }
				var constraintOri = constraintItemArray[0];
				var constraintCode = GenerateHashCode(constraintOri);
				if (IsNull(constraintSet[constraintCode])) {
					constraint.push(new ConstraintClass(constraintOri, constraintItemArray[1].split("|"), constraintItemArray[2].split("|"), constraintItemArray[3].split("|")));
					constraintSet[constraintCode] = 1;
				}
            }
        }
        else if (key == "urlkeyword" || key == "UrlKeyword") {
            var urlKeywordListTemp = new Array("", "", "");
            var inputUrlKeyWordList = value.split("&", 3);
            for (j = 0, len = inputUrlKeyWordList.length; j < len; j++) {
                urlKeywordListTemp[i] = inputUrlKeyWordList[i];
            }
            urlKeyword = new UrlKeywordClass(urlKeywordListTemp[0].split("|"), urlKeywordListTemp[1].split("|"), urlKeywordListTemp[2].split("|"));
        }
        else if (key == "guarding" || key == "Guarding") {
            guardingkeyword = value.split("|");
        }
        else if (key == "officialsite" || key == "OfficialSite") {
            var officialSiteListTemp = value.split("^");
            for (j = 0, len = officialSiteListTemp.length; j < len; j++) {
                var officialSiteItemArray = officialSiteListTemp[j].split("&");
                if (officialSiteItemArray.length != 2) {
                    continue;
                }
                officialSite.push(new OfficialSiteClass(officialSiteItemArray[0], officialSiteItemArray[1]));
            }
        }
        else if (key == "siteconstraint" || key == "SiteConstraint") {
			var siteConstraintTemp = value.split("^");
			var siteConstraintSet = {};
			for (j = 0, len = siteConstraintTemp.length; j < len; j++) {
				var siteCons = siteConstraintTemp[j];
				var siteConsCode = GenerateHashCode(siteCons);
				if (IsNull(siteConstraintSet[siteConsCode])) {
					siteConstraint.push(siteCons);
					siteConstraintSet[siteConsCode] = 1;
				}
			}
        }
        else if (key == "otherslots" || key == "OtherSlots") {
            var otherSlotListTemp = value.split("^");
            for (j = 0, len = otherSlotListTemp.length; j < len; j++) {
                otherSlots.push(otherSlotListTemp[j]);
            }
        }
    }
    return new MSSFDecodeResult(entity, intent, constraint, urlKeyword, guardingkeyword, officialSite, siteConstraint, otherSlots);
}

function MSSFDecodeResult(entity, intent, constraint, urlKeyword, guardingkeyword, officialSite, siteConstraint, otherSlots) {
    this.entity = entity;
    this.intent = intent;
    this.constraint = constraint;
    this.urlKeyword = urlKeyword;
    this.guardingkeyword = guardingkeyword;
    this.officialSite = officialSite;
    this.siteConstraint = siteConstraint;
    this.otherSlots = otherSlots;
}

function EntityClass(text, score) {
    this.text = text;
    this.score = score;
}

function ConstraintClass(original, synonym, opposed, exclude) {
    this.original = original;
    this.synonym = synonym;
    this.opposed = opposed;
    this.exclude = exclude;
}

function UrlKeywordClass(keyword1, keyword2, keyword3) {
    this.keyword1 = keyword1;
    this.keyword2 = keyword2;
    this.keyword3 = keyword3;
}

function OfficialSiteClass(domainId, hostId) {
    this.domainId = domainId;
    this.hostId = hostId;
}
//------------------------------------------------ MSSemanticFrame Decoder - End ------------------------------------------------


//------------------------------------------------ Post-web Slot Tagging - Begin ------------------------------------------------
function PostWebSlotTagging(MSSFDecodeResult, query, matchDataArray) {
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
            var isCandidateMatchTitle = WordsFoundForTitleSnippet(curCandTerm, matchData.wordFoundTitleArray, matchData.title) == 1;
            var isCandidateMatchSnippet = WordsFoundForTitleSnippet(curCandTerm, matchData.wordFoundBodyArray, matchData.snippet) == 1;

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

    //for (j = 0; j < candCount; j++) {
    //    curCandidate = candidateList[j];
    //    if (curCandidate.titleTop5Count >= c_PostwebConstraintTitleTop5Thres || curCandidate.titleTop10Count >= c_PostwebConstraintTitleTop10Thres || curCandidate.bodyTop5Count >= c_PostwebConstraintBodyTop5Thres || curCandidate.bodyTop10Count >= c_PostwebConstraintBodyTop10Thres) {
    //        curCandTerm = curCandidate.term;
    //        if (WordsFoundForTitleSnippet(curCandTerm, top1MatchData.wordFoundTitleArray, top1MatchData.title) == 1 && WordsFoundForTitleSnippet(curCandTerm, drScoreTop1MatchData.wordFoundTitleArray, drScoreTop1MatchData.title) == 1) {
    //            MSSFDecodeResult.constraint.push(new ConstraintClass(curCandTerm, "", "", ""));
    //        }
    //    }
    //}
    //return MSSFDecodeResult;
	
	for (j = 0; j < candCount; j++) {
        curCandidate = candidateList[j];
        if (curCandidate.titleTop5Count >= c_PostwebConstraintTitleTop5Thres || curCandidate.titleTop10Count >= c_PostwebConstraintTitleTop10Thres || curCandidate.bodyTop5Count >= c_PostwebConstraintBodyTop5Thres || curCandidate.bodyTop10Count >= c_PostwebConstraintBodyTop10Thres) {
            curCandTerm = curCandidate.term;
            MSSFDecodeResult.constraint.push(new ConstraintClass(curCandTerm, "", "", ""));
        }
    }
    return MSSFDecodeResult; 
}

function CandidateTermClass(term) {
    this.term = term;
    this.titleTop5Count = 0;
    this.titleTop10Count = 0;
    this.bodyTop10Count = 0;
    this.bodyTop5Count = 0;
}
//------------------------------------------------ Post-web Slot Tagging - End ------------------------------------------------


//------------------------------------------------ PEScore Decoder - Begin ------------------------------------------------
function PETopSiteScoreDecode(PETopSiteScore, urlKeyword, url, urlPathDepth) {
    var scoreTemp = PETopSiteScore;
    var basicSection = PETopSiteScoreBasicSectionDecode(scoreTemp);
    var result = new PETopSiteScoreDecodeResult(basicSection.score, basicSection.isSpecific, basicSection.isIntent);

    var keyword1 = urlKeyword.keyword1;
    var keyword2 = urlKeyword.keyword2;
    var keyword3 = urlKeyword.keyword3;

    scoreTemp = scoreTemp >>> 6;
    if (scoreTemp > 0) {
        var extendSection1 = PETopSiteScoreExtendSectionDecode(scoreTemp);
        var isExtend1 = true;
        if (extendSection1.pathDepth > 0 && extendSection1.pathDepth != urlPathDepth) {
            isExtend1 = false;
        }
        if (isExtend1 && extendSection1.keyWordMatch1 == 1 && !IsArrayPhraseMatchForUrl(keyword1, url)) {
            isExtend1 = false;
        }
        if (isExtend1 && extendSection1.keyWordMatch2 == 1 && !IsArrayPhraseMatchForUrl(keyword2, url)) {
            isExtend1 = false;
        }
        if (isExtend1 && extendSection1.keyWordMatch3 == 1 && !IsArrayPhraseMatchForUrl(keyword3, url)) {
            isExtend1 = false;
        }
        if (isExtend1) {
            result = new PETopSiteScoreDecodeResult(extendSection1.score, extendSection1.isSpecific, extendSection1.isIntent);
        }
        else {
            scoreTemp = scoreTemp >>> 12;
            if (scoreTemp > 0) {
                var extendSection2 = PETopSiteScoreExtendSectionDecode(scoreTemp);
                var isExtend2 = true;
                if (extendSection2.pathDepth > 0 && extendSection2.pathDepth != urlPathDepth) {
                    isExtend2 = false;
                }
                if (isExtend2 && extendSection2.keyWordMatch1 == 1 && !IsArrayPhraseMatchForUrl(keyword1, url)) {
                    isExtend2 = false;
                }
                if (isExtend2 && extendSection2.keyWordMatch2 == 1 && !IsArrayPhraseMatchForUrl(keyword2, url)) {
                    isExtend2 = false;
                }
                if (isExtend2 && extendSection2.keyWordMatch3 == 1 && !IsArrayPhraseMatchForUrl(keyword3, url)) {
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

function PETopSiteScoreBasicSectionDecode(score) {
	
    var scoreTemp = score;
    var isSpecificBasic = scoreTemp & 1;

    scoreTemp = scoreTemp >>> 1;
    var isIntentBasic = scoreTemp & 1;

    scoreTemp = scoreTemp >>> 1;
    var scoreBasic = scoreTemp & 15;

    return new PETopSiteScoreBasicSection(scoreBasic, isSpecificBasic, isIntentBasic);
}

function PETopSiteScoreExtendSectionDecode(score) {
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

    return new PETopSiteScoreExtendSection(PETopSiteScoreBasicSectionTemp.score, PETopSiteScoreBasicSectionTemp.isSpecific, PETopSiteScoreBasicSectionTemp.isIntent, keyWordMatch1, keyWordMatch2, keyWordMatch3, pathDepth);
}

function PETopSiteScoreDecodeResult(authorityScore, isSpecific, isIntent) {
    this.authorityScore = authorityScore;
    this.isSpecific = isSpecific;
    this.isIntent = isIntent;
}

function PETopSiteScoreBasicSection(score, isSpecific, isIntent) {
    this.score = score;
    this.isSpecific = isSpecific;
    this.isIntent = isIntent;
}

function PETopSiteScoreExtendSection(score, isSpecific, isIntent, keyWordMatch1, keyWordMatch2, keyWordMatch3, pathDepth) {
    this.score = score;
    this.isSpecific = isSpecific;
    this.isIntent = isIntent;
    this.keyWordMatch1 = keyWordMatch1;
    this.keyWordMatch2 = keyWordMatch2;
    this.keyWordMatch3 = keyWordMatch3;
    this.pathDepth = pathDepth;
}

function PEConstraintScoreDecode(PEConstraintScore, urlKeyword, url, urlPathDepth) {
    var scoreTemp = PEConstraintScore;
    var basicScore = scoreTemp & 3;
    var result = basicScore;

    var keyword1 = urlKeyword.keyword1;
    var keyword2 = urlKeyword.keyword2;
    var keyword3 = urlKeyword.keyword3;

    scoreTemp = scoreTemp >>> 2;
    if (scoreTemp > 0) {
        var extendSection1 = PEConstraintScoreExtendSectionDecode(scoreTemp);
        var isExtend1 = true;
        if (extendSection1.pathDepth > 0 && extendSection1.pathDepth != urlPathDepth) {
            isExtend1 = false;
        }
        if (isExtend1 && extendSection1.keyWordMatch1 == 1 && !IsArrayPhraseMatchForUrl(keyword1, url)) {
            isExtend1 = false;
        }
        if (isExtend1 && extendSection1.keyWordMatch2 == 1 && !IsArrayPhraseMatchForUrl(keyword2, url)) {
            isExtend1 = false;
        }
        if (isExtend1 && extendSection1.keyWordMatch3 == 1 && !IsArrayPhraseMatchForUrl(keyword3, url)) {
            isExtend1 = false;
        }
        if (isExtend1) {
            result = extendSection1.score;
        }
        else {
            scoreTemp = scoreTemp >>> 8;
            if (scoreTemp > 0) {
                var extendSection2 = PEConstraintScoreExtendSectionDecode(scoreTemp);
                var isExtend2 = true;
                if (extendSection2.pathDepth > 0 && extendSection2.pathDepth != urlPathDepth) {
                    isExtend2 = false;
                }
                if (isExtend2 && extendSection2.keyWordMatch1 == 1 && !IsArrayPhraseMatchForUrl(keyword1, url)) {
                    isExtend2 = false;
                }
                if (isExtend2 && extendSection2.keyWordMatch2 == 1 && !IsArrayPhraseMatchForUrl(keyword2, url)) {
                    isExtend2 = false;
                }
                if (isExtend2 && extendSection2.keyWordMatch3 == 1 && !IsArrayPhraseMatchForUrl(keyword3, url)) {
                    isExtend2 = false;
                }
                if (isExtend2) {
                    result = extendSection2.score;
                }
            }
        }
    }
    return result;
}

function PEConstraintScoreExtendSectionDecode(score) {
    var scoreTemp = score;
    var PEConstraintScore = scoreTemp & 3;
    scoreTemp = scoreTemp >>> 2;
    var pathDepth = scoreTemp & 7;

    scoreTemp = scoreTemp >>> 3;
    var keyWordMatch1 = scoreTemp & 1;

    scoreTemp = scoreTemp >>> 1;
    var keyWordMatch2 = scoreTemp & 1;

    scoreTemp = scoreTemp >>> 1;
    var keyWordMatch3 = scoreTemp & 1;

    return new PEConstraintScoreExtendSection(PEConstraintScore, keyWordMatch1, keyWordMatch2, keyWordMatch3, pathDepth);
}

function PEConstraintScoreExtendSection(score, keyWordMatch1, keyWordMatch2, keyWordMatch3, pathDepth) {
    this.score = score;
    this.keyWordMatch1 = keyWordMatch1;
    this.keyWordMatch2 = keyWordMatch2;
    this.keyWordMatch3 = keyWordMatch3;
    this.pathDepth = pathDepth;
}
//------------------------------------------------ PEScore Decoder - End ------------------------------------------------


//------------------------------------------------ Generate Entity Matching Feature - Begin ------------------------------------------------
function GenerateEntityMatchingScore(entityList, matchData) {
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

function NormalizeEntityMatchingScore(score) {
    if (score == c_entityMatchScore_1st) {
        return c_entityMatchScore_1st;
    }
    else if (score > (c_entityMatchScore_1st / 3 * 2)) {
        return c_entityMatchScore_2nd;
    }
    else if (score > (c_entityMatchScore_1st / 3)) {
        return c_entityMatchScore_3rd;
    }
    else if (score > 0) {
        return c_entityMatchScore_4th;
    }
    else {
        return 0;
    }
}
//------------------------------------------------ Generate Entity Matching Feature - End ------------------------------------------------


//------------------------------------------------ Generate Intent Matching Feature - Begin ------------------------------------------------
function GenerateIntentMatchingScore(intentMatchConditionArray, intent, matchData, isIntentMatchUrl) {
    if (IsNull(intentMatchConditionArray) || intentMatchConditionArray.length != 3) {
        return 0;
    }

    var title = matchData.title;
    //Verify whether is condition0 match
    var isCondition0Match = false;
    switch (intentMatchConditionArray[0]) {
        case 0:
            isCondition0Match = false;
            break;
        case 1:
            isCondition0Match = true;
            break;
        case 2:
            if (IsArrayPhraseMatchForTitleSnippet(intent, title) || isIntentMatchUrl == 1) {
                isCondition0Match = true;
            }
            else {
                isCondition0Match = false;
            }
            break;
        default:
            isCondition0Match = false;
            break;
    }
    if (isCondition0Match) {
        return c_intentMatchScore_1st;
    }

    //Verify whether is condition1 match
    var isCondition1Match = false;
    switch (intentMatchConditionArray[1]) {
        case 0:
            isCondition1Match = false;
            break;
        case 1:
            isCondition1Match = true;
            break;
        case 2:
            if (IsArrayPhraseMatchForTitleSnippet(intent, title) || isIntentMatchUrl == 1) {
                isCondition1Match = true;
            }
            else {
                isCondition1Match = false;
            }
            break;
        default:
            isCondition1Match = false;
            break;
    }
    if (isCondition1Match) {
        return c_intentMatchScore_2nd;
    }

    //Verify whether is condition2 match
    var isCondition2Match = false;
    switch (intentMatchConditionArray[2]) {
        case 0:
            isCondition2Match = false;
            break;
        case 1:
            isCondition2Match = true;
            break;
        case 2:
            if (IsArrayPhraseMatchForTitleSnippet(intent, title) || isIntentMatchUrl == 1) {
                isCondition2Match = true;
            }
            else {
                isCondition2Match = false;
            }
            break;
        default:
            isCondition2Match = false;
            break;
    }
    if (isCondition2Match) {
        return c_intentMatchScore_3rd;
    }
    return 0;
}
//------------------------------------------------ Generate Intent Matching Feature - End ------------------------------------------------


//------------------------------------------------ Generate Constraint Matching Feature - Begin ------------------------------------------------
function GenerateConstraintMatchingScore(constraintMatchConditionArray, constraintList, matchData, authorityScore, constraintMatchUrlScore, documentPosition) {
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

    return NormalizeConstraintMatchingScore(consMatchFeature);
}

function CalculateConstraintMatchingScoreForSingleConstraint(constraintMatchConditionArray, constraint, matchData, authorityScore, constraintMatchUrlScore, documentPosition) {
    if (IsNull(constraintMatchConditionArray) || constraintMatchConditionArray.length != 5) {
        return 0;
    }

    var consOri = constraint.original;
    var consSyno = constraint.synonym;
    var consOpposed = constraint.opposed;
    var consExclude = constraint.exclude;

    var url = matchData.url;
    var title = matchData.title;
    var snippet = matchData.snippet;
    var wordFoundTitleArray = matchData.wordFoundTitleArray;
    var wordFoundBodyArray = matchData.wordFoundBodyArray;

    var isConsOriMatchTitle;
    var isConsOriMatchUrl;
    var isConsOriMatchBody;

    var isConsSynoMatchTitle;
    var isConsSynoMatchUrl;
    var isConsSynoMatchBody;

    var isConsOpposedMatchTitle;
    var isConsOpposedMatchUrl;

    var isConsExcludeMatchBody;

    //Verify whether is condition0 match
    var isCondition0Match = false;     //Opposed match
    switch (constraintMatchConditionArray[0]) {
        case 0:
            isCondition0Match = false;
            break;
        case 1:
            isCondition0Match = true;
            break;
        case 2:
            if (IsNull(isConsOriMatchTitle)) {
                isConsOriMatchTitle = WordsFoundForTitleSnippet(consOri, wordFoundTitleArray, title) == 1;
            }
            if (isConsOriMatchTitle) {
                break;
            }
            if (IsNull(isConsOpposedMatchTitle)) {
                isConsOpposedMatchTitle = IsArrayPhraseMatchForTitleSnippet(consOpposed, title);
            }
            if (isConsOpposedMatchTitle) {
                isCondition0Match = true;
            }
            break;
        case 3:
            if (IsNull(isConsOriMatchTitle)) {
                isConsOriMatchTitle = WordsFoundForTitleSnippet(consOri, wordFoundTitleArray, title) == 1;
            }
            if (isConsOriMatchTitle) {
                break;
            }
            if (IsNull(isConsOriMatchUrl)) {
                isConsOriMatchUrl = IsPhraseMatchForUrl(consOri, url);
            }
            if (isConsOriMatchUrl) {
                break;
            }
            if (IsNull(isConsOpposedMatchTitle)) {
                isConsOpposedMatchTitle = IsArrayPhraseMatchForTitleSnippet(consOpposed, title);
            }
            if (isConsOpposedMatchTitle) {
                isCondition0Match = true;
                break;
            }
            if (IsNull(isConsOpposedMatchUrl)) {
                isConsOpposedMatchUrl = IsArrayPhraseMatchForUrl(consOpposed, url);
            }
            if (isConsOpposedMatchUrl) {
                isCondition0Match = true;
            }
            break;
        default:
            isCondition0Match = false;
            break;
    }
    if (isCondition0Match) {
        return c_constraintMatchScoreOpposed;
    }

    //Verify whether is condition1 match
    var isCondition1Match = false;
    switch (constraintMatchConditionArray[1]) {
        case 0:
            isCondition1Match = false;
            break;
        case 1:
            isCondition1Match = true;
            break;
        case 2:
            if (constraintMatchUrlScore != 1 && authorityScore != c_officialSiteScore) {
                break;
            }
            if (IsNull(isConsOriMatchTitle)) {
                isConsOriMatchTitle = WordsFoundForTitleSnippet(consOri, wordFoundTitleArray, title) == 1;
            }
            if (isConsOriMatchTitle) {
                isCondition1Match = true;
                break;
            }
            if (IsNull(isConsSynoMatchTitle)) {
                isConsSynoMatchTitle = IsArrayPhraseMatchForTitleSnippet(consSyno, title);
            }
            if (isConsSynoMatchTitle) {
                isCondition1Match = true;
            }
            break;
        case 3:
            if (constraintMatchUrlScore != 1 && authorityScore != c_officialSiteScore) {
                break;
            }
            if (IsNull(isConsOriMatchTitle)) {
                isConsOriMatchTitle = WordsFoundForTitleSnippet(consOri, wordFoundTitleArray, title) == 1;
            }
            if (isConsOriMatchTitle) {
                isCondition1Match = true;
                break;
            }
            if (IsNull(isConsOriMatchUrl)) {
                isConsOriMatchUrl = IsPhraseMatchForUrl(consOri, url);
            }
            if (isConsOriMatchUrl) {
                isCondition1Match = true;
                break;
            }
            if (IsNull(isConsSynoMatchTitle)) {
                isConsSynoMatchTitle = IsArrayPhraseMatchForTitleSnippet(consSyno, title);
            }
            if (isConsSynoMatchTitle) {
                isCondition1Match = true;
                break;
            }
            if (IsNull(isConsSynoMatchUrl)) {
                isConsSynoMatchUrl = IsArrayPhraseMatchForUrl(consSyno, url);
            }
            if (isConsSynoMatchUrl) {
                isCondition1Match = true;
            }
            break;
        default:
            isCondition1Match = false;
            break;
    }
    if (isCondition1Match) {
        return c_constraintMatchScore_1st;
    }

    //Verify whether is condition2 match
    var isCondition2Match = false;
    switch (constraintMatchConditionArray[2]) {
        case 0:
            isCondition2Match = false;
            break;
        case 1:
            isCondition2Match = true;
            break;
        case 2:
            if (constraintMatchUrlScore == 1 || authorityScore == c_officialSiteScore) {
                if (IsNull(isConsOpposedMatchTitle)) {
                    isConsOpposedMatchTitle = IsArrayPhraseMatchForTitleSnippet(consOpposed, title);
                }
                if (isConsOpposedMatchTitle) {
                    break;
                }
                if (IsNull(isConsExcludeMatchBody)) {
                    isConsExcludeMatchBody = IsArrayPhraseMatchForTitleSnippet(consExclude, snippet);
                }
                if (isConsExcludeMatchBody) {
                    break;
                }
                if (IsNull(isConsOriMatchBody)) {
                    isConsOriMatchBody = WordsFoundForTitleSnippet(consOri, wordFoundBodyArray, snippet) == 1;
                }
                if (isConsOriMatchBody) {
                    isCondition2Match = true;
                    break;
                }
                if (IsNull(isConsSynoMatchBody)) {
                    isConsSynoMatchBody = IsArrayPhraseMatchForTitleSnippet(consSyno, snippet);
                }
                if (isConsSynoMatchBody) {
                    isCondition2Match = true;
                    break;
                }
            }
            else if (constraintMatchUrlScore == 2) {
                if (IsNull(isConsOriMatchTitle)) {
                    isConsOriMatchTitle = WordsFoundForTitleSnippet(consOri, wordFoundTitleArray, title) == 1;
                }
                if (isConsOriMatchTitle) {
                    isCondition2Match = true;
                    break;
                }
                if (IsNull(isConsSynoMatchTitle)) {
                    isConsSynoMatchTitle = IsArrayPhraseMatchForTitleSnippet(consSyno, title);
                }
                if (isConsSynoMatchTitle) {
                    isCondition2Match = true;
                    break;
                }
            }
            break;
        case 3:
            if (constraintMatchUrlScore == 1 || authorityScore == c_officialSiteScore) {
                if (IsNull(isConsOpposedMatchTitle)) {
                    isConsOpposedMatchTitle = IsArrayPhraseMatchForTitleSnippet(consOpposed, title);
                }
                if (isConsOpposedMatchTitle) {
                    break;
                }
                if (IsNull(isConsOpposedMatchUrl)) {
                    isConsOpposedMatchUrl = IsArrayPhraseMatchForUrl(consOpposed, url);
                }
                if (isConsOpposedMatchUrl) {
                    break;
                }
                if (IsNull(isConsExcludeMatchBody)) {
                    isConsExcludeMatchBody = IsArrayPhraseMatchForTitleSnippet(consExclude, snippet);
                }
                if (isConsExcludeMatchBody) {
                    break;
                }
                if (IsNull(isConsOriMatchBody)) {
                    isConsOriMatchBody = WordsFoundForTitleSnippet(consOri, wordFoundBodyArray, snippet) == 1;
                }
                if (isConsOriMatchBody) {
                    isCondition2Match = true;
                    break;
                }
                if (IsNull(isConsSynoMatchBody)) {
                    isConsSynoMatchBody = IsArrayPhraseMatchForTitleSnippet(consSyno, snippet);
                }
                if (isConsSynoMatchBody) {
                    isCondition2Match = true;
                    break;
                }
            }
            else if (constraintMatchUrlScore == 2) {
                if (IsNull(isConsOriMatchTitle)) {
                    isConsOriMatchTitle = WordsFoundForTitleSnippet(consOri, wordFoundTitleArray, title) == 1;
                }
                if (isConsOriMatchTitle) {
                    isCondition2Match = true;
                    break;
                }
                if (IsNull(isConsOriMatchUrl)) {
                    isConsOriMatchUrl = IsPhraseMatchForUrl(consOri, url);
                }
                if (isConsOriMatchUrl) {
                    isCondition2Match = true;
                    break;
                }
                if (IsNull(isConsSynoMatchTitle)) {
                    isConsSynoMatchTitle = IsArrayPhraseMatchForTitleSnippet(consSyno, title);
                }
                if (isConsSynoMatchTitle) {
                    isCondition2Match = true;
                    break;
                }
                if (IsNull(isConsSynoMatchUrl)) {
                    isConsSynoMatchUrl = IsArrayPhraseMatchForUrl(consSyno, url);
                }
                if (isConsSynoMatchUrl) {
                    isCondition2Match = true;
                    break;
                }
            }
            break;
        default:
            isCondition2Match = false;
            break;
    }
    if (isCondition2Match) {
        return c_constraintMatchScore_2nd;
    }

    //Verify whether is condition3 match
    var isCondition3Match = false;
    switch (constraintMatchConditionArray[3]) {
        case 0:
            isCondition3Match = false;
            break;
        case 1:
            isCondition3Match = true;
            break;
        case 2:
            if (documentPosition >= 5) {
                break;
            }
            if (IsNull(isConsOriMatchTitle)) {
                isConsOriMatchTitle = WordsFoundForTitleSnippet(consOri, wordFoundTitleArray, title) == 1;
            }
            if (isConsOriMatchTitle) {
                isCondition3Match = true;
                break;
            }
            if (IsNull(isConsSynoMatchTitle)) {
                isConsSynoMatchTitle = IsArrayPhraseMatchForTitleSnippet(consSyno, title);
            }
            if (isConsSynoMatchTitle) {
                isCondition3Match = true;
            }
            break;
        case 3:
            if (documentPosition >= 5) {
                break;
            }
            if (IsNull(isConsOriMatchTitle)) {
                isConsOriMatchTitle = WordsFoundForTitleSnippet(consOri, wordFoundTitleArray, title) == 1;
            }
            if (isConsOriMatchTitle) {
                isCondition3Match = true;
                break;
            }
            if (IsNull(isConsOriMatchUrl)) {
                isConsOriMatchUrl = IsPhraseMatchForUrl(consOri, url);
            }
            if (isConsOriMatchUrl) {
                isCondition3Match = true;
                break;
            }
            if (IsNull(isConsSynoMatchTitle)) {
                isConsSynoMatchTitle = IsArrayPhraseMatchForTitleSnippet(consSyno, title);
            }
            if (isConsSynoMatchTitle) {
                isCondition3Match = true;
            }
            if (IsNull(isConsSynoMatchUrl)) {
                isConsSynoMatchUrl = IsArrayPhraseMatchForUrl(consSyno, url);
            }
            if (isConsSynoMatchUrl) {
                isCondition3Match = true;
            }
            break;
        default:
            isCondition3Match = false;
            break;
    }
    if (isCondition3Match) {
        return c_constraintMatchScore_3rd;
    }

    //Verify whether is condition4 match
    var isCondition4Match = false;
    switch (constraintMatchConditionArray[4]) {
        case 0:
            isCondition4Match = false;
            break;
        case 1:
            isCondition4Match = true;
            break;
        case 2:
            if (documentPosition >= 5) {
                break;
            }
            if (IsNull(isConsOpposedMatchTitle)) {
                isConsOpposedMatchTitle = IsArrayPhraseMatchForTitleSnippet(consOpposed, title);
            }
            if (isConsOpposedMatchTitle) {
                break;
            }
            if (IsNull(isConsExcludeMatchBody)) {
                isConsExcludeMatchBody = IsArrayPhraseMatchForTitleSnippet(consExclude, snippet);
            }
            if (isConsExcludeMatchBody) {
                break;
            }
            if (IsNull(isConsOriMatchBody)) {
                isConsOriMatchBody = WordsFoundForTitleSnippet(consOri, wordFoundBodyArray, snippet) == 1;
            }
            if (isConsOriMatchBody) {
                isCondition4Match = true;
                break;
            }
            if (IsNull(isConsSynoMatchBody)) {
                isConsSynoMatchBody = IsArrayPhraseMatchForTitleSnippet(consSyno, snippet);
            }
            if (isConsSynoMatchBody) {
                isCondition4Match = true;
                break;
            }
            break;
        case 3:
            if (documentPosition >= 5) {
                break;
            }
            if (IsNull(isConsOpposedMatchTitle)) {
                isConsOpposedMatchTitle = IsArrayPhraseMatchForTitleSnippet(consOpposed, title);
            }
            if (isConsOpposedMatchTitle) {
                break;
            }
            if (IsNull(isConsOpposedMatchUrl)) {
                isConsOpposedMatchUrl = IsArrayPhraseMatchForUrl(consOpposed, url);
            }
            if (isConsOpposedMatchUrl) {
                break;
            }
            if (IsNull(isConsExcludeMatchBody)) {
                isConsExcludeMatchBody = IsArrayPhraseMatchForTitleSnippet(consExclude, snippet);
            }
            if (isConsExcludeMatchBody) {
                break;
            }
            if (IsNull(isConsOriMatchBody)) {
                isConsOriMatchBody = WordsFoundForTitleSnippet(consOri, wordFoundBodyArray, snippet) == 1;
            }
            if (isConsOriMatchBody) {
                isCondition4Match = true;
                break;
            }
            if (IsNull(isConsSynoMatchBody)) {
                isConsSynoMatchBody = IsArrayPhraseMatchForTitleSnippet(consSyno, snippet);
            }
            if (isConsSynoMatchBody) {
                isCondition4Match = true;
                break;
            }
            break;
        default:
            isCondition4Match = false;
            break;
    }
    if (isCondition4Match) {
        return c_constraintMatchScore_4th;
    }
    return 0;
}

function NormalizeConstraintMatchingScore(score) {
    if (score == c_constraintMatchScore_1st) {
        return c_constraintMatchScore_1st;
    }
    else if (score > (c_constraintMatchScore_1st / 3 * 2)) {
        return c_constraintMatchScore_2nd;
    }
    else if (score > (c_constraintMatchScore_1st / 3)) {
        return c_constraintMatchScore_3rd;
    }
    else if (score > 1) {
        return c_constraintMatchScore_4th;
    }
    else if (score == c_constraintMatchScoreOpposed) {
        return c_constraintMatchScoreOpposed;
    }
    else {
        return 0;
    }
}
//------------------------------------------------ Generate Constraint Matching Feature - End ------------------------------------------------


//------------------------------------------------ Generate Authority Score Feature - Begin ------------------------------------------------
function GenerateAuthorityScore(authorityScoreTemp, entityList, siteConstraint, url, hostId, domainId, officialSiteCondition, documentPosition) {
    var domain = GetDomainNameFromUrl(url);

    if (documentPosition < c_officialSiteDPThres && (IsOfficialSite1(entityList, domain) || IsOfficialSite2(hostId, domainId, officialSiteCondition))) {
        return c_officialSiteScore;
    }
    else if (IsSiteConstraintMatch(siteConstraint, domain)) {
        return authorityScoreTemp + c_officialSiteScore + 1;
    }
    else {
        return authorityScoreTemp;
    }
}

function IsOfficialSite1(entityList, domain) {
    if (IsNull(entityList) || entityList.length != 1) {
        return false;
    }
    var entity = entityList[0].text;
    return IsSpanMatchDomain(entity, domain);
}

function IsOfficialSite2(hostId, domainId, officialSiteCondition) {
    var isOfficialSite = false;
    for (var i = 0, len = officialSiteCondition.length; i < len; i++) {
        var curOfficialSiteCondition = officialSiteCondition[i];
        if (curOfficialSiteCondition.hostId !== "") {
            if (curOfficialSiteCondition.hostId == hostId) {
                isOfficialSite = true;
            }
        }
        else {
            if (curOfficialSiteCondition.domainId == domainId) {
                isOfficialSite = true;
            }
        }
        if (isOfficialSite) {
            break;
        }
    }
    return isOfficialSite;
}

function GetDomainNameFromUrl(url) {
    var domain;
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }
    return domain.split(':')[0];
}

function IsSiteConstraintMatch(siteConstraint, domain) {
    var isMatch = false;
    for (var i = 0, len = siteConstraint.length; i < len; i++) {
        if (IsSpanMatchDomain(siteConstraint[i], domain)) {
            isMatch = true;
            break;
        }
    }
    return isMatch;
}

function IsSpanMatchDomain(span, domain) {
    domain = " " + domain.replace(/\./g, ' ') + " ";
    if (domain.indexOf(" " + span + " ") != -1) {
        return true;
    }
    if (domain.indexOf(" " + span.replace(/\s/g, '') + " ") != -1) {
        return true;
    }
    return false;
}
//------------------------------------------------ Generate Authority Score Feature - End ------------------------------------------------


//------------------------------------------------ Generate Guarding Score Feature - Begin ------------------------------------------------
function GenerateGuardingScore(GuardingUrlScore, guardingkeyword, matchData) {
    if (GuardingUrlScore == 100 || IsArrayPhraseMatchForTitleSnippet(guardingkeyword, matchData.title)) {
        return c_guardingScore;
    }
    return 0;
}
//------------------------------------------------ Generate Guarding Score Feature - End ------------------------------------------------


//------------------------------------------------ Main Ranker - Begin ------------------------------------------------
function MainRanker(subIntentId, subIntentScore, MSSFDecodeResult, matchDataArray, intentMatchCondition, constraintMatchCondition, documentsLocal, documentCount) {
	
    var keyFeaturesOfDocuments = [];
    var docCount = documentCount;
	var top20doc = Math.min(docCount, 20);
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
		
		var entityMatchScore = GenerateEntityMatchingScore(MSSFDecodeResult.entity, matchData);
		var topSiteScoreResult = PETopSiteScoreDecode(featureVector[c_FeatureId_PEScoreTopSite], MSSFDecodeResult.urlKeyword, url, featureVector[c_FeatureId_UrlDepth]);
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
	if (!isTrigger) {
		for (i = 0; i < docCount; ++i) {
            documents[i].score = 1000.0 - i;
        }
		return;
	}
	
	// Trigger Condition 2
    var entityMatchingScoreDRScoreTop1 = keyFeaturesOfDocuments[maxDRScorePos].entityMatchScore;
	if (entityMatchingScoreDRScoreTop1 < entityMatchScoreThreshold) {
        for (i = 0; i < docCount; ++i) {
            documents[i].score = 1000.0 - i;
        }
		return;
    }
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
	if (subIntentScore >= 100 || entityMatchCountInTop10 == 10) {
		isKnownQuery = true;
	}
	if (specificSiteCountInTop5 >= 2) {
		isTrigger = true;
	}
	else {
		isTrigger = false;
	}
	
	if (!isTrigger && isKnownQuery) {
		if (IsTriggerForKnownQuery(entityMatchCountInTop20)) {
			isTrigger = true;
		}
        else {
			for (i = 0; i < docCount; ++i) {
				documents[i].score = 1000.0 - i;
			}
			return;
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
    if (isTrigger || (!isKnownQuery && IsTriggerForUnKnownQuery(keyFeaturesOfDocuments, specificSiteCountInTop5, entityMatchScoreThreshold))) {
		// Get not-guarding documents
		MSSFDecodeResult = PostWebSlotTagging(MSSFDecodeResult, wordDropQuery, matchDataArray);
        var rankVector = [];
        var rankVectorInOriPlace = [];
        var guardVector = [];
        for (i = 0; i < docCount; ++i) {
            if (!IsGuard(keyFeaturesOfDocuments[i], documentsLocal[i].rerankfeatures, i, entityMatchScoreThreshold)) {
                rankVector.push({ index: i, signal: 0.0 });
                rankVectorInOriPlace.push({ index: i });
			
            }
            else {
                documents[i].score = 1000.0 - i;
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
                scoringVector[i].signal = NormalizeRankScore(SCORING(MSSFDecodeResult, curKeyFeatures, curRerankFeatures, cureMatchData, entityMatchScoreThreshold, constraintMatchCondition, curIndex), curIndex);
            }
            else {
                scoringVector[i].signal = NormalizeRankScore(100.0, curIndex);
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
            if (!IsNull(hostScoreMapping[hostId]) && !(curKeyFeatures.authorityScore > c_officialSiteScore || curRerankFeatures[c_FeatureId_PEScoreDiversity] > 0)) {
                if (scoringVector[i].signal < hostScoreMapping[hostId]) {
                    rankVector[i].signal = NormalizeRankScore(100.0, rankVector[i].index);
                }
                else {
                    rankVector[i].signal = scoringVector[i].signal;
                }
            }
        }
		
        rankVector.sort(SortDescending);
        for (i = 0; i < rankDocLength; ++i) {
            documents[rankVector[i].index].score = 1000.0 - rankVectorInOriPlace[i].index;
        }
    }
    else {
        for (i = 0; i < docCount; ++i) {
            documents[i].score = 1000.0 - i;
        }
    }
}

function IsGuard(keyFeatures, rerankFeatures, documentPosition, entityMatchScoreThreshold) {
    // if (rerankFeatures[c_FeatureId_RankomaticScore] >= 5) {
        // return true;
    // }
	// if (documentPosition == 0 && markers[c_MarkerId_NumberOfPerfectMatches_BingClick] > 0) {
		// return true;
	// }
	if (keyFeatures.entityMatchScore >= entityMatchScoreThreshold && keyFeatures.intentMatchScore === 0 && keyFeatures.constraintMatchScore !== c_constraintMatchScoreOpposed && keyFeatures.lowQualitySiteScore === 0 && (keyFeatures.guardingScore === c_guardingScore || keyFeatures.authorityScore > c_officialSiteScore) && documentPosition < 5) {
        return true;
    }
    return false;
}

function IsTriggerForKnownQuery(entityMatchCountInTop20) {
    return entityMatchCountInTop20 >= 5;
}

function IsTriggerForUnKnownQuery(keyFeaturesOfDocuments, specificSiteCountInTop5, entityMatchScoreThreshold) {
    if (specificSiteCountInTop5 == 0) {
		return false;
	}
	var goodSiteCountInTop10 = 0;
    var length = Math.min(documentCount, 10);
    for (var i = 0; i < length; i++) {
        if (keyFeaturesOfDocuments[i].entityMatchScore >= entityMatchScoreThreshold && keyFeaturesOfDocuments[i].intentMatchScore >= c_intentMatchScore_3rd && keyFeaturesOfDocuments[i].authorityScore > 0) {
            goodSiteCountInTop10++;
        }
    }
    return goodSiteCountInTop10 >= 3;
}

function SCORING(MSSFDecodeResult, keyFeatures, rerankFeatures, matchData, entityMatchScoreThreshold, constraintMatchCondition, documentPosition) {
    var score = 0.0;

    var entityMatchScore = keyFeatures.entityMatchScore;
    var intentMatchScore = keyFeatures.intentMatchScore;
    var authorityScore = keyFeatures.authorityScore;
    if (entityMatchScore > 0 && intentMatchScore >= c_intentMatchScore_3rd) {
		var url = matchData.url;
        var constraintMatchUrlScore = PEConstraintScoreDecode(rerankFeatures[c_FeatureId_PEScoreConstraint], MSSFDecodeResult.urlKeyword, url, rerankFeatures[c_FeatureId_UrlDepth]);
        var constraintMatchScore = GenerateConstraintMatchingScore(constraintMatchCondition, MSSFDecodeResult.constraint, matchData, authorityScore, constraintMatchUrlScore, documentPosition);
        if (constraintMatchScore != c_constraintMatchScoreOpposed) {
            if (entityMatchScore >= entityMatchScoreThreshold) {
                score += c_entityMatchScore_1st;
            }
            else {
                score += entityMatchScore;
            }
            score += intentMatchScore;
            score += authorityScore;
            if (keyFeatures.contentQualityScore > 0) {
                score += 1000;
                if (constraintMatchScore >= c_constraintMatchScore_4th)
				{
					score += constraintMatchScore;
				}
            }
            return score;
        }
    }
    return 100.0;
}

function SortDescending(a, b) {
    return b.signal - a.signal;
}

function NormalizeRankScore(score, index) {
    return score * 100 + (100 - index);
}

function KeyFeatures(entityMatchScore, intentMatchScore, authorityScore, specificSiteScore, guardingScore, lowQualitySiteScore, topSiteScoreResult) {
    this.entityMatchScore = entityMatchScore;
    this.intentMatchScore = intentMatchScore;
    this.authorityScore = authorityScore;
    this.specificSiteScore = specificSiteScore;
    this.guardingScore = guardingScore;
    this.lowQualitySiteScore = lowQualitySiteScore;
    this.contentQualityScore = 1000;
	this.topSiteScoreResult = topSiteScoreResult;
}

function MatchData(title, url, snippet, wordFoundTitleArray, wordFoundBodyArray) {
    this.title = title;
    this.url = url;
    this.snippet = snippet;
    this.wordFoundTitleArray = wordFoundTitleArray;
    this.wordFoundBodyArray = wordFoundBodyArray;
}
//------------------------------------------------ Main Ranker - End ------------------------------------------------


//------------------------------------------------ Utilities - Begin ------------------------------------------------
function IsNull(obj) {
    return obj === null || typeof (obj) == "undefined";
}

function StreamNormalization(stream) {
	var newStream = [];
	var j = 0;
	var len = Math.min(stream.length, c_maxCaptionCharLength);
	for (var i = 0; i < len; i++) {
		var ch = stream.charCodeAt(i);
		if ((ch >= 97 && ch <= 122) || (ch >= 48 && ch <= 57)) {
			newStream[j++] = ch;
		}
		else if (ch >= 65 && ch <= 90) {
			newStream[j++] = ch + 32;
		}
		else {
			if(j>0 && newStream[j-1] != 32)
			{
				newStream[j++] = 32;
			}
		}
	}
	return String.fromCharCode.apply(this, newStream);
}

function IsPhraseMatchForTitleSnippet(phrase, stream) {
    if (IsNull(phrase) || phrase === "" || IsNull(stream))
        return false;
    return (" " + stream + " ").indexOf(" " + phrase + " ") != -1;
}

function IsPhraseMatchForUrl(phrase, stream) {
    if (IsNull(phrase) || phrase === "" || IsNull(stream))
        return false;
    return stream.indexOf(phrase) != -1;
}

function IsArrayPhraseMatchForTitleSnippet(array, stream) {
    if (IsNull(array) || IsNull(stream))
        return false;

    var length = array.length;
    for (var i = 0; i < length; i++) {
        if (IsPhraseMatchForTitleSnippet(array[i], stream))
            return true;
    }
    return false;
}

function IsArrayPhraseMatchForUrl(array, urlStream) {
    if (IsNull(array) || IsNull(urlStream))
        return false;

    var length = array.length;
    for (var i = 0; i < length; i++) {
        if (IsPhraseMatchForUrl(array[i], urlStream))
            return true;
    }
    return false;
}

function WordsFoundForTitleSnippet(phrase, wordFoundArray, stream) {
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
        else {
            if (IsPhraseMatchForTitleSnippet(term, stream)) {
                matchedCount++;
            }
        }
    }
    termMatchedRatio = matchedCount * 1.0 / phraseWords.length;
    return termMatchedRatio;
}

function ParseWordCandidatePresence(score) {
    var matchArray = new Array(8);
    for (var i = 0; i < 8; i++) {
        if ((score & 15) > 0) {
            matchArray[i] = 1;
        }
        else {
            matchArray[i] = 0;
        }
        score = score >>> 4;
    }
    return matchArray;
}

function GenerateHashCode(str) {
    var hash = 0, i, chr, len;
    if (str.length === 0) return hash;
    for (i = 0, len = str.length; i < len; i++) {
        chr = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash = hash & 0xfffff;
    }
    return hash;
}

function SortNumberDesc(a, b) {
    return b - a;
}
//------------------------------------------------ Utilities - End ------------------------------------------------
