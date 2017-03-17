import pandas as pd
import numpy as np
import os
import path


def similarityVariable():
    queryFeasOff = loadFeasOff()
    queryFeasJS = loadFeasJS()
    query = "blue all rise album free mp3 download"
    print("OffWatch\t{0}".format(queryFeasOff[query]))
    print("JSWatch\t{0}".format(queryFeasJS[query]))
    query_num = 0
    feaVec_num = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    for query, feas in queryFeasJS.items():
        if query not in queryFeasOff:
            continue
        query_num += 1
        for i in range(9):
            if feas[i] == queryFeasOff[query][i]:
                feaVec_num[i] += 1

    print(query_num)
    for i in range(9):
        print(i, feaVec_num[i], feaVec_num[i]/float(query_num))

def decompose(ele):
    ele = ele.strip()
    arr = ele.split('\t')
    if len(arr) != 2:
        print (ele)
        return (8, 1)
    flag = arr[0].strip()
    value = arr[1].strip()
    if flag == "DRScoreThreshold":
        flag = 0
    elif flag == "MaxDRScore":
        flag = 1
    elif flag == "MaxDRScorePosTemp":
        flag = 2
    elif flag == "MaxDRScorePos":
        flag = 3
    elif flag == "Top1EntityMatch":
        flag = 4
    elif flag == "DRScoreTop1EntityMatch":
        flag = 5
    elif flag == "Top1IntentMatch":
        flag = 6
    elif flag == "DRScoreTop1IntentMatch":
        flag = 7
    else:
        flag = 8
    return (flag, value)

def loadFeasJS():
    queryFeas = {}
    feas = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    with open("C:/Code/data/featuresJSL3Ranker.tsv", 'r', encoding='utf-8') as fr:
        for line in fr:
            arr = line.strip().split('\t', 2)
            if len(arr) == 2:
                continue
            query = arr[1].lower().strip()
            if query not in queryFeas:
                queryFeas[query] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
            log = arr[2].rstrip(';').strip()
            logArr = log.split(';')
            for ele in logArr:
                pos, value = decompose(ele)
                queryFeas[query][pos] = value
    return queryFeas

def loadFeasOff():
    fnPre = "C:/Code/data/featureFreeformL3Ranker_{0}.tsv"
    feas = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    queryFeas = {}
    for i in range(1, 9):
        fn = fnPre.format(i)
        print(fn)

        with open(fn, 'r', encoding='utf-8') as fr:
            headerLine = fr.readline()
            columns = headerLine.strip().split('\t')
            queryPos = columns.index("m:Query")
            for line in fr:
                arr = line.strip().split('\t')
                fea = arr[0].strip()
                query = arr[queryPos]
                if query not in queryFeas:
                    queryFeas[query] = [0, 0, 0, 0, 0, 0, 0, 0, 0]
                queryFeas[query][i-1] = fea
    print("watch", queryFeas['blue all rise album free mp3 download'])
    return queryFeas


def main():
    similarityVariable()

if __name__ == "__main__":
    main()