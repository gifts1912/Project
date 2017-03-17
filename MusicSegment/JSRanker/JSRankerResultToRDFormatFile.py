import pandas as pd
import numpy as np
import os
import sys

def legal(urlScoreList):
    if len(urlScoreList) < 10:
        return False
    if urlScoreList[10][1] == 990 :
        return True
    else :
        return False


def GenChangeQuery(dataIn, tag = 'Score'):
    pass
    """
    dataChange = dataIn[dataIn[tag] + dataIn['DocumentPosition'] != 1000]
    queryList = list(dataChange['m:Query'].values)
    querySet = set(queryList)
    print("queryTriggered number: ", len(querySet))
    with open("C:/Code/data/triggerQueryList.tsv", 'w', encoding='utf-8') as fw:
        for query in querySet:
            fw.write(query + '\n')
    return queryList
    """

def GeRDFormatFileV2(ranker_outfile, rdformat_infile):
    dataIn = pd.read_csv(ranker_outfile, sep ='\t', header = 0)
    columns = ['m:Url', 'DocumentPosition', 'Score', 'm:Query']
    dataIn = dataIn[columns]
    posChangeQueryList = GenChangeQuery(dataIn)
    dataIn['m:Url'] = dataIn['m:Url'].apply(lambda url : str(url).lower().rstrip('/'))
    dataIn['m:Query'] = dataIn['m:Query'].apply(lambda query: str(query).lower().strip())
    dataIn['newScore'] = dataIn['Score'].apply(lambda score : 1000 - score)
    dataIn = dataIn.sort_values(by=['m:Query', 'newScore'], ascending=[True, True])
    dataIn[['m:Query', 'm:Url', 'newScore']].to_csv(rdformat_infile, sep = '\t', header= None, index = False)
    del dataIn

def GeRDFormatFile(ranker_outfile, rdformat_infile):
    dataIn = pd.read_csv(ranker_outfile, sep ='\t', header = 0)
    columns = ['m:Url', 'DocumentPosition', 'Score', 'm:Query']
    dataIn = dataIn[columns]
    posChangeQueryList = GenChangeQuery(dataIn)
    queryUrlSortBaseScore = dict()
    queryUrlListSort = dict()
    for row in dataIn.values:
        query = str(row[3]).lower().strip()
        """
        if query not in posChangeQueryList:
            continue
        """
        if query not in queryUrlSortBaseScore:
            queryUrlSortBaseScore[query] = {}
        url = str(row[0]).lower().rstrip('/')
        score = int(row[2])
        queryUrlSortBaseScore[query][url] = score
        for query, urlList in queryUrlSortBaseScore.items():
            urlListSort = sorted(urlList.items(), key=lambda x: x[1], reverse=True)
            queryUrlListSort[query] = [item for item in urlListSort]

    ilegalQuerySet = set()
    with open(rdformat_infile, 'w') as fw:
        for query, urlList in queryUrlListSort.items():
            for i in range(len(urlList)):
                if not legal(urlList):
                    ilegalQuerySet.add(query)
                    continue
                url = urlList[i][0]
                score = urlList[i][1]
                fw.write("{0}\t{1}\t{2}\n".format(query, url, 1000 - score))
    print ("not legal query", '\t', len(ilegalQuerySet))

    fw = open("C:/Code/data/ilegal.tsv", 'w')
    for query in ilegalQuerySet:
        fw.write("{0}\n".format(query))
    fw.close()

def GeRDFormatFile_Off(ranker_outfile_off, rdFormat_infile_off):
    dataIn = pd.read_csv(ranker_outfile_off, sep='\t', header=0)
    columns = ['m:Url', 'DocumentPosition', 'AggregatedDerivedFeature0', 'm:Query']
    dataIn = dataIn[columns]
    posChangeQueryList = GenChangeQuery(dataIn, 'AggregatedDerivedFeature0')
    dataIn['m:Url'] = dataIn['m:Url'].apply(lambda url: str(url).lower().rstrip('/'))
    dataIn['m:Query'] = dataIn['m:Query'].apply(lambda query: str(query).lower().strip())
    dataIn['newScore'] = dataIn['AggregatedDerivedFeature0'].apply(lambda score: 1000 - score)
    dataIn = dataIn.sort_values(by=['m:Query', 'newScore'], ascending=[True, True])
    dataIn[['m:Query', 'm:Url', 'newScore']].to_csv(rdFormat_infile_off, sep='\t', header=None, index=False)
    del dataIn

def  GeRDFormatFile_Log(fnLog, rdFormat_infile_log, tag = 'documentScore'):
    fw = open(rdFormat_infile_log, 'w', encoding='utf-8')
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




def main():

    ranker_outfile = "C:/Code/data/JSRankerOut.tsv"
    rdformat_infile = "C:/Code/data/JSRankerOutForRD.tsv"
    GeRDFormatFileV2(ranker_outfile, rdformat_infile)


    ranker_outfile_off = "C:/Code/data/offRankerOut.tsv"
    rdFormat_infile_off = "C:/Code/data/offRankerOutForRD.tsv"
    GeRDFormatFile_Off(ranker_outfile_off, rdFormat_infile_off)
    """
    ranker_log = "C:/Code/Module/JSRankerEvaluation/o2_b553d3a6-d331-42f1-a647-8f7eb365b7c7/JSL3RankerOut.tsv"
    rdFormat_infile_log = "C:/Code/data/JSL3RankerOutForRD.tsv"
    GeRDFormatFile_Log(ranker_log, rdFormat_infile_log, "l3RankerResult")
    """

if __name__ == "__main__":
    main()