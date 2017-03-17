import pandas as pd
import numpy as np

def loadJSLog(jsLogFile, queryUrlFeas):
    with open(jsLogFile, 'r', encoding='utf-8') as fr:
        for line in fr:
            arr = line.split('\t', 2)
            query = arr[1].strip().lower()
            log = arr[2].strip().rstrip(';')
            if log == "":
                continue
            logArr = log.split(';')
            if query not in queryUrlFeas:
                queryUrlFeas[query] = {}
            for i in range(len(logArr)):
                urlFea = logArr[i]
                urlFeaArr = urlFea.strip().split('\t')
                if(len(urlFeaArr) != 2):
                    print("urlFea in JS decompose error", line)
                    continue
                url = str(urlFeaArr[0]).lower().strip().rstrip('/').strip()
                aut = str(urlFeaArr[1]).strip()
                try:
                    queryUrlFeas[query][url] = int(aut)
                except:
                    print("int(constraintMatch in JS error", line)
                    continue

def loadOfflineFeatures(offQueryUrlFeas, offlineRankerIn = "C:/Code/data/offlineRankerIn.tsv"):
    with open(offlineRankerIn, 'r', encoding='utf-8') as fr:
        queryIdx = 0 #columns.index("m:Query")
        urlIdx = 1 #columns.index("m:Url")
        feaIdx = 2 #columns.index('ConstraintMatch')
        for line in fr:
            arr = line.strip().split('\t')
            query = (arr[queryIdx]).lower().strip()
            url = arr[urlIdx].lower().strip().rstrip('/')
            if query not in offQueryUrlFeas:
                offQueryUrlFeas[query] = {}
            offQueryUrlFeas[query][url] = int(arr[feaIdx])

def loadRD2Query():
    difQuerySet = set()
    with open("C:/Code/data/diff2Query.tsv", 'r', encoding='utf-8') as fr:
        for line in fr:
            difQuerySet.add(line.strip())
    return difQuerySet

def similarityCompute(queryUrlFeas, offQueryUrlFeas, difQueryFile = "C:/Code/data/queryListWithDiffHostId.tsv"):
    difQuerySet = set()
    difQuerySet = loadRD2Query()
    all_num = 0
    com_num = 0
    for query, urlCons in offQueryUrlFeas.items():
        if query not in queryUrlFeas:
            continue
        if query not in difQuerySet:
            continue
        for url, con in urlCons.items():
            if url not in queryUrlFeas[query]:
                continue
            all_num += 1
            if con == queryUrlFeas[query][url]:
                com_num += 1
    if all_num != 0:
        print(all_num, com_num, float(com_num) / all_num)
    else:
        print("all_num is 0")



def queryLevelLoad(JSLog, queryFeaJS):
    with open(JSLog, 'r', encoding='utf-8') as fr:
        for line in fr:
            arr = line.strip().split('\t', 2)
            if len(arr) != 3:
                continue
            query = arr[1].strip().lower()
            log = arr[2].strip().rstrip(';').strip()
            queryFeaJS[query] = log

def queryLevelOffLoad(offlineLog, queryFeaOff):
    offlineDebug = pd.read_csv(offlineLog, sep='\t', header=0)
    columns = ['m:Query', 'm:Url', 'ConstraintMatchThreshold']
    for row in offlineDebug[columns].values:
        query = str(row[0]).strip().lower()
        ent = str(row[2]).strip()
        queryFeaOff[query]= ent

def similarityQueryLevel(JSLog = "C:/Code/data/JSLog.tsv", offlineLog = "C:/Code/data/offlineRankerIn.tsv"):
    queryFeaJS = {}
    queryFeaOff = {}
    queryLevelLoad(JSLog, queryFeaJS)
    queryLevelOffLoad(offlineLog, queryFeaOff)

    all_num = 0
    com_num = 0
    for query, fea in queryFeaJS.items():
        if query not in queryFeaOff:
            continue
        all_num += 1
        if fea == queryFeaOff[query]:
            com_num += 1
    if all_num != 0:
        print(all_num, com_num, float(com_num)/all_num)

def main():
    jsLogFile = "C:/Code/Module/JSRankerEvaluation/o2_25933d37-7d7e-4eab-ab1f-623f04a96a33/25933d37-7d7e-4eab-ab1f-623f04a96a33"
    queryUrlFeas = {}
    loadJSLog(jsLogFile, queryUrlFeas)

    offQueryUrlFeas = {}
    loadOfflineFeatures(offQueryUrlFeas, "C:/Code/data/offL3RankerIn_HostId.tsv")

    similarityCompute(queryUrlFeas, offQueryUrlFeas)


if __name__ == "__main__":
    main()
