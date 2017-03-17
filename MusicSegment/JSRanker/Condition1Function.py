import pandas as pd
import numpy as np
import os
import path


def similarityVariable():
    queryFeasOff = loadFeasOff()
    queryFeasJS = loadFeasJS()
    querySetRD2Dif = loadRD2DifQuerySet()
    all_num = 0
    com_num = 0
    for query, urlFeas in queryFeasJS.items():
        if query not in queryFeasOff:
            continue
        if query not in querySetRD2Dif:
            continue
        for url, feas in urlFeas.items():
            if url not in queryFeasOff[query]:
                continue
            all_num += 1
            if feas == queryFeasJS[query][url]:
                com_num += 1
    if all_num != 0:
        print(all_num, com_num, float(com_num)/all_num)
    else:
        print("all_num = 0")

def loadRD2DifQuerySet():
    querySet = set()
    fn = "C:/Code/data/diff2Query.tsv"
    with open(fn, 'r', encoding='utf-8') as fr:
        for query in fr:
            querySet.add(query.strip().lower())
    return querySet

def loadFeasJS():
    queryFeas = {}
    with open("C:/Code/Module/JSRankerEvaluation/o2_b553d3a6-d331-42f1-a647-8f7eb365b7c7/rankerCondition2.tsv", 'r', encoding='utf-8') as fr:
        fr.readline()
        for line in fr:
            arr = line.strip().split('\t', 2)
            if len(arr) == 2:
                continue
            query = arr[1].lower().strip()
            if query not in queryFeas:
                queryFeas[query] = {}
            log = arr[2].rstrip('\\n').strip()
            logUrlArr = log.split('\\n')
            for logEle in logUrlArr:
                logArr = logEle.strip().split('\t')
                url = logArr[0].lower().strip().rstrip('/')
                isGuard = logArr[2]
                if isGuard == "0":
                    isGuard = 0
                elif isGuard == "1":
                    isGuard = 1
                queryFeas[query][url] = isGuard
    return queryFeas

def loadFeasOff():
    fnPre = "C:/Code/data/offRankerCondition2.tsv"
    columns = ['m:Query', 'm:Url']
    queryFeas = {}
    with open(fnPre, 'r', encoding='utf-8') as fr:
        head = fr.readline()
        columns = head.rstrip().split('\t')
        queryPos = columns.index('m:Query')
        urlPos = columns.index('m:Url')
        feaPos = 0
        for line in fr:
            arr = line.split('\t')
            query = arr[queryPos].lower().strip()
            url = arr[urlPos].lower().strip().rstrip('/')
            fea = arr[feaPos]
            if query not in queryFeas:
                queryFeas[query] = {}
            queryFeas[query][url] = int(fea)
    return queryFeas


def main():
    similarityVariable()

if __name__ == "__main__":
    main()