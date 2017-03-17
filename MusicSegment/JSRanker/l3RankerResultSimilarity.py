import os
import pandas as pd
import numpy as np


def L3LogFormat2RD(fnLog, tag = "documentScore"):
    fw = open("C:/Code/data/JSAdjustLogRankerOutForRD.tsv", 'w', encoding='utf-8')
    queryUrlPos = {}
    with open(fnLog, 'r',encoding='utf-8') as fr:
        for line in fr:
            arr = line.strip().split('\t', 2)
            query = arr[1].lower().strip()
            log = arr[2].strip('\\n').strip()
            if log == "":
                continue
            if query not in queryUrlPos:
                queryUrlPos[query] = {}
            logArr = log.split('\\n')
            for log in logArr:
                if log.find(tag) != -1:
                    urlScoreArr = log.strip().split('\t')
                    url = urlScoreArr[1].lower().rstrip('/')
                    score = 1000 - int(float(urlScoreArr[2]))
                    queryUrlPos[query][url] = score
    for query, urlScores in queryUrlPos.items():
        sortedUrlScores = sorted(urlScores.items(), key = lambda x : x[1])
        for urlScore in sortedUrlScores:
            url = urlScore[0]
            score = urlScore[1]
            fw.write("{0}\t{1}\t{2}\n".format(query, url, score))
    fw.close()



def JSLogCondition2(fn, queryUrlFea):
    fw = open("C:/Code/data/condition2FormatJSRanker.tsv", 'w', encoding='utf-8')
    with open(fn, 'r', encoding='utf-8') as fr:
        line = fr.readline()
        for line in fr:
            head = fr.readline()
            arr = line.split('\t', 2)
            query = arr[1].lower().strip()
            log = arr[2].strip()
            if log == "":
                continue
            logArr = log.strip('\\n').split('\\n')
            if query not in queryUrlFea:
                queryUrlFea[query] = {}
            for logEle in logArr:
                if logEle.find("RankerCondition2") != -1:
                    feasArr = logEle.strip().split('\t')
                    url = feasArr[2].lower().rstrip('/')
                    fea = feasArr[1]
                    queryUrlFea[query][url] = fea
                    fw.write("{0}\t{1}\t{2}\n".format(query, url, fea))
    fw.close()

def loadOffCondition2(fn, queryUrlSatisfyCondition2):
    with open(fn, 'r', encoding='utf-8') as fr:
        columns = fr.readline().split('\t')
        queryPos = columns.index('m:Query')
        urlPos = columns.index('m:Url')
        feaPos = 0
        for line in fr:
            arr = line.split('\t')
            query = arr[queryPos].lower().strip()
            url = arr[urlPos].lower().strip().rstrip('/')
            if query not in queryUrlSatisfyCondition2:
                queryUrlSatisfyCondition2[query] = {}
            queryUrlSatisfyCondition2[query][url] = arr[0]


def similarity(queryUrlFeaJS, queryUrlSatisfyCondition2):
    fw = open("C:/Code/data/rankerCondition2DiffQueryUrl.tsv", 'w', encoding='utf-8')
    all_query_num = 0
    com_query_num = 0
    all_num = 0
    com_num = 0
    for query, urlFeas in queryUrlSatisfyCondition2.items():
        if query not in queryUrlFeaJS:
            continue
        all_query_num += 1
        flag = False
        for url, fea in urlFeas.items():
            if url not in queryUrlFeaJS[query]:
                continue
            all_num += 1
            if fea == queryUrlFeaJS[query][url]:
                com_num += 1
            else:
                fw.write("{0}\t{1}\tJS:{2}\tOff:{3}\n".format(query, url, queryUrlFeaJS[query][url], fea))
                flag = True
        if not flag:
            com_query_num += 1

    if all_num != 0:
        print("url_level", all_num, com_num, float(com_num)/all_num)
        print("query_level", all_query_num, com_query_num, float(com_query_num)/all_query_num)
    else:
        print("all_num = 0")

    fw.close()

def L3OffFormat2RD(fn, tag):
    data = pd.read_csv(fn, sep = '\t', header = 0, encoding='utf-8', error_bad_lines=False)
    columns = ['m:Query', 'm:Url', 'AggregatedDerivedFeature0']
    values = data[columns]
    del data
    values['score'] = values['AggregatedDerivedFeature0'].map(lambda x : 1000 - x)
    values['m:Query'] = values['m:Query'].apply(lambda query : str(query).lower().strip())
    values['m:Url'] = values['m:Url'].apply(lambda url: str(url).lower().rstrip('/'))
    values[['m:Query', 'm:Url', 'score']].sort_values(['m:Query', 'score'], ascending = [True, True]).to_csv("C:/Code/data/offAdjustLogRankerOutForRD.tsv", sep = '\t', header = None, index = False)
    del values

def formatForRD():
    L3LogFormat2RD("C:/Code/Module/JSRankerEvaluation/o2_b553d3a6-d331-42f1-a647-8f7eb365b7c7/adjustOldL3ScoreSimilarity.tsv", 'adjustRankerVector')
    L3OffFormat2RD("C:/Code/data/offAdjustL3ScoreRankerOut.tsv", 'adjustRankerVector')

def main():
    """
    queryUrlFeaJS = {}
    JSLogCondition2("C:/Code/Module/JSRankerEvaluation/o2_25933d37-7d7e-4eab-ab1f-623f04a96a33/25933d37-7d7e-4eab-ab1f-623f04a96a33", queryUrlFeaJS)

    queryUrlSatisfyCondition2 = {}
    loadOffCondition2("C:/Code/data/offlineRankerCondition2.tsv", queryUrlSatisfyCondition2)

    similarity(queryUrlFeaJS, queryUrlSatisfyCondition2)
    """

    formatForRD()

if __name__== "__main__":
    main()