// C: comments.
// 0:DomainAuthorityFeature_DUMultiInstanceUrlV2_0_4
// 1:DomainAuthorityFeature_DUMultiInstanceUrlV2_0_7
// 2:DomainAuthorityFeature_DUMultiInstanceUrlV2_0_5
// 3:DomainAuthorityFeature_DUMultiInstanceUrlV2_0_6
// 4:DomainAuthorityFeature_DUMultiInstanceUrlV2_0_8
// 5:UrlDepth
// 6:OnlineMemoryUrlFeature_0
// 7:NumberOfPerfectMatch_BingClick
// 8:NumberOfOccurrences_MultiInstanceTitle_0
// 9:NumberOfOccurrences_MultiInstanceTitle_1
// 10:NumberOfOccurrences_MultiInstanceTitle_2
// 11:NumberOfOccurrences_MultiInstanceTitle_3
// 12:NumberOfOccurrences_MultiInstanceTitle_4
// 13:NumberOfOccurrences_MultiInstanceTitle_5
// 14:NumberOfOccurrences_MultiInstanceTitle_6
// 15:NumberOfOccurrences_MultiInstanceTitle_7
// 16:NumberOfOccurrences_MultiInstanceTitle_8
// 17:NumberOfOccurrences_MultiInstanceTitle_9
// 18:NumberOfOccurrences_Body_0
// 19:NumberOfOccurrences_Body_1
// 20:NumberOfOccurrences_Body_2
// 21:NumberOfOccurrences_Body_3
// 22:NumberOfOccurrences_Body_4
// 23:NumberOfOccurrences_Body_5
// 24:NumberOfOccurrences_Body_6
// 25:NumberOfOccurrences_Body_7
// 26:NumberOfOccurrences_Body_8
// 27:NumberOfOccurrences_Body_9
// 28:HostId
// 29:DomainId

//------------------------------------------------ DrugSideEffects Config - Begin ------------------------------------------------
var c_SubIntentId_LyricsSongLyrics = 201;
var c_SubIntentId_LyricsSongLyricsArtist = 202;


var intentMatchCondition = [];
intentMatchCondition[c_SubIntentId_LyricsSongLyrics] = [0, 2, 0]; 
intentMatchCondition[c_SubIntentId_LyricsSongLyricsArtist] = [0, 2, 0]; 


var constraintMatchCondition = [];
constraintMatchCondition[c_SubIntentId_LyricsSongLyrics] = [0, 2, 2, 2, 2]; 
constraintMatchCondition[c_SubIntentId_LyricsSongLyricsArtist] = [0, 1, 1, 1, 1];

//------------------------------------------------ DrugSideEffects Config - End ------------------------------------------------

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
var c_FeatureId_PerfectMatch = 7;

//Marker Ids
var c_MarkerId_WordCandidatePresence_MultiInstanceTitle = 9; //
var c_MarkerId_WordCandidatePresence_Body = 11;

//Intermediate Feature Value
var c_officialSiteScore = 100;
var c_entityMatchScore_1st = 1000;
var c_entityMatchScore_2nd = 750;
var c_entityMatchScore_3rd = 500;
var c_entityMatchScore_4th = 250;
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

var startIndexTitle = 8; // represent the startIndex in rerankFeatures of NumberOfOccurrences_Title_[0-9]
var startIndexBody = 18; //represent the startIndex in rerankFeatures of NumberOfOccurrences_Body_[0-9]


// Stopwords used in PostWeb Slot Tagging
var c_stopWordsList = new Array("about", "an", "and", "are", "as", "at", "be", "but", "by", "com", "for", "from", "how", "if", "in", "is", "it", "of", "on", "or", "that", "the", "this", "to", "was", "what", "when", "where", "which", "who", "will", "with", "would", "www", "a", "i", "your", "s");

// clusterId and response intent tag
var clusterIdToIntentType = {"39": "int_elvis", "32": "int_allvideos", "79": "int_dead", "63": "int_singer", "19": "int_albumsreleased", "38": "int_bandmembers", "20": "int_mean", "68": "int_christian", "84": "int_artist", "12": "int_cortana", "90": "int_bestlyrics", "40": "int_child", "75": "int_google", "37": "int_bestlyrics", "86": "int_meme", "58": "int_alive", "7": "int_chordchart", "88": "int_friend", "62": "int_alive", "5": "int_bestlyrics", "65": "int_write", "26": "int_allvideos", "43": "int_commercial", "54": "int_artist", "29": "int_allvideos", "61": "int_french", "13": "int_freedownload", "49": "int_picture", "42": "int_bestlyrics", "74": "int_cast", "3": "int_bestlyrics", "48": "int_beyonce", "22": "int_albumsreleased", "27": "int_albumsreleased", "28": "int_instrumental", "93": "int_wiki", "55": "int_best", "34": "int_eminem", "89": "int_albumcover", "17": "int_chordchart", "81": "int_cancion", "25": "int_beachboys", "31": "int_quote", "30": "int_allvideos", "15": "int_allvideos", "78": "int_hymn", "10000": "int_beatles", "44": "int_autobiography", "24": "int_remix", "70": "int_child", "57": "int_alive", "91": "int_composer", "80": "int_englishlyrics", "56": "int_band", "52": "int_mean", "92": "int_duet", "66": "int_bestlyrics", "60": "int_allvideos", "64": "int_name", "33": "int_best", "53": "int_dance", "72": "int_albumsreleased"};

//var clusterIdToIntentType = {"237":"int_elvis","230":"int_allvideos","281":"int_dead","264":"int_singer","215":"int_albumsreleased","236":"int_bandmembers","217":"int_mean","269":"int_christian","287":"int_artist","208":"int_cortana","293":"int_bestlyrics","239":"int_child","277":"int_google","235":"int_bestlyrics","289":"int_meme","258":"int_alive","271":"int_chordchart","290":"int_friend","263":"int_alive","249":"int_bestlyrics","266":"int_write","223":"int_allvideos","242":"int_commercial","254":"int_artist","226":"int_allvideos","262":"int_french","209":"int_freedownload","248":"int_picture","241":"int_bestlyrics","276":"int_cast","227":"int_bestlyrics","247":"int_beyonce","219":"int_albumsreleased","224":"int_albumsreleased","225":"int_instrumental","296":"int_wiki","255":"int_best","232":"int_eminem","291":"int_albumcover","213":"int_chordchart","284":"int_cancion","222":"int_beachboys","229":"int_quote","228":"int_allvideos","211":"int_allvideos","280":"int_hymn","243":"int_autobiography","221":"int_remix","272":"int_child","257":"int_alive","294":"int_composer","283":"int_englishlyrics","256":"int_band","252":"int_mean","295":"int_duet","267":"int_bestlyrics","261":"int_allvideos","265":"int_name","231":"int_best","253":"int_dance","274":"int_albumsreleased"};
// intent type and response key words
var intentKeyWords = {"int_bandmembers": ["band members", "current members", "members"], "int_actress": ["actress"], "int_albumcover": ["album cover", "cover", "covered", "covers"], "int_eminem": ["eminem"], "int_history": ["history"], "int_single": ["single"], "int_author": ["author"], "int_meme": ["meme", "memes"], "int_analysis": ["analysis"], "int_cast": ["cast"], "int_drummer": ["drummer"], "int_dead": ["dead", "death", "died"], "int_artist": ["artist", "artists"], "int_bpm": ["bpm"], "int_awardswon": ["awards won", "awards"], "int_albumsreleased": ["albums released", "best albums", "full album", "album", "albums", "cd", "cd s", "cds", "discography"], "int_alive": ["alive", "live", "living"], "int_bestversion": ["best version", "country version", "version"], "int_name": ["name", "names"], "int_french": ["french"], "int_wiki": ["wiki", "wikipedia"], "int_grammy": ["grammy", "grammys"], "int_allvideos": ["all videos", "video", "videos", "tube", "youtube", "utube", "vimeo", "youtub", "yutube"], "int_quote": ["quote", "quotes"], "int_characters": ["characters"], "int_beachboys": ["beach boys", "boy", "boys"], "int_age": ["age"], "int_child": ["child", "children", "kids"], "int_best": ["best", "famous", "top"], "int_elvis": ["elvis"], "int_interview": ["interview"], "int_movie": ["movie", "film"], "int_duet": ["duet", "duets"], "int_son": ["son"], "int_remake": ["remake"], "int_date": ["date"], "int_rock": ["rock"], "int_anthem": ["anthem"], "int_fact": ["fact", "facts", "information"], "int_autobiography": ["autobiography", "bio", "biography", "birthplace"], "int_hit": ["hit", "hits"], "int_ballad": ["ballad"], "int_theme": ["theme"], "int_bandsinfluenced": ["bands influenced", "influence", "influenced"], "int_freedownload": ["free download", "free mp3 download", "download", "downloads"], "int_hymn": ["hymn"], "int_cancion": ["cancion", "canciones"], "int_dance": ["dance", "dancing"], "int_commercial": ["commercial"], "int_picture": ["picture", "pictures", "images", "pic", "pics"], "int_chordchart": ["chord chart", "chords key", "chords lyrics", "guitar chords", "guitar chords lyrics", "lyrics chords", "chord", "chords", "cords", "tab", "guitar", "guitarist", "guitar cords", "chordie", "echords", "guitar tab", "guitar tabs", "chorus"], "int_completelist": ["complete list", "list"], "int_key": ["key"], "int_englishlyrics": ["english lyrics", "english version"], "int_beyonce": ["beyonce"], "int_anotherwords": ["another words", "another word"], "int_background": ["background"], "int_band": ["band"], "int_performance": ["performance", "performed"], "int_adele": ["adele"], "int_beatles": ["beatles"], "int_christian": ["christian", "gospel"], "int_remix": ["remix"], "int_cortana": ["cortana"], "int_freshprince": ["fresh prince", "prince"], "int_rap": ["rap", "raps"], "int_audio": ["audio", "sound"], "int_copyright": ["copyright"], "int_cleanversion": ["clean version"], "int_mean": ["mean", "meaning", "meanings"], "int_friend": ["friend", "friends"], "int_composer": ["composer"], "int_genre": ["genre"], "int_google": ["google"], "int_write": ["write", "written", "wrote"], "int_azlyrics": ["az lyrics", "azlyrics"], "int_singer": ["singer"], "int_brother": ["brother", "brothers"], "int_bestlyrics": ["best lyrics", "christian lyrics", "find lyrics", "free lyrics", "full lyrics", "gospel lyrics", "lyric", "lyrics", "kyrics", "lirycs", "lrics", "lurics", "lyircs", "lyr", "lyrcis", "lyrcs", "lyri", "lyricd", "lyrice", "lyrivs", "lyrocs", "lyrucs", "lytics", "yrics", "lirics", "lryics", "ly", "lyics", "lyrica", "lyricks", "lyris"], "int_bassist": ["bassist"], "int_acousticversion": ["acoustic version"], "int_instrumental": ["instrumental", "karaoke", "kareoke", "karoke"], "int_accompanimenttrack": ["accompaniment track"], "int_blue": ["blue", "blues"], "int_type": ["type"], "int_hallelujah": ["hallelujah"], "int_englishtranslation": ["english translation", "translated"], "int_father": ["father"]};

//------------------------------------------------ Constant Define - End ------------------------------------------------

var msSemanticFrame;


if (!addquerylist.IsEmpty()) {
    for (var addquery = addquerylist.top; !addquery.IsNull() ; addquery = addquery.next) { // what's addquerylist represent
        if (addquery.name == "MSSemanticFrame") {
            msSemanticFrame = addquery.value; //get from the clumn "Augmented Query(augmentedquery)"
            break;
        }
    }
}

var documentCount = documents.count;
if (IsNull(msSemanticFrame) || documentCount == 0) {
    for (var i = 0; i < documentCount; ++i) {
        documents[i].score = 1000.0 - i;
    }
}
else {
    // following three features get from the column "Augmented Query(augmentedquery)
    var subIntentId = qlfs[c_subIntentIdQLF]; //query intent
    var subIntentScore = qlfs[c_subIntentScoreQLF];
    var query = extractedquery; 
    var MSSFDecodeResult = MSSFDecode(msSemanticFrame);
    var wordDropQuery = query.replace(/word:\((\w+)[^\)]+\)/g, "$1").replace(/rankonly:/g, "");
    var queryTermArray = wordDropQuery.split(" ");
   // var queryTermArray = rawquery.split(" ");
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
        title = IsNull(title) ? "" : StreamNormalization(title); //only get the character and digital, other char changed into space
        url = IsNull(url) ? "" : url.toLowerCase().substring(0, c_maxCaptionCharLength);
        snippet = IsNull(snippet) ? "" : StreamNormalization(snippet);
		var rerankFeatures = curDoc.rerankfeatures;
        var wordFoundTitleArray = ParseWordFoundArray(startIndexTitle, rerankFeatures); //ParseWordCandidatePresence(marketVector[c_MarkerId_WordCandidatePresence_MultiInstanceTitle]);//decode the L2 features: NumberOfOccurrences_MultiInstanceTitle_0, ... , NumberOfOccurrences_MultiInstanceTitle_7
        var wordFoundBodyArray = ParseWordFoundArray(startIndexBody, rerankFeatures); //ParseWordCandidatePresence(marketVector[c_MarkerId_WordCandidatePresence_Body]);//decode the L2 features: NumberOfOccurrences_Body_0,..., NumberOfOccurrences_Body_7
        var matchData = new MatchData(title, url, snippet, wordFoundTitleArray, wordFoundBodyArray);
        matchDataArray.push(matchData);
    }
    MainRanker(subIntentId, subIntentScore, MSSFDecodeResult, matchDataArray, intentMatchCondition[c_SubIntentId_LyricsSongLyrics ], constraintMatchCondition[c_SubIntentId_LyricsSongLyrics], documents, documentCount, queryTermDict, alteredquery);

}

//------------------------------------------------ Parse NumberOfOccurrences_Title - Begin -----------------------------------------
function ParseWordFoundArray(startIndex, rerankFeatures){
	var wordOccurArray = new Array(10);
	for (var i = 0; i < 10; i++){
		var value = rerankFeatures[i + startIndex];
		if(IsNull(value)) {
			value = 0;
		}
		wordOccurArray[i] = value;
	}
	return wordOccurArray;
}
//------------------------------------------------ Parse NumberOfOccurrences_Title - End -----------------------------------------

//------------------------------------------------ MSSemanticFrame Decoder - Begin ------------------------------------------------
function MSSFDecode(addQuery) { 
    var entity = [];
    var otherIntents = [];
    var majorIntent;
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
        if (key == "entity" || key == "Entity") {
            var entityListTemp = value.split("^");
            var entitySet = {};
            for (var j = 0, len = entityListTemp.length; j < len; j++) {
                var entityItemArray = entityListTemp[j].split("&");
                var entityItemArrayLen = entityItemArray.length;
                if (entityItemArrayLen >= 1 && entityItemArray[0] == "") {
                    continue;
                }
                var entitySpan = entityItemArray[0];
				if(IsNull(entitySpan)){
					continue;
				}
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
            var majorTypeSpans = {}, otherTypeSpans = {};
            var clusterId = qlfs[c_subIntentIdQLF];
            if (!(clusterId in clusterIdToIntentType)){
                continue;
           }
            var majorType = clusterIdToIntentType[clusterId]; // global variable clusterIdToIntentType; 
            var intentTypeSpans = {};
            var intentTypeSpansArr = value.split("^");
            for (var k = 0, len = intentTypeSpansArr.length; k < len; k++){
				var typeSpanStr = intentTypeSpansArr[k];
				if(IsNull(typeSpanStr)){
					continue;
				}
				var typeSpan = typeSpanStr.split("&");
				if(typeSpan.length != 2){
					continue;
				}
				var intentType = typeSpan[0];
                var span = typeSpan[1];
                if (intentType == majorType) {
					majorIntent = new IntentClass(intentType, span);
                }
                else {
					otherIntents.push(new IntentClass(intentType, span));
                }
            }
        }
        else if (key == "constraint" || key == "Constraint") {
            var constraintListTemp = value.split("^");
            var constraintSet = {};
            for (var m = 0, len = constraintListTemp.length; m < len; m++) {
                var constraintItemArray = constraintListTemp[m].split("&");
                if (constraintItemArray.length != 4) {
                    continue;
                }
                var constraintOri = constraintItemArray[0];
				if(IsNull(constraintOri)){
					continue;
				}
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
            for (var n = 0, len = inputUrlKeyWordList.length; n < len; n++) {
                urlKeywordListTemp[n] = inputUrlKeyWordList[n];
            }
            urlKeyword = new UrlKeywordClass(urlKeywordListTemp[0].split("|"), urlKeywordListTemp[1].split("|"), urlKeywordListTemp[2].split("|"));
        }
        else if (key == "guarding" || key == "Guarding") {
            guardingkeyword = value.split("|");
        }
        else if (key == "officialsite" || key == "OfficialSite") {
            var officialSiteListTemp = value.split("^");
            for (var r = 0, len = officialSiteListTemp.length; r < len; r++) {
                var officialSiteItemArray = officialSiteListTemp[r].split("&");
                if (officialSiteItemArray.length != 2) {
                    continue;
                }
                officialSite.push(new OfficialSiteClass(officialSiteItemArray[0], officialSiteItemArray[1]));
            }
        }
        else if (key == "siteconstraint" || key == "SiteConstraint") {
            var siteConstraintTemp = value.split("^");
            var siteConstraintSet = {};
            for (var o = 0, len = siteConstraintTemp.length; o < len; o++) {
                var siteCons = siteConstraintTemp[o];
                var siteConsCode = GenerateHashCode(siteCons);
                if (IsNull(siteConstraintSet[siteConsCode])) {
                    siteConstraint.push(siteCons);
                    siteConstraintSet[siteConsCode] = 1;
                }
            }
        }
        else if (key == "otherslots" || key == "OtherSlots") {
            var otherSlotListTemp = value.split("^");
            for (var p = 0, len = otherSlotListTemp.length; p < len; p++) {
                otherSlots.push(otherSlotListTemp[p]);
            }
        }
    }
    return new MSSFDecodeResult(entity, majorIntent, otherIntents, constraint, urlKeyword, guardingkeyword, officialSite, siteConstraint, otherSlots);
}

function MSSFDecodeResult(entity, majorIntent, otherIntents, constraint, urlKeyword, guardingkeyword, officialSite, siteConstraint, otherSlots) {
    this.entity = entity;
    this.majorIntent = majorIntent;
    this.otherIntents = otherIntents;
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
function PostWebSlotTagging(MSSFDecodeResult, canonicalQuery, matchDataArray) {
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
    for (i = 0, len = MSSFDecodeResult.otherIntents.length; i < len; i++) {
        termArray = MSSFDecodeResult.otherIntents[i].span.toString().split(' ');
        for (j = 0, termCount = termArray.length; j < termCount; j++) {
            code = GenerateHashCode(termArray[j]);
            filterTermDict[code] = 1;
        }
    }
	if (!IsNull(MSSFDecodeResult.majorIntent)) {
		var majorIntent = MSSFDecodeResult.majorIntent.span;
		termArray = majorIntent.toString().split(' ');
		for (j = 0, termCount = termArray.length; j < termCount; j++) {
			code = GenerateHashCode(termArray[j]);
			filterTermDict[code] = 1;
		}
	}
	if(!IsNull(MSSFDecodeResult.constraint)){
		for (i = 0, len = MSSFDecodeResult.constraint.length; i < len; i++) {
			termArray = MSSFDecodeResult.constraint[i].original.split(' ');
			for (j = 0, termCount = termArray.length; j < termCount; j++) {
				code = GenerateHashCode(termArray[j]);
				filterTermDict[code] = 1;
			}
		}
	}
	if(!IsNull(MSSFDecodeResult.siteConstraint)){
		for (i = 0, len = MSSFDecodeResult.siteConstraint.length; i < len; i++) {
			termArray = MSSFDecodeResult.siteConstraint[i].split(' ');
			for (j = 0, termCount = termArray.length; j < termCount; j++) {
				code = GenerateHashCode(termArray[j]);
				filterTermDict[code] = 1;
			}
		}
	}
    
    for (i = 0, len = MSSFDecodeResult.otherSlots.length; i < len; i++) {
        termArray = MSSFDecodeResult.otherSlots[i].split(' ');
        for (j = 0, termCount = termArray.length; j < termCount; j++) {
            code = GenerateHashCode(termArray[j]);
            filterTermDict[code] = 1;
        }
    }
	
	var canonicalTermDic = {};
	canonicalQuery = canonicalQuery.replace(/rankonly:/g, "");
	var res = new Array();
	res = canonicalQuery.match(/word:\([^\)]+\)/g);
	if(!IsNull(res)){
		for (i = 0; i < res.length; i++){
			var termArray = res[i].replace(/word:\(([^\)]+)\)/g, "$1").toString().split(' ');
			var keyTerm = "";
			if (termArray.length > 0){
				keyTerm = termArray[0];
			}
			code = GenerateHashCode(keyTerm);
			canonicalTermDic[code] = termArray;
		}
	}
	var rawquery = canonicalQuery.replace(/word:\((\w+)[^\)]+\)/g, "$1");
    var candidateListTemp = rawquery.split(' ');
    var candidateListPre = [];
    for (i = 0, len = candidateListTemp.length; i < len; i++) {
        var candidate = candidateListTemp[i];
        if (candidate !== "" && IsNull(filterTermDict[GenerateHashCode(candidate)])) {
			//code = GenerateHashCode(candidate);
            candidateListPre.push(candidate);
        }
    }
    var maxDRScore = 0;
	var maxDRSCorePos = 0;
    var drScoreTop1MatchData = matchDataArray[0];
    var top1MatchData = matchDataArray[0];
	var ngramList = GetNgrams(candidateListPre, 4);
	var candidateList = [];
	for(i = 0, len = ngramList.length; i < len; i++){
		var ngram = ngramList[i];
		var ngramTermArray = ngram.split(' ');
		if (!IsNull(filterTermDict[GenerateHashCode(ngram)]) && !IsNull(filterTermDict[GenerateHashCode(ngramTermArray[0])]) && !IsNull(filterTermDict[GenerateHashCode(ngramTermArray[ngramTermArray.length -1])])){
			candidateList.push(new CandidateTermClass(ngram));
		}
	}
    var candCount = candidateList.length;
    var curCandidate, curCandTerm;
	for (i = 0, len = documentCount; i< len; ++i){
		var drScore = documents[i].l2score;
        if (drScore > maxDRScore) {
            maxDRScore = drScore;
            maxDRSCorePos = i;
        }
	}
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
			if (i == 0 && (isCandidateMatchSnippet || isCandidateMatchTitle)){
				curCandidate.top1Match = 1;
			}
			if (i == maxDRScore && (isCandidateMatchSnippet || isCandidateMatchTitle)){
				curCandidate.drScoreTop1Match = 1;
			}
        }
        
    }
	
	var constraintPreFilter = [];
    for (j = 0; j < candCount; j++) {
        curCandidate = candidateList[j];
        if (curCandidate.titleTop5Count >= c_PostwebConstraintTitleTop5Thres || curCandidate.titleTop10Count >= c_PostwebConstraintTitleTop10Thres || curCandidate.bodyTop5Count >= c_PostwebConstraintBodyTop5Thres || curCandidate.bodyTop10Count >= c_PostwebConstraintBodyTop10Thres) {
			constraintPreFilter.push(curCandidate);
        }
    }
	constraintPreFilter.sort(SortByItemStringLength);
	for (j = 0, len = constraintPreFilter.length; j < len; j++){
		curCandidate = constraintPreFilter[j];
		var item = curCandidate.term;
		var isOutput = false;
		if (item.length == 1){
			isOutput = true;
		}
		if (isOutput){
			if(curCandidate.drScoreTop1Match == 0){
				isOutput = false;
			}
		}
		if (isOutput){
			MSSFDecodeResult.constraint.push(new ConstraintClass(curCandTerm, "", "", ""));
		}
		
	}
    return MSSFDecodeResult; 
}

function GetNgrams(candidateList, ngram){
	var result = [];
	var count = candidateList.length;
	for (var i = 0; i < count - 1; i ++){
		for (var j = 0; j < ngram; j++){
			if ((i + j) > (count - 1)){
				break;
			}
			result.push(getNgram(candidateList, i, i+j));
		}
	}
	return result;
}

function getNgram(candidateList, begin, end){
	var result = "";
	for(var i = begin; i <= end; i++){
		result += candidateList[i] + " ";
	}
	return result;
}

function CandidateTermClass(term) {
    this.term = term;
    this.titleTop5Count = 0;
    this.titleTop10Count = 0;
    this.bodyTop10Count = 0;
    this.bodyTop5Count = 0;
	this.top1Match = 0;
	this.drScoreTop1Match = 0;
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

    scoreTemp = scoreTemp >>> 9;
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
            scoreTemp = scoreTemp >>> 9;
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
    var scoreBasic = scoreTemp & 127;
    return new PETopSiteScoreBasicSection(scoreBasic, isSpecificBasic, isIntentBasic);
}

function PETopSiteScoreExtendSectionDecode(score) {
    var scoreTemp = score;
    var PETopSiteScoreBasicSectionTemp = PETopSiteScoreBasicSectionDecode(scoreTemp);
    scoreTemp = scoreTemp >>> 9;
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
LogDebug("entity", entity, '\r\n');
        if (entityItem.score >= 1.0) {
            if (entity.indexOf(' ') != -1) {
                if (IsPhraseMatchForTitleSnippet(entity, title)) {
                    entityMatchFeature += 1000; //c_entityMatchScore_1st;
                }
                else if (IsPhraseMatchForTitleSnippet(entity, snippet)) {
                    entityMatchFeature += 750; //c_entityMatchScore_2nd;
                }
                else if (WordsFoundForTitleSnippet(entity, wordFoundTitleArray, title) == 1) {
                    entityMatchFeature += 500;//c_entityMatchScore_3rd;
                }
                else if (WordsFoundForTitleSnippet(entity, wordFoundBodyArray, snippet) == 1) {
                    entityMatchFeature += 250; //c_entityMatchScore_4th;
                }
            }
            else {
                if (WordsFoundForTitleSnippet(entity, wordFoundTitleArray, title) == 1) {
                    entityMatchFeature += 1000; //c_entityMatchScore_1st;
                }
                else if (WordsFoundForTitleSnippet(entity, wordFoundBodyArray, snippet) == 1) {
                    entityMatchFeature += 750; //c_entityMatchScore_2nd;
                }
            }
        }
        else {
            entityMatchFeature += WordsFoundForTitleSnippet(entity, wordFoundTitleArray, title) * 1000.0;
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

//------------------------------------------------ Normalize Intent Matching Score - Begin ------------------------------------------------
function NormalizeIntentMatchingScore(score){
    if(score>3999){
        return 4000.0;
    }
    else if(score >2666){
        return 3000.0;
    }
    else if(score > 1333){
        return 2000.0;
    }
    else if(score > 0){
        return 1000.0;
    }
    else {
        return 0;
    }
}
//------------------------------------------------ Normalize Intent Matching Score - End ------------------------------------------------

//------------------------------------------------ Generate Entity Matching Feature - End ------------------------------------------------
function GenerateIntentMatchingScore_v02(intentOther, intentMajor, matchData){ //intentMajor correspond to clusterId, intentOther is the int_tag come from m:Tags

    var url = matchData.url;
    var title = matchData.title;
    var snippet = matchData.snippet;
    var score = 0;
    if(IsArrayPhraseMatchForUrl(intentMajor, url) || IsArrayPhraseMatchForTitleSnippet(intentMajor, title)){
        score += 0.7 * 4000.0;
    }
    else if(IsArrayPhraseMatchForTitleSnippet(intentMajor, snippet)){
        score += 0.7 * 2000.0;
    }

    if(IsArrayPhraseMatchForUrl(intentOther, url) || IsArrayPhraseMatchForTitleSnippet(intentOther, title) ){
        score += 0.3 * 4000.0;
    }
    else if(IsArrayPhraseMatchForTitleSnippet(intentOther, snippet)){
        score += 0.3 * 2000.0;
    }
    score = NormalizeIntentMatchingScore(score);
    return score;
}

function TermMatchWordsFound(entity, queryTermDict, url, title, snippet, wordFoundTitleArray, wordFoundBodyArray) {
	var matchTermArray = [0, 0, 0];//url, title, snippet match count
	if(IsNull(entity)) {
		return matchTermArray;
	}
	var entityTerms = entity.toString().split(" ");
	var len = entityTerms.length;
	for(var i = 0; i < len; i++) {
		var isTermUrlMatch = 0;
		var isTermTitleMatch = 0;
		var isTermSnippetMatch = 0;
		var entityTerm = entityTerms[i];
		if(IsPhraseMatchForUrl(entityTerm, url)) {
			isTermUrlMatch = 1;
		}
		if(IsPhraseMatchForUrl(entityTerm, title)){
			isTermTitleMatch = 1;
		}
		if(IsPhraseMatchForUrl(entityTerm, snippet)) {
			isTermSnippetMatch = 1;
		}

		if(entityTerm in queryTermDict) {
			var index = queryTermDict[entityTerm];
			if(index < 10){
				if(wordFoundTitleArray[index] > 0) {
					isTermTitleMatch = 1;
				}
				if(wordFoundBodyArray[index] > 0) {
					isTermSnippetMatch = 1;
				}
			}
		}
		if(isTermUrlMatch == 1) {
			matchTermArray[0] += 1;
		}
		if(isTermTitleMatch == 1) {
			matchTermArray[1] += 1;
		}
		if(isTermSnippetMatch == 1) {
			matchTermArray[2] += 1;
		}
	}
	if (len != 0) {
		matchTermArray[0] = matchTermArray[0] * 1000.0 / len;
		matchTermArray[1] = matchTermArray[1] * 1000.0 / len;
		matchTermArray[2] = matchTermArray[2] * 1000.0 / len;
	}
	return matchTermArray;
}
function TermArrayMatchingExactPhrase(keyWords, url, title, snippet){
	var matchTermArray = [0, 0, 0];
	var len = keyWords.length;
	var score = 0.0;
	if (len == 0){
		return matchTermArray;
	}
	for(var i = 0; i < len; i++) {
		var word = keyWords[i];
		if(matchTermArray[0] == 0 && IsPhraseMatchForUrl(word, url)){
			matchTermArray[0] = 1000;
		}
		else if(matchTermArray[1] == 0 && IsPhraseMatchForTitleSnippet(word, title)){
			matchTermArray[1] = 1000;
		}
		else if(matchTermArray[2] == 0 && IsPhraseMatchForTitleSnippet(word, snippet)){
			matchTermArray[2] = 1000.0;
		}
    }
	return matchTermArray;
}

function GenerateIntentMatchingScore(otherIntents, majorIntent, matchData, queryTermDict, wordFoundTitleArray, wordFoundBodyArray){
	var majorIntentMatch = GenerateIntentMatchingScore_SpecifiedIntent(majorIntent, matchData, queryTermDict);
	var otherIntentMatch = 0.0;
	var len = otherIntents.length;
	for(var i = 0; i < len; i++) {
		var intent = otherIntents[i];
		otherIntentMatch += GenerateIntentMatchingScore_SpecifiedIntent(intent, matchData, queryTermDict);
	}
	if (len != 0) {
		otherIntentMatch = otherIntentMatch / len;
	}
	var score = 0.7 * majorIntentMatch + 0.3 * otherIntentMatch;
	score = NormalizeIntentMatchingScore(score);
	return score;
}

function GenerateIntentMatchingScore_SpecifiedIntent(intent, matchData, queryTermDict){ //intentMajor correspond to clusterId, intentOther is the int_tag come from m:Tags; 
	if(IsNull(intent)){
		return 0.0;
	}
    var url = matchData.url;
    var title = matchData.title;
    var snippet = matchData.snippet;
	var span = intent.span; 
	var type = intent.type;
    var score = 0;
	var matchTermArray = new Array(3);
	matchTermArray = TermMatchWordsFound(span, queryTermDict, url, title, snippet, matchData.wordFoundTitleArray, matchData.wordFoundBodyArray);
	var matchAliasArray = new Array(3);
	if (type in intentKeyWords) {
		var keyWords = intentKeyWords[type];
		matchAliasArray = TermArrayMatchingExactPhrase(keyWords, url, title, snippet);
	}
	if(matchTermArray[0] == 1000 || matchAliasArray[0] == 1000 || matchTermArray[1] == 1000 || matchAliasArray[1] == 1000) {
		return 4000.0;
	}
	else if(matchTermArray[2] == 1000 || matchAliasArray[2] == 1000) {
		return 2000.0;
	}
	else {
		return 0.0;
	}
}
//------------------------------------------------ Generate Intent Matching Feature - Begin ------------------------------------------------

//------------------------------------------------ Generate Intent Matching Feature - End ------------------------------------------------

//------------------------------------------------ Generate Intent Matching Feature - Begin ------------------------------------------------
function GenerateIntentMatchingScore_Old(intentMatchConditionArray, intent, matchData, isIntentMatchUrl) {
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
		if(consMatchForOne == c_constraintMatchScore_1st){
				consMatchForOne += 0;
		}
		else if(consMatchForOne == c_constraintMatchScore_2nd){
				consMatchForOne += 0;
		}
		else if(consMatchForOne == c_constraintMatchScore_3rd){
				consMatchForOne += 400;
		}
		else if(consMatchForOne == c_constraintMatchScore_4th){
				consMatchForOne += 400;
		}
        if (consMatchForOne == 1) {
            hasOpposed = true;
        }
		consMatchFeature += consMatchForOne;
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
	
	isConsOriMatchTitle = WordsFoundForTitleSnippet(consOri, wordFoundTitleArray, title) == 1;

	isConsOriMatchUrl = IsPhraseMatchForUrl(consOri, url);
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
            if (isConsOpposedMatchTitle && !isConsOriMatchTitle) {
                isCondition0Match = true;
            }
			if(isCondition0Match){
				break;
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
            if ((isConsOriMatchTitle || isConsSynoMatchTitle) && (constraintMatchUrlScore == 1 || authorityScore == c_officialSiteScore)){
				isCondition1Match = true;
                break;
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
	isConsOriMatchBody = WordsFoundForTitleSnippet(consOri, wordFoundBodyArray, snippet) == 1;
    var isCondition2Match = false;
    switch (constraintMatchConditionArray[2]) {
        case 0:
            isCondition2Match = false;
            break;
        case 1:
            isCondition2Match = true;
            break;
        case 2:
			if(((isConsOriMatchBody || isConsSynoMatchBody) && IsNull(isConsOpposedMatchTitle) &&  IsNull(isConsExcludeMatchBody) && (constraintMatchUrlScore == 1 || authorityScore == c_officialSiteScore))|| ((isConsOriMatchTitle || isConsSynoMatchTitle) && constraintMatchUrlScore == 2)){
				isCondition2Match = true;
                break;
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
			if((isConsOriMatchTitle || isConsSynoMatchTitle) && documentPosition < c_officialSiteScore){
				isCondition3Match = true;
                break;
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
			if((isConsOriMatchBody || isConsSynoMatchBody) && IsNull(isConsOpposedMatchTitle) && IsNull(isConsExcludeMatchBody) && documentPosition < c_officialSiteScore){
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
    var isSiteConsMatchDomain = 0;
    if (IsSiteConstraintMatch(siteConstraint, domain)) {
        isSiteConsMatchDomain = 1000;
    }
	if (documentPosition < c_officialSiteDPThres && IsOfficialSite1(entityList, domain)) {
		return [c_officialSiteScore, isSiteConsMatchDomain];
    }
    else if (isSiteConsMatchDomain == 1000) {
        var result = authorityScoreTemp + c_officialSiteScore + 1;
        return [result, isSiteConsMatchDomain];
    }
    else {
        return [authorityScoreTemp, isSiteConsMatchDomain];
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
function GenerateGuardingScore(GuardingUrlScore, guardingkeyword, matchData, intentMatchAnyTop5) {
    //****how to compute the guardingScore based on the flowing conditions*******************
    /*
       • Will keep the document’s original position if it meet all the following conditions at the same time:
       ? At least one document in Top5 IntentMatching > 0; // intentMatchInTop5
       ? EntityMatching > threshold;
       ? IntentMatching == 0;
       ? GuardingScore == 1000 or SiteConstraintMatchDomain == 1000;
       ? LowQualitySiteScore == 0 and No opposed constraint match.
       */
    if (GuardingUrlScore == 100 || IsArrayPhraseMatchForTitleSnippet(guardingkeyword, matchData.title)) {
        return c_guardingScore;
    }
    return 0;
}
//------------------------------------------------ Generate Guarding Score Feature - End ------------------------------------------------

//------------------------------------------------ Generate Threshold Score Feature - Begin @Frank---------------------------------------------
function GenerateNumNoZero(threshold_top, weightScore_thresholdBingClick, weightScore_fastBrain){
    var num_nozero = 0;
    var sum_threshold = 0;
    if (threshold_top != 0){
        num_nozero += 1;
        sum_threshold += threshold_top;
    }
    if(weightScore_thresholdBingClick !== 0){
        num_nozero += 1;
        sum_threshold += weightScore_thresholdBingClick;
    }
    if(weightScore_fastBrain != 0){
        num_nozero += 1;
        sum_threshold += weightScore_fastBrain;
    }
    if (num_nozero > 0){
        return sum_threshold / num_nozero;
    }
    else {
        return 0;
    }
}

function NormalizeConstraintThreshold(score){
    var score_normalize = 0;
    if (score >= 700){
        score_normalize = 800;
    }
    else if(score >= 500){
        score_normalize = 600;
    }
    else if(score >= 300) {
        score_normalize = 400;
    }
    else if(score >= 100) {
        score_normalize = 200;
    }
    else {
        score_normalize = 0;
    }
    return score_normalize;
}


function GenerateConstrainThresholdScore(matchDataArray, documentsLocal, top20doc, keyFeaturesOfDocuments) {
    var curDoc, featureVector, matchData, url;

    var weightScore_thresholdBingClick_constraint = 0; //Threshold_BingClick
    var sum_thresholdBingClick = 0;
    var sum_onlineMemoryUrlFeature = 0; 
    var drConstraintScoreArray = new Array(20);
    var weightScore_fastBrain_constraint = 0;
    for (i = 0; i < top20doc; ++i) {
        curDoc = documentsLocal[i];
        featureVector = curDoc.rerankfeatures;
        matchData = matchDataArray[i];
        url = matchData.url;
		var numberOfPerfectMatch_BingClick_i = featureVector[c_FeatureId_PerfectMatch]; //curDoc.NumberOfPerfectMatch_BingClick;// Check how to get the feature from L2;
        var onlineMemoryUrlFeature_i = featureVector[c_FeatureId_RankomaticScore]; 
		if(isNaN(onlineMemoryUrlFeature_i)){
			onlineMemoryUrlFeature_i = 0.0;
		}
		if(isNaN(numberOfPerfectMatch_BingClick_i)) {
			numberOfPerfectMatch_BingClick_i = 0.0;
		}
		//curDoc.OnlineMemoryUrlFeature_0; // check weather the method to get L2 feature ONline is right?
        //Generate cons match score
        var constraintMatchScore = keyFeaturesOfDocuments[i].constraintMatchScore;
        //Generate Threshold_BingClick
        weightScore_thresholdBingClick_constraint += constraintMatchScore * numberOfPerfectMatch_BingClick_i;
        sum_thresholdBingClick += numberOfPerfectMatch_BingClick_i;

        //Generate Threshold_FastBrain
        weightScore_fastBrain_constraint += constraintMatchScore * onlineMemoryUrlFeature_i;
        sum_onlineMemoryUrlFeature += onlineMemoryUrlFeature_i;

        drConstraintScoreArray[i] = constraintMatchScore;
    }
	
    // Generate constrain threshold of FastBrain/BingClick 
	if(sum_thresholdBingClick != 0){
		weightScore_thresholdBingClick_constraint = weightScore_thresholdBingClick_constraint / sum_thresholdBingClick;
	}
    if(sum_onlineMemoryUrlFeature != 0){
		weightScore_fastBrain_constraint = weightScore_fastBrain_constraint / sum_onlineMemoryUrlFeature;
	}
    //Generate constrain top threshold
    var threshold_top_constraint = 0;
    for (i = 0; i < 3; i++){
        var weight_pos = 1;
        if (i == 0) {
            weight_pos = 3;
        }
        threshold_top_constraint += weight_pos * drConstraintScoreArray[i];
    }
    threshold_top_constraint = threshold_top_constraint / 5.0;
    //Generate final threshold entity/intent/constraint

    var threshold_final_constraint = GenerateNumNoZero(threshold_top_constraint, weightScore_thresholdBingClick_constraint, weightScore_fastBrain_constraint);
    var normalize_cons_threshold = NormalizeConstraintThreshold(threshold_final_constraint);
    return normalize_cons_threshold;
}
function NormalizeIntentThreshold(score){
    var score_normalize = 0;
    if (score >= 3500){
        score_normalize = 4000;
    }
    else if(score >= 2500){
        score_normalize = 3000;
    }
    else if(score >= 1500) {
        score_normalize = 2000;
    }
    else if(score >= 500) {
        score_normalize = 1000;
    }
    else {
        score_normalize = 0;
    }
    return score_normalize;
}

function NormalizeEntityThreshold(score){
    var score_normalize = 0;
    if (score >= 875){
        score_normalize = 1000;
    }
    else if(score >= 625){
        score_normalize = 750;
    }
    else if(score >= 375) {
        score_normalize = 500;
    }
    else if(score >= 125) {
        score_normalize = 250;
    }
    else {
        score_normalize = 0;
    }
    return score_normalize;
}


function GenerateThresholdScore(subIntentId, subIntentScore, MSSFDecodeResult, matchDataArray, intentMatchCondition, constraintMatchCondition, documentsLocal, top20doc, keyFeaturesOfDocuments) {
    var i, curDoc, featureVector, matchData, url;
    var entityMatchScoreArray = new Array(0, 0);//score of top3 doc
    var entityMatchScoreThreshold = 0;
    var entityMatchingScorePosTop1 = 0;
    var isTrigger = true;
    var drEntityScoreArray = new Array(20);
    var drIntentScoreArray = new Array(20);

    var weightScore_thresholdBingClick_entity = 0; //Threshold_BingClick
    var weightScore_thresholdBingClick_intent = 0;
    var sum_thresholdBingClick = 0;
    var weightScore_fastBrain_entity = 0; //threshold fast brain
    var weightScore_fastBrain_intent = 0;
    var sum_onlineMemoryUrlFeature = 0; 
    for (i = 0; i < top20doc; ++i) {
        curDoc = documentsLocal[i];
        featureVector = curDoc.rerankfeatures;
        matchData = matchDataArray[i];
        url = matchData.url;
        var numberOfPerfectMatch_BingClick_i = featureVector[c_FeatureId_PerfectMatch]; //curDoc.NumberOfPerfectMatch_BingClick;// Check how to get the feature from L2;
        var onlineMemoryUrlFeature_i = featureVector[c_FeatureId_RankomaticScore]; //curDoc.OnlineMemoryUrlFeature_0; // check weather the method to get L2 feature ONline is right?
		if(isNaN(onlineMemoryUrlFeature_i)){
			onlineMemoryUrlFeature_i = 0.0;
		}
		if(isNaN(numberOfPerfectMatch_BingClick_i)) {
			numberOfPerfectMatch_BingClick_i = 0.0;
		}
        //Generate entity/intent/cons match score
        var entityMatchScore = keyFeaturesOfDocuments[i].entityMatchScore;
        var intentMatchScore = keyFeaturesOfDocuments[i].intentMatchScore;
        //Generate Threshold_BingClick
        weightScore_thresholdBingClick_entity += entityMatchScore * numberOfPerfectMatch_BingClick_i;

        weightScore_thresholdBingClick_intent += intentMatchScore * numberOfPerfectMatch_BingClick_i;
        sum_thresholdBingClick += numberOfPerfectMatch_BingClick_i;

        //Generate Threshold_FastBrain
        weightScore_fastBrain_entity += entityMatchScore * onlineMemoryUrlFeature_i;
        weightScore_fastBrain_intent += intentMatchScore * onlineMemoryUrlFeature_i;
        sum_onlineMemoryUrlFeature += onlineMemoryUrlFeature_i;

        drEntityScoreArray[i] = entityMatchScore;
        drIntentScoreArray[i] = intentMatchScore;
    }
    // Generate entity/intent/constrain threshold of FastBrain/BingClick 
    
	if(sum_thresholdBingClick != 0) {
		weightScore_thresholdBingClick_entity = weightScore_thresholdBingClick_entity / sum_thresholdBingClick;
		weightScore_thresholdBingClick_intent = weightScore_thresholdBingClick_intent / sum_thresholdBingClick;
	}
	else {
		weightScore_thresholdBingClick_entity = 0.0;
		weightScore_thresholdBingClick_intent = 0.0;
	}
	if(sum_onlineMemoryUrlFeature != 0){
		weightScore_fastBrain_entity = weightScore_fastBrain_entity / sum_onlineMemoryUrlFeature; 
		weightScore_fastBrain_intent = weightScore_fastBrain_intent / sum_onlineMemoryUrlFeature;
	}
	else {
		weightScore_fastBrain_entity = 0.0;
		weightScore_fastBrain_intent = 0.0;
	}
   
    //Generate entity/intent/constrain top threshold
    var threshold_top_entity = 0;
    var threshold_top_intent = 0;
    for (i = 0; i < 3; i++){
        var weight_pos = 1;
        if (i == 0) {
            weight_pos = 3;
        }
        threshold_top_entity += weight_pos * drEntityScoreArray[i];
        threshold_top_intent += weight_pos * drIntentScoreArray[i];
    }
    threshold_top_entity = threshold_top_entity / 5.0;
    threshold_top_intent = threshold_top_intent / 5.0;
    //Generate final threshold of entity/intent/constraint
    var threshold_final_entity = GenerateNumNoZero(threshold_top_entity, weightScore_thresholdBingClick_entity, weightScore_fastBrain_entity);
    var threshold_final_intent = GenerateNumNoZero(threshold_top_intent, weightScore_thresholdBingClick_intent, weightScore_fastBrain_intent);
	
    var threshold_final = new Array(2);
    threshold_final[0] = NormalizeEntityThreshold(threshold_final_entity);
    //threshold_final[1] = threshold_final_intent;
    threshold_final[1] = NormalizeIntentThreshold(threshold_top_intent);
    return threshold_final;
}

//------------------------------------------------ Generate Threshold Score Feature - End @Frank-----------------------------------------------

//------------------------------------------------ Generate DRScoreRank Feature -BEGIN --------------------------------------------------@Frank
function GenerateDRScoreRank(curDRScore, l3Threshold, l2Threshold, l1Threshold) {
    if(curDRScore >= l1Threshold) {
        return 4;
    }
    else if(curDRScore >= l2Threshold){
        return 3;
    }
    else if(curDRScore >= l3Threshold) {
        return 2;
    }
    else if(curDRScore > 0){
        return 1;
    }
    return 0;
}

function RankerCondition1(top20doc,keyFeaturesOfDocuments, entityMatchThreshold, intentMatchThreshold, top1EntityMatch,drScoreTop1EntityMatch, top1IntentMatch, drScoreTop1IntentMatch, constraintMatchCondition, MSSFDecodeResult, matchDataArray, rerankFeatures){

    if(!((entityMatchThreshold > 250) && (top1EntityMatch >= entityMatchThreshold) && (drScoreTop1EntityMatch >= entityMatchThreshold) && (top1IntentMatch >= intentMatchThreshold) && (drScoreTop1IntentMatch >= intentMatchThreshold))) {
        return false;
    }
    var top5EntityIntentASCount = 0;
    var top8EntityIntentASCount = 0;
    var top5IntentMatchSum = 0;
    for (i = 0; i < Math.min(top20doc, 8); ++i) {
        var curEntityScore = keyFeaturesOfDocuments[i].entityMatchScore;
        var curIntentScore = keyFeaturesOfDocuments[i].intentMatchScore;
        var curAuthorityScore = keyFeaturesOfDocuments[i].authorityScore;
        if ((i < 5) && (curEntityScore >= entityMatchThreshold) && (curIntentScore >= intentMatchThreshold) && (curAuthorityScore > 0)) {
            top5EntityIntentASCount++;
            top8EntityIntentASCount++;
            top5IntentMatchSum += curIntentScore;
        }
        if ((i >= 5 && i < 8) && (curEntityScore >= entityMatchThreshold) && (curIntentScore >= intentMatchThreshold) && (curAuthorityScore > 0)) {
            top8EntityIntentASCount++;
        }
    }
    if(!(top5EntityIntentASCount >= 2 || top8EntityIntentASCount >= 4)) {
        return false;
    }
    if(top5IntentMatchSum != 0) {
        return true;
    }

    var top5ConstraintMatchSum = 0, matchData, url, authorityScore, constraintMatchUrlScore, constraintMatchScore;
    for (i = 0; i < Math.min(top20doc, 5); ++i) {
        matchData = matchDataArray[i];
        url = matchData.url;
        authorityScore = keyFeaturesOfDocuments[i].authorityScore;
        constraintMatchUrlScore = 0; //PEConstraintScoreDecode(rerankFeatures[c_FeatureId_PEScoreConstraint], MSSFDecodeResult.urlKeyword, url, rerankFeatures[c_FeatureId_UrlDepth]);
		if (authorityScore > 0) {
			constraintMatchUrlScore = 1;
		}
        constraintMatchScore = GenerateConstraintMatchingScore(constraintMatchCondition, MSSFDecodeResult.constraint, matchData, authorityScore, constraintMatchUrlScore, i);
        keyFeaturesOfDocuments[i].constraintMatchScore = constraintMatchScore;
        top5ConstraintMatchSum += constraintMatchScore;
    }
    if(top5ConstraintMatchSum != 0){
        return true;
    }
    return false;
}

function SCORE(entityMatchScore, entityMatchThreshold, intentMatchScore, intentMatchThreshold, constraintMatchScore, constraintMatchThreshold, authorityScore){
    var score = authorityScore;
    if(constraintMatchScore >= constraintMatchThreshold){
        score = score + 1600;
    }
    else {
        score = score + 2* constraintMatchScore;
    }
    if(intentMatchScore >= intentMatchThreshold){
        score = score + 8000;
    }
    else {
        score = score + 2 * intentMatchThreshold;
    }
    if(entityMatchScore >= entityMatchThreshold){
        score = score + 10000000;
    }
    else{
        score = score + 10000 * entityMatchScore;
    }
    return score;
}

function RankerCondition2(drScoreThreshold, documentPosition, curKeyFeatures, curRerankFeatures, top20doc, hostId, documentsLocal,keyFeaturesOfDocuments, entityMatchThreshold, intentMatchThreshold, constraintMatchThreshold, url){
    var drScore = documents[documentPosition].l2score;
    if(!((drScore > drScoreThreshold) && (documentPosition < 16))){
        return false;
    }
    if((curKeyFeatures.isSiteConsMatchDomain == 1000) || (curRerankFeatures[c_FeatureId_PEScoreDiversity] == 1)){
        return true;
    }
    if (curKeyFeatures.lowQualitySiteScore != 0){
        return false;
    }

    var rankVec = [];
    for (var i = 0; i < top20doc; ++i) {
        var curHostId = documents[i].rerankfeatures[28];//documentsLocal[i].hostid;
		rankVec.push({index:i, signal: (0.95 - i / 20.0)});
        if(hostId == curHostId){      
            var curEntityScore = keyFeaturesOfDocuments[i].entityMatchScore;
            var curIntentScore = keyFeaturesOfDocuments[i].intentMatchScore;
            var curConstraintScore = keyFeaturesOfDocuments[i].constraintMatchScore;
            var curAuthorityScore = keyFeaturesOfDocuments[i].authorityScore;
            if((curEntityScore > 0) && (curIntentScore >= 0) && (curConstraintScore != 1)){
                rankVec[i].signal = SCORE(curEntityScore, entityMatchThreshold, curIntentScore, intentMatchThreshold, curConstraintScore, constraintMatchThreshold, curAuthorityScore)+ (0.95 - i / 20.0);
            }
            else {
                rankVec[i].signal = 100 + (0.95 - i / 20.0);
            }
        }
    }
    rankVec.sort(SortDescending);
    var rankPos = 0;
	if (rankVec.length >= 1){
		rankPos = rankVec[0].index;
	}
	if (rankPos == documentPosition){
		return true;
	}
    return false;
}


function MainRanker(subIntentId, subIntentScore, MSSFDecodeResult, matchDataArray, intentMatchCondition, constraintMatchCondition, documentsLocal, documentCount, queryTermDict, canonicalQuery) {
    //---------------   step1 DRScoreRank Begin ----------------------------
    var docCount = documentCount;
    var top20doc = Math.min(docCount, 20);
    var maxDRScoreTop20 = 0;
    var minDRScoreTop20 = Number.MAX_SAFE_INTEGER;
    var l3Threshold = 0;
    var l2Threshold = 0; 
    var l1Threshold = 0; 
    var rankScoreVector = [];
    var maxDRScore = 0, curDRScore;
    for (var i = 0; i < top20doc; ++i) {
        curDoc = documentsLocal[i];
        curDRScore = curDoc.l2score;
        rankScoreVector.push({ oriIndex : i, drScoreRank: 0.0, drScore : curDRScore, newL3Score2: 1000 - i});
        if (curDRScore > maxDRScoreTop20) {
            maxDRScoreTop20 = curDRScore;
        }
        if (curDRScore < minDRScoreTop20) {
            minDRScoreTop20 = curDRScore;
        }
        if (i < Math.min(10, top20doc) && curDRScore > maxDRScore) {
            maxDRScore = curDRScore;
        }
    }
    var tmpThreshold = (maxDRScoreTop20 - minDRScoreTop20)/4;
    l3Threshold = tmpThreshold + minDRScoreTop20;
    l2Threshold = tmpThreshold * 2 + minDRScoreTop20;
    l1Threshold = tmpThreshold * 3 + minDRScoreTop20;

    for (var i = 0; i < top20doc; i++){
		var curDRScore = documentsLocal[i].l2score;
        rankScoreVector[i].drScoreRank = GenerateDRScoreRank(curDRScore, l3Threshold, l2Threshold, l1Threshold);
    }

    //---------------   step1 DRScoreRank End ----------------------------
    //------------------------------ Step2 NewL3Score ranker Begin ------------------------------------
    //-----1. Initial Begin -----
    var drScoreThreshold = 0;
    var maxDRScorePosTemp = 100;

    rankScoreVector.sort(SortNumberDRScoreDesc);
    var thresholdPos = Math.min(15, top20doc);
    var oriPos = rankScoreVector[thresholdPos].oriIndex;
	drScoreThreshold = rankScoreVector[thresholdPos].drScore;
    var maxDRScorePos = 0;
    var top1EntityMatch = 0;
    var top1IntentMatch = 0;
    var drScoreTop1EntityMatch = 0;
    var drScoreTop1IntentMatch = 0;
    var matchData, featureVector, url;
    var keyFeaturesOfDocuments = [];
    var sumIntentMatchTop5 = 0;
    var topSiteScoreResult, specificSiteScore, isSiteConsMatchDomain;
    var authorityIsSiteConsMatchScore = new Array(2);

    for (var i = 0; i < top20doc; ++i) {
        curDoc = documentsLocal[i];
		matchData = matchDataArray[i];
        featureVector = curDoc.rerankfeatures;
        url = matchData.url;
        if (i == 0){
            var entityMatchScore = GenerateEntityMatchingScore(MSSFDecodeResult.entity, matchData);//feature:entity, matchData Contain the feature "NumberOfOccurrences_MultiInstanceTitle_0, ... , NumberOfOccurrences_MultiInstanceTitle_7"
            topSiteScoreResult = PETopSiteScoreDecode(featureVector[c_FeatureId_PEScoreTopSite], MSSFDecodeResult.urlKeyword, url, featureVector[c_FeatureId_UrlDepth]);
			var curHostId = featureVector[28];
			var curDomainId = featureVector[29];
            authorityIsSiteConsMatchScore = GenerateAuthorityScore(topSiteScoreResult.authorityScore, MSSFDecodeResult.entity, MSSFDecodeResult.siteConstraint, url, curHostId, curDomainId, MSSFDecodeResult.officialSite, i);
            isSiteConsMatchDomain = authorityIsSiteConsMatchScore[1];
            var authorityScore = authorityIsSiteConsMatchScore[0];
LogDebug("authorityScore", url, authorityScore, '\r\n');
		   //var authorityScore = featureVector[30];
            specificSiteScore = topSiteScoreResult.isSpecific;
            //var intentMatchScore = GenerateIntentMatchingScore(intentMatchCondition, MSSFDecodeResult.intent, matchData, topSiteScoreResult.isIntent);
            var intentMatchScore = GenerateIntentMatchingScore(MSSFDecodeResult.otherIntents, MSSFDecodeResult.majorIntent, matchData, queryTermDict);//generate intent feature score
LogDebug("intentMatchScore", url, intentMatchScore, '\r\n');
			keyFeaturesOfDocuments.push(new KeyFeatures(entityMatchScore, intentMatchScore, authorityScore, specificSiteScore, 0, 0, topSiteScoreResult, rankScoreVector[i].drScoreRank, 0, isSiteConsMatchDomain));//add intentMatchScore && constraintMatchScore
            top1EntityMatch = entityMatchScore;
            top1IntentMatch = intentMatchScore;
            sumIntentMatchTop5 += intentMatchScore;
        }
        curDRScore = curDoc.l2score;
        if(i < Math.min(10, top20doc) && curDRScore == maxDRScore) {
            if (maxDRScorePosTemp > i) {
                maxDRScorePosTemp = i;
            }
        }
        if (i > 0)
        {
            var entityMatchScore = GenerateEntityMatchingScore(MSSFDecodeResult.entity, matchData);//feature:entity, matchData Contain the feature "NumberOfOccurrences_MultiInstanceTitle_0, ... , NumberOfOccurrences_MultiInstanceTitle_7"
            topSiteScoreResult = PETopSiteScoreDecode(featureVector[c_FeatureId_PEScoreTopSite], MSSFDecodeResult.urlKeyword, url, featureVector[c_FeatureId_UrlDepth]);
            //authorityScore = GenerateAuthorityScore(topSiteScoreResult.authorityScore, MSSFDecodeResult.entity, MSSFDecodeResult.siteConstraint, url, curDoc.hostid, curDoc.domainid, MSSFDecodeResult.officialSite, i);
            var curHostId = featureVector[28];
			var curDomainId = featureVector[29];
			authorityIsSiteConsMatchScore = GenerateAuthorityScore(topSiteScoreResult.authorityScore, MSSFDecodeResult.entity, MSSFDecodeResult.siteConstraint, url, curHostId, curDomainId, MSSFDecodeResult.officialSite, i);
            isSiteConsMatchDomain = authorityIsSiteConsMatchScore[1];
            var authorityScore = authorityIsSiteConsMatchScore[0];
LogDebug("authorityScore", url, authorityScore, '\r\n');
			//var authorityScore = featureVector[30];
            specificSiteScore = topSiteScoreResult.isSpecific;
            //var intentMatchScore = GenerateIntentMatchingScore(intentMatchCondition, MSSFDecodeResult.intent, matchData, topSiteScoreResult.isIntent);//@Frank generate intent feature score
			var intentMatchScore = GenerateIntentMatchingScore(MSSFDecodeResult.otherIntents, MSSFDecodeResult.majorIntent, matchData, queryTermDict);//@Frank generate intent feature score
LogDebug("intentMatchScore", url, intentMatchScore, '\r\n');
			keyFeaturesOfDocuments.push(new KeyFeatures(entityMatchScore, intentMatchScore, authorityScore, specificSiteScore, 0, 0, topSiteScoreResult, rankScoreVector[i].drScoreRank, 0, isSiteConsMatchDomain));//@Frank add intentMatchScore && constraintMatchScore
			// KeyFeatures(entityMatchScore, intentMatchScore, authorityScore, specificSiteScore, guardingScore, lowQualitySiteScore, topSiteScoreResult, drScoreRank, constraintMatchScore, isSiteConsMatchDomain)
            sumIntentMatchTop5 += intentMatchScore;
        }
    }
    if (maxDRScorePosTemp == 100){
        maxDRScorePos = 0;
    }
    else {
        maxDRScorePos = maxDRScorePosTemp;
    }
    matchData = matchDataArray[maxDRScorePos];
    drScoreTop1IntentMatch = keyFeaturesOfDocuments[maxDRScorePos].intentMatchScore;
    drScoreTop1EntityMatch = keyFeaturesOfDocuments[maxDRScorePos].entityMatchScore;

    var thresholdArr = new Array(2); //--Check weather array[2] as return. 
    thresholdArr = GenerateThresholdScore(subIntentId, subIntentScore, MSSFDecodeResult, matchDataArray, intentMatchCondition, constraintMatchCondition, documentsLocal, documentCount, keyFeaturesOfDocuments); // need to turn later in-order to run faster
    var entityMatchThreshold = thresholdArr[0];//--Generate through function: GenerateThresholdScore ----
    var intentMatchThreshold = thresholdArr[1];//--Generate through function: GenerateThresholdScore -----
    //-----1. Initial End -----
    //-----2. NewL3Score Generate Begin ------
    var rankVector = [];
    var rankVectorInOriPlace = [];
    var guardVector = [];
    var documentPosition;
    for (var i = 0; i < top20doc; i++) {
        documentPosition = i;
        if (IsGuard(keyFeaturesOfDocuments[i], documentsLocal[i].rerankfeatures, i, entityMatchThreshold, maxDRScorePos, keyFeaturesOfDocuments[i].isSiteConsMatchDomain, sumIntentMatchTop5)) {
LogDebug("IsGuardSatisfiyed", documents[i].url, '\r\n');			
            rankVector.push({ index: i, signal: (0.95 - i / 20.0) });
            rankVectorInOriPlace.push({ index: i });
        }
        else {
            documents[i].score = 1000.0 - i + (0.95 - i / 20.0);
            guardVector.push({ index: i, signal: (0.95 - i / 20.0) });
        }
    }

    var rankDocLength = rankVector.length; //*************************rankVector store the document that need to be rerank **********************
    var constrainMatchFinish = false;
	var constrainMatchThresholdFinish = false;
	var top5ConstraintMatchSum = 0.0;
	var constraintMatchThreshold = 0.0;
	for (var i = 0; i < rankDocLength; ++i) {
        var curRerankFeatures = documentsLocal[rankVector[i].index].rerankfeatures;
        var curKeyFeatures = keyFeaturesOfDocuments[rankVector[i].index];
        documentPosition = rankVector[i].index;
        //var currentHostId = documentsLocal[rankVector[i].index].hostid;
		var currentHostId = curRerankFeatures[28];
		var url = documents[documentPosition].url;
        if(RankerCondition1(top20doc, keyFeaturesOfDocuments, entityMatchThreshold, intentMatchThreshold, top1EntityMatch, drScoreTop1EntityMatch, top1IntentMatch, drScoreTop1IntentMatch, constraintMatchCondition, MSSFDecodeResult, matchDataArray, curRerankFeatures)){
LogDebug("RankerCondition1Satisfied", url, '\r\n');
			if(!constrainMatchFinish) {
				MSSFDecodeResult = PostWebSlotTagging(MSSFDecodeResult, canonicalQuery, matchDataArray);
				top5ConstraintMatchSum = GenerateTop20DocConstraintMatchingScore(top20doc, matchDataArray, keyFeaturesOfDocuments, MSSFDecodeResult, documentsLocal, constraintMatchCondition);
				constrainMatchFinish = true;
			}
			if(!constrainMatchThresholdFinish){
				constraintMatchThreshold = GenerateConstrainThresholdScore(matchDataArray, documentsLocal, top20doc, keyFeaturesOfDocuments);
				constrainMatchThresholdFinish = true;
				if(IsNull(constraintMatchThreshold)) {
					constraintMatchThreshold = 0.0;
				}
			}
            if(RankerCondition2(drScoreThreshold, documentPosition, curKeyFeatures, curRerankFeatures, top20doc, currentHostId, documentsLocal, keyFeaturesOfDocuments, entityMatchThreshold, intentMatchThreshold, constraintMatchThreshold, url)){
LogDebug("RankerCondition2Satisfied", url, '\r\n');
                var curEntityMatchScore = curKeyFeatures.entityMatchScore;
                var curIntentMatchScore = curKeyFeatures.intentMatchScore;
                var curConstraintMatchScore = curKeyFeatures.constraintMatchScore;
                var curAuthorityScore = curKeyFeatures.authorityScore;
                if(curEntityMatchScore > 0 && curIntentMatchScore >= 0 && curConstraintMatchScore != 1) {
                    rankVector[i].signal = SCORE(curEntityMatchScore, entityMatchThreshold, curIntentMatchScore, intentMatchThreshold, curConstraintMatchScore, constraintMatchThreshold, curAuthorityScore) + (0.95 - i / 20.0);
                }
                else {
                    rankVector[i].signal = 100 + (0.95 - i / 20.0);
                }
            }
            else {
                rankVector[i].signal = 100 + (0.95 - i / 20.0);
            }
        }
        else {
            rankVector[i].signal = 1000.0 - i + (0.95 - i / 20.0);
        }
    }
    rankVector.sort(SortDescending);

    //------------------------------ Step2 NewL3Score ranker End ------------------------------------

    //----------------------------- Step3 Adjust L3 ranker Begin  ------------------------------------
	var adjustRankerVector = [];
	for(i = 0; i < top20doc; i++) {
		adjustRankerVector.push({index:i, signal:1000.0 - i + (0.95 - i / 20.0)});
	}
    //rankScoreVector.sort(SortDescendingByNewL3Score);
	//----asign newL3Score-----
	for(i = 0; i < rankVector.length; i++){
		adjustRankerVector[rankVector[i].index].signal = 1000.0 - rankVectorInOriPlace[i].index + (0.95 - i / 20.0);
	}
	adjustRankerVector.sort(SortDescending);
	var posby0 = 0;
	for(i = 0; i < adjustRankerVector.length; i++){
		if (adjustRankerVector[i].index == 0){
			posby0 = i;
			break;
		}
	}
    if(posby0 >= 8 || adjustCondition1(adjustRankerVector, documentsLocal)){
        for(var j = 0; j < top20doc; ++j){
			adjustRankerVector[j].index = j;
            adjustRankerVector[j].signal = 1000.0 - j + (0.95 - j / 20.0);
        }
    }

	adjustRankerVector.sort(SortDescending);
	
    //----------------------------- Step3 Adjust L3 ranker End ------------------------------------
    //----------------------------- Step4 Sorted document based on AuthorityScore and NewL3Score2 Begin ------------------------------
    //a. document rank position based on authorityScore 
    var rankByAuthoScore = [];
    for (i = 0; i < top20doc; ++i){
        var curAuthorityScore = keyFeaturesOfDocuments[i].authorityScore;
        rankByAuthoScore.push({index:i, signal:curAuthorityScore});
    }
    rankByAuthoScore.sort(SortDescending);
    //b. document rank position based on NewL3Score2  adjustRankerVector.sort(SortDescending) finished before
    //----------------------------- Step4 Sorted document based on AuthorityScore and NewL3Score2 End ------------------------------

    //---------------------------- Step5 sorted final feature change Begin -------------------
    var equalCount = 0;
    for (i = 0; i < Math.min(5, top20doc); ++i){
        if(adjustRankerVector[i].index == rankByAuthoScore[i].index){
            equalCount++;
        }
    }
	if(equalCount == 5){
        for(var j = 0; j < top20doc; ++j){
			adjustRankerVector[j].index = j;
            adjustRankerVector[j].signal = 1000.0 - j + (0.95 - j / 20.0);
        }
		adjustRankerVector.sort(SortDescending);
    }

    for (i = 0; i < adjustRankerVector.length; ++i){
        documents[adjustRankerVector[i].index].score = parseInt(adjustRankerVector[i].signal);
    }
    //---------------------------- Step5 sorted final feature change End -------------------
}

function GenerateTop20DocConstraintMatchingScore(top20doc, matchDataArray, keyFeaturesOfDocuments, MSSFDecodeResult, documentsLocal, constraintMatchCondition){
	var top5ConstraintMatchSum = 0.0;
	for (var i = 0; i < top20doc; i++) {
		var matchData = matchDataArray[i];
		var url = matchData.url;
		var rerankFeatures = documentsLocal[i].rerankfeatures;
		var authorityScore = keyFeaturesOfDocuments[i].authorityScore;
		var constraintMatchUrlScore = 0;//PEConstraintScoreDecode(rerankFeatures[c_FeatureId_PEScoreConstraint], MSSFDecodeResult.urlKeyword, url, rerankFeatures[c_FeatureId_UrlDepth]);
		if (authorityScore > 0){
			constraintMatchUrlScore = 1;
		}
		var constraintMatchScore = GenerateConstraintMatchingScore(constraintMatchCondition, MSSFDecodeResult.constraint, matchData, authorityScore, constraintMatchUrlScore, i);
		keyFeaturesOfDocuments[i].constraintMatchScore = constraintMatchScore;
		if(i < 5){
			top5ConstraintMatchSum += constraintMatchScore;
		}
LogDebug("constraintMatchScore", url, constraintMatchScore, '\r\n');
	}
	return top5ConstraintMatchSum;
}

function adjustCondition1(rankScoreVectorCur, documentsLocal){
    var oriPos0 = rankScoreVectorCur[0].index;
    var oriPos1 = rankScoreVectorCur[1].index;
    var oriPos2 = rankScoreVectorCur[2].index;
    var newSum = documentsLocal[oriPos0].rerankfeatures[c_FeatureId_RankomaticScore] + documentsLocal[oriPos1].rerankfeatures[c_FeatureId_RankomaticScore]+ documentsLocal[oriPos2].rerankfeatures[c_FeatureId_RankomaticScore];
    var oriSum = documentsLocal[0].rerankfeatures[c_FeatureId_RankomaticScore]+ documentsLocal[1].rerankfeatures[c_FeatureId_RankomaticScore] + documentsLocal[2].rerankfeatures[c_FeatureId_RankomaticScore];
    if(newSum > oriSum){
        return true;
    }
    else
        return false;
}
//------------------------------------------------ Main Ranker - Begin ------------------------------------------------
//---------------- Guarding Condition Begin ------------------------
function IsGuard(keyFeatures, rerankFeatures, documentPosition, entityMatchScoreThreshold, maxDRScorePos, isSiteConsMatchDomain, sumIntentMatchTop5) {
    // if (rerankFeatures[c_FeatureId_RankomaticScore] >= 5) {
    // return true;
    // }
    // if (documentPosition == 0 && markers[c_MarkerId_NumberOfPerfectMatches_BingClick] > 0) {
    // return true;
    // }
    var con1 = false;
    if(documentPosition != maxDRScorePos) { 
        con1 = true;
    }
    else {
        return false;
    }

    var con2 = false;

    if(documentPosition < 5 && keyFeatures.entityMatchScore >= entityMatchScoreThreshold && keyFeatures.intentMatchScore == 0 && keyFeatures.constraintMatchScore != c_constraintMatchScoreOpposed && keyFeatures.lowQualitySiteScore != 1 && (keyFeatures.guardingScore == 1000 || isSiteConsMatchDomain == 1000)){
        con2 = true;
    }
    var con3 = false;
    if(keyFeatures.guardingScore != 1000 && !(sumIntentMatchTop5 > 0 && con2)){
        con3 = true;
    }
    else {
        return false;
    }
    return con3;
}
//---------------- Guarding Condition End ------------------------

function IsTriggerForKnownQuery(entityMatchCountInTop20) {
    return entityMatchCountInTop20 >= 5;
}

function IsTriggerForUnKnownQuery(keyFeaturesOfDocuments, specificSiteCountInTop5, entityMatchScoreThreshold) {
    if (specificSiteCountInTop5 === 0) {
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

function SortDescending(a, b) {
    return b.signal - a.signal;
}

function SortDescendingByNewL3Score(a, b){
    return b.newL3Score2 - a.newL3Score2;
}

function NormalizeRankScore(score, index) { //***why define this NormalizeRankScore function ***********
    return score * 100 + (100 - index);
}

function KeyFeatures(entityMatchScore, intentMatchScore, authorityScore, specificSiteScore, guardingScore, lowQualitySiteScore, topSiteScoreResult, drScoreRank, constraintMatchScore, isSiteConsMatchDomain) {
    this.entityMatchScore = entityMatchScore;
    this.intentMatchScore = intentMatchScore;
    this.authorityScore = authorityScore;
    this.specificSiteScore = specificSiteScore;
    this.guardingScore = guardingScore;
    this.lowQualitySiteScore = lowQualitySiteScore;
    this.contentQualityScore = 1000;
    this.topSiteScoreResult = topSiteScoreResult;
    this.drScoreRank = drScoreRank;
    this.constraintMatchScore = constraintMatchScore;
    this.isSiteConsMatchDomain = isSiteConsMatchDomain;
}

function MatchData(title, url, snippet, wordFoundTitleArray, wordFoundBodyArray) {
    this.title = title;
    this.url = url;
    this.snippet = snippet;
    this.wordFoundTitleArray = wordFoundTitleArray;
    this.wordFoundBodyArray = wordFoundBodyArray;
}

function IntentClass(type, span){
	this.type = type;
	this.span = span;
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
    if (IsNull(phrase) || phrase == "" || IsNull(stream))
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
    var matchArray = new Array(10);
    for (var i = 0; i < 10; i++) {
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
function SortNumberDRScoreDesc(a, b) {
    return b.drScore - a.drScore;
}
function SortByItemStringLength(a, b){
	return b.term.length - a.term.length;
}
//------------------------------------------------ Utilities - End ------------------------------------------------