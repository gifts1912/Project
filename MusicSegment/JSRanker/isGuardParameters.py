import pandas as pd
import numpy as np
import os
import path


def similarityVariable():
    fw = open("C:/Code/data/queryUrlEntityDif.tsv", 'w', encoding='utf-8')
    queryFeasOff = loadFeasOff()
    queryFeasJS = loadFeasJS()
    """
    query = "blue all rise album free mp3 download"
    print("OffWatch\t{0}".format(queryFeasOff[query]))
    print("JSWatch\t{0}".format(queryFeasJS[query]))
    """
    all_num = 0
    feaVec_num = [0, 0, 0, 0, 0, 0, 0]
    for query, urlFeas in queryFeasJS.items():
        if query not in queryFeasOff:
            continue
        for url, feas in urlFeas.items():
            if url not in queryFeasOff[query]:
                continue
            all_num += 1
            for i in range(6):
                try:
                    if int(feas[i]) == int(float(queryFeasOff[query][url][i])):
                        feaVec_num[i] += 1
                    elif i == 5:
                        fw.write(query + '\t' + url + '\n')
                except:
                    print("out of range", i, feas, 'after', queryFeasOff[query][url])
    fw.close()
    print(all_num)
    if all_num != 0:
        for i in range(7):
            print(i, feaVec_num[i], feaVec_num[i]/float(all_num))

def decompose(ele):
    ele = ele.strip()
    arr = ele.split('\t')
    if len(arr) != 2:
        print (ele)
        return (6, 1)
    flag = arr[0].strip()
    value = arr[1].strip()
    if flag == "guardingScore":
        flag = 0
    elif flag == "isSiteConsMatchDomain":
        flag = 1
    elif flag == "lowQualitySiteScore":
        flag = 2
    elif flag == "entityMatchScore":
        flag = 3
    elif flag == "intentMatchScore":
        flag = 4
    elif flag == "constraintMatchScore":
        flag = 5
    else:
        flag = 6
    return (flag, value)

def loadFeasJS():
    queryFeas = {}
    feas = [0, 0, 0, 0, 0, 0, 0]
    with open("C:/Code/data/parameterInIsGuardJSL3Ranker.tsv", 'r', encoding='utf-8') as fr:
        fr.readline()
        for line in fr:
            arr = line.strip().split('\t', 2)
            if len(arr) == 2:
                continue
            query = arr[1].lower().strip()
            if query not in queryFeas:
                queryFeas[query] = {}
            log = arr[2].rstrip('->').strip()
            logUrlArr = log.split('->')
            for logEle in logUrlArr:
                logArr = logEle.split(';')
                url = logArr[0].lower().strip().rstrip('/')
                queryFeas[query][url] = [0, 0, 0, 0, 0, 0, 0]
                for ele in logArr[1:]:
                    pos, value = decompose(ele)
                    queryFeas[query][url][pos] = value
    return queryFeas

def loadFeasOff():
    fnPre = "C:/Code/data/offlineRankerIn.tsv"
    columns = ['m:Query', 'm:Url', 'GuardingScore','IsSiteConsMatchDomain', 'BadSiteScore',  'EntityMatch',  'IntentMatch', 'ConstraintMatch']
    queryFeas = {}
    df = pd.read_csv(fnPre, sep ='\t', header = 0)
    df_feas = df[columns]
    del df
    for row in df_feas.values:
        if len(row) != 8:
            print("offFeas", row)
            continue
        query = str(row[0]).lower().strip()
        if query not in queryFeas:
            queryFeas[query] = {}
        url = str(row[1]).lower().rstrip('/').strip()
        gs = str(row[2])
        iscmd = str(row[3])
        bss = str(row[4])
        em = str(row[5])
        im = str(row[6])
        cm = str(row[7])
        queryFeas[query][url] = [gs, iscmd, bss, em, im, cm]
    return queryFeas


def main():
    similarityVariable()

if __name__ == "__main__":
    main()