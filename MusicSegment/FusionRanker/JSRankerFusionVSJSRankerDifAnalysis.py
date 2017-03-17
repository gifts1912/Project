import os
import sys

def RankerTriggerredQueryLoad(fn, querySet):
    with open(fn, 'r', encoding='utf-8') as fr:
        for query in fr:
            query = query.strip()
            querySet.add(query)

def LogLoad(fn_fusion, queryUrlFeatures, triggerredQuerySet):
    queryTriggerNum = 0
    with open(fn_fusion, 'r', encoding='utf-8') as fr:
        for line in fr:
            arr = line.strip().split('\t', 2)
            query = arr[1]
            if query not in triggerredQuerySet:
                continue
            queryTriggerNum += 1
            logInfo = arr[2]
            logArr = logInfo.split('\\n')
            if query not in queryUrlFeatures:
                queryUrlFeatures[query] = {}
            for log in logArr:
                if log.startswith("intentMatchScore"):
                    intentMatchScoreArr = log.split('\t')
                    url = intentMatchScoreArr[1]
                    score = int(intentMatchScoreArr[2])
                    if url not in queryUrlFeatures[query]:
                        queryUrlFeatures[query][url] = [score, 0]
                    else:
                        queryUrlFeatures[query][url][0] = score
                elif log.startswith("authorityScore"):
                    authoScoreArr = log.split('\t')
                    url = authoScoreArr[1]
                    score = int(authoScoreArr[2])
                    if url not in queryUrlFeatures[query]:
                        queryUrlFeatures[query][url] = [0, score]
                    else:
                        queryUrlFeatures[query][url][1] = score
    print(fn_fusion, queryTriggerNum)

def UrlLeavelFeatursSameNum(urlFeas_fusion, urlFeas_rank):
    sameAuthoScoreNum = 0
    sameIntentScoreNum = 0
    urlNum = 0
    for url, feas_fusion in urlFeas_fusion.items():
        if url not in urlFeas_rank:
            continue
        urlNum += 1
        feas_rank = urlFeas_rank[url]
        if feas_fusion[0] == feas_rank[0]:
            sameAuthoScoreNum += 1
        if feas_fusion[1] == feas_rank[1]:
            sameIntentScoreNum += 1

    return (sameAuthoScoreNum, sameIntentScoreNum, urlNum)


def QueryLevelFeaturesSameJudge(urlFeas_fusion, urlFeas_rank):
    authoScoreSameQuery = 1
    intentScoreSameQuery = 1
    for url, feas_fusion in urlFeas_fusion.items():
        if url not in urlFeas_rank:
            return (0, 0)
        feas_rank = urlFeas_rank[url]
        if authoScoreSameQuery == 1 and feas_fusion[0] != feas_rank[0]:
            authoScoreSameQuery = 0
        if intentScoreSameQuery == 1 and feas_fusion[1] != feas_fusion[1]:
            intentScoreSameQuery = 0
        if(authoScoreSameQuery == 0 and intentScoreSameQuery == 0):
            break

    return (authoScoreSameQuery, intentScoreSameQuery)


def DifAnalysis(queryUrlFeatures_fusion, queryUrlFeatures_ranker):
    comQueryNum = 0
    sameFea = [0] * 4
    urlNum = 0
    queryNum = 0
    for query_fun, urlFeasFun in queryUrlFeatures_fusion.items():
        if query_fun not in queryUrlFeatures_ranker:
            continue
        comQueryNum += 1
        urlFeas_rank = queryUrlFeatures_ranker[query_fun]
        (sameAuthoScoreNum, sameIntentScoreNum, urlNumCur) = UrlLeavelFeatursSameNum(urlFeasFun, urlFeas_rank)
        sameFea[0] += sameAuthoScoreNum
        sameFea[1] += sameIntentScoreNum
        urlNum += urlNumCur
        (isAuthoScoreSame, isIntentScoreSame) = QueryLevelFeaturesSameJudge(urlFeasFun, urlFeas_rank)
        if isAuthoScoreSame:
            sameFea[2] += 1
        if isIntentScoreSame:
            sameFea[3] += 1
        queryNum += 1

    print("UrlNum:{0}\tQueryNum:{1}\n".format(urlNum, queryNum))
    print("SameAuthorityScoreNum:{0}\tsameIntentScoreNum:{1}\tSameAuthorityScoreRatio:{2}\tSameIntentScoreRation:{3}\n".format(sameFea[0], sameFea[1], sameFea[0]/float(urlNum), sameFea[1]/float(urlNum)))
    print("SameAuthorityScoreQueryNum:{0}\tsameIntentScoreQueryNum:{1}\tSameAuthorityScoreQueryRatio:{2}\tSameIntentScoreQueryRation:{3}\n".format(sameFea[2], sameFea[3], sameFea[2]/float(queryNum), sameFea[3]/float(queryNum)))

    print("ComQueryNum:{0}".format(comQueryNum))


def main():
    fn_fusion = "C:/Code/data/logJSRankerFusion.tsv"
    fn_ranker = "C:/Code/data/logJSRanker.tsv"
    fn_triggerQuery ="C:/Code/data/triggeredQueryJSRanker.tsv"
    queryUrlFeatures_fusion = {}
    queryUrlFeatures_ranker = {}
    triggerredQuerySet = set()
    RankerTriggerredQueryLoad(fn_triggerQuery, triggerredQuerySet)
    LogLoad(fn_fusion, queryUrlFeatures_fusion, triggerredQuerySet)
    LogLoad(fn_ranker, queryUrlFeatures_ranker, triggerredQuerySet)
    DifAnalysis(queryUrlFeatures_fusion, queryUrlFeatures_ranker)

if __name__ == "__main__":
    main()