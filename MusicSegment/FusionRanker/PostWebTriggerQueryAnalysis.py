import pandas as pd
import numpy as np
import os
import sys

def TriggerQueryGen(fn_fusionRankerOut, querySet, allQuerySet):
    with open(fn_fusionRankerOut, 'r', encoding='utf-8') as fr:
        columns = fr.readline().strip().split('\t')
        queryPos = columns.index("m:Query")
        docPosPos = columns.index("DocumentPosition")
        scorePos = columns.index("Score")

        for line in fr:
            arr = line.strip().split('\t')
            try:
                query = arr[queryPos]
                docPos = int(arr[docPosPos])
                score = int(arr[scorePos])
            except:
                continue
            allQuerySet.add(query)
            if(docPos + score != 1000):
                querySet.add(query)

def StableSortDocBasedOnScore(docFn, docFnStableSorted):
    docStableSortedList = []
    fr = open(docFn, 'r', encoding='utf-8')
    docList = fr.read().splitlines()
    fr.close()
    columns = docList[0].split('\t')
    docStableSortedList.append(columns)
    query_pos = columns.index('m:Query')
    score_pos = columns.index("Score")
    docPos_pos = columns.index("DocumentPosition")
    query_last = ""
    docInfo = []
    for doc in docList[1:]:
        arr = doc.strip().split('\t')
        query_cur = arr[query_pos]
        if query_last == "":
            query_last = query_cur
        if query_cur == query_last:
            docInfo.append(arr)
        else:
            docInfo.sort(key = lambda x : (float(x[score_pos]), -1.0 * int(x[docPos_pos])), reverse=True)
            for doc_sort in docInfo:
                docStableSortedList.append(doc_sort)
            docInfo = [arr]
            query_last = query_cur

    docInfo.sort(key = lambda  x : (float(x[score_pos]), -1.0 * int(x[docPos_pos])), reverse=True)
    for doc_sort in docInfo:
        docStableSortedList.append(doc_sort)

    fw = open(docFnStableSorted, 'w', encoding='utf-8')
    for doc_info in docStableSortedList:
        fw.write("{0}\n".format('\t'.join(doc_info)))
    fw.close()
    #return docStableSortedList


def PostWebTriggerQueryInfo(fn_fusionRankerSortedByScore, fn_postWebTrigger):
    fr = open(fn_fusionRankerSortedByScore, 'r', encoding='utf-8')
    docList = fr.read().splitlines()
    columns = docList[0].split('\t')
    query_pos = columns.index('m:Query')
    docPos_pos = columns.index('DocumentPosition')
    posWeb_triggerQuerySet = set()
    postWeb_triggerQueryDoc = []
    trigger = False
    start_pos = 0
    end_pos = 0
    query_last = ""
    sort_idx = 0

    for i in range(1, len(docList)):
        arr = docList[i].split('\t')
        query_cur = arr[query_pos]
        if query_last == "":
            query_last = query_cur
            start_pos = i
        if query_last == query_cur:
            if not trigger:
                docPos = int(arr[docPos_pos])
                if sort_idx != docPos:
                    trigger = True
        else:
            if trigger:
                posWeb_triggerQuerySet.add(query_last)
                postWeb_triggerQueryDoc.extend(docList[start_pos:i])
                trigger = False
            sort_idx = 0
            start_pos = i
            query_last = query_cur
            docPos = int(arr[docPos_pos])
            if docPos != sort_idx:
                trigger = True
        sort_idx += 1

    if trigger:
        posWeb_triggerQuerySet.add(query_last)
        postWeb_triggerQueryDoc.extend(docList[start_pos:])

    with open(fn_postWebTrigger, 'w', encoding='utf-8') as fw:
        fw.write('\n'.join(postWeb_triggerQueryDoc))

    return posWeb_triggerQuerySet

def WholeQuerySet(fn):
    wholeQuerySet = set()
    with open(fn, 'r', encoding='utf-8') as fr:
        columns = fr.readline().split('\t')
        queryPos = columns.index('m:Query')
        for line in fr:
            query = line.split('\t')[queryPos]
            wholeQuerySet.add(query)

    return wholeQuerySet


def main():
    querySet = set()
    allQuerySet = set()
    fn_fusionRankerOut = "C:/Code/data/fusionRankerOut.tsv"
   # TriggerQueryGen(fn_fusionRankerOut, querySet, allQuerySet)

    fn_Demo = "C:/Code/data/rankerOutDemo.tsv"
    posWeb_triggerQueryDoc = PostWebTrigger(fn_Demo, 'C:/Code/data/watch.tsv')
    print("\n".join(posWeb_triggerQueryDoc))

if __name__ == "__main__":
    main()