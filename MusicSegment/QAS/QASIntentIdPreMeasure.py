import os
import sys
import re

def loadQueryIntentId_base(baseQueryIntentFn, queryIntentId_base):
    with open(baseQueryIntentFn, 'r', encoding='utf-8') as fr:
        for line in fr:
            arr = line.lower().strip().split('\t')
            id = arr[0].strip()
            query = arr[1]
            queryIntentId_base[query] = id


def loadQueryIntentId_QAS(QASQueryIntentIdFn, queryIntentId_qas):
    pat = re.compile(r"\[qlf\$2662:(\d+)\]")
    with open(QASQueryIntentIdFn, 'r', encoding='utf-8') as fr:
        for line in fr:
            arr = line.lower().strip().split('\t')
            query = arr[0]
            intent = arr[1]
            match = pat.search(intent)
            if match:
                intentid = match.groups(1)[0]
                queryIntentId_qas[query] = intentid

def loadQueryIntentId_QASLocal(QASQueryIntentIdFn, queryIntentId_qas):
    pat = re.compile(r"cluster_(\d+)")
    with open(QASQueryIntentIdFn, 'r', encoding='utf-8') as fr:
        for line in fr:
            arr = line.lower().strip().split('\t')
            query = arr[0]
            intent = arr[1]
            match = pat.search(intent)
            if match:
                intentid = match.groups(1)[0]
                queryIntentId_qas[query] = intentid


def similarity(queryIntentId_base, queryIntentId_QAS, fnOut):
    fwErrorQuery = open("C:/Code/data/intentWrongQuery.tsv", 'w', encoding='utf-8')
    fw = open(fnOut, 'w', encoding='utf-8')
    all_num = 0
    com_num = 0
    comQuery_num = 0
    for query, intentid in queryIntentId_base.items():
        all_num += 1
        if query not in queryIntentId_QAS:
            continue
        comQuery_num += 1
        if intentid == queryIntentId_QAS[query]:
            com_num += 1
        else:
            fwErrorQuery.write("{0}\t{1}\t{2}\n".format(query, intentid, queryIntentId_QAS[query]))

    if all_num != 0:
        fw.write("all_num:{0}\tcom_num{1}\tpre:{2}\n".format(all_num, com_num, float(com_num)/all_num))
        fw.write("comQuery_num:{0}\tcom_num{1}\tpre:{2}\n".format(comQuery_num, com_num, float(com_num) / comQuery_num))
    else:
        fw.write("all_num is 0")

    fwErrorQuery.close()
    fw.close()

def main():
    if len(sys.argv) == 1:
        baseQueryIntentIdFn = "C:/Code/data/QueryIntentId.tsv"
        QASQueryIntentIdFn = "C:/Code/Music/QAS/MusicIntentsModel/queryMusic.tsv.multiclass.output.txt"
        preFn = "C:/Code/data/intentIdPre.tsv"
    else:
        baseQueryIntentIdFn = sys.argv[1]
        QASQueryIntentIdFn = sys.argv[2]
        preFn = sys.argv[3]

    queryIntentId_base = dict()
    loadQueryIntentId_base(baseQueryIntentIdFn, queryIntentId_base)

    #queryIntentId_qas = dict()
    #loadQueryIntentId_QAS(QASQueryIntentIdFn, queryIntentId_qas)

    queryIntentId_qas = dict()
    loadQueryIntentId_QASLocal(QASQueryIntentIdFn, queryIntentId_qas)
    similarity(queryIntentId_base, queryIntentId_qas, preFn)


if __name__ == "__main__":
    main()