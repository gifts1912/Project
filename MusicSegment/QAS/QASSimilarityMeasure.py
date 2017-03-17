import os
import sys
import re


def loadQueryTags(fn, queryTags, tagsCheck):
    with open(fn, 'r', encoding='utf-8') as fr:
        for line in fr:
            arr = line.strip().split('\t')
            query = arr[0].lower().strip()
            tags = arr[1].lower().strip()
            b = tags.find("mssemanticframe{") + len("MSSemanticFrame{")
            tagsInfo = tags[b:].rstrip('}')
            tagsArr = tagsInfo.split(',')
            if query not in queryTags:
                queryTags[query] = {}
            for tagEle in tagsArr:
                tagValue = tagEle.split(':')
                tag = tagValue[0]
                if tag == "entity":
                    valueSet = set(tagValue[1].split('^'))
                elif tag == "constraint":
                    valueSet = set(tagValue[1].split('^'))
                elif tag == "intent":
                    valueSet = set(tagValue[1].split('|'))

                if tag not in tagsCheck:
                    continue
                queryTags[query][tag] = valueSet

def SimilarityTags(queryTagsBase, queryTagsQAS, tagsPos, similarityFn):
    fw = open(similarityFn, 'w', encoding='utf-8')
    tagComNum = [0] * 4
    all_num = 0
    for query_base, tags_base in queryTagsBase.items():
        all_num += 1
        if query_base not in queryTagsQAS:
            continue
        tags_QAS = queryTagsQAS[query_base]
        allSame = True
        for tag, valueSet in tags_base.items():
            pos = tagsPos[tag]
            if len(valueSet^tags_QAS[tag]) == 0:
                tagComNum[pos] += 1
            else:
                allSame = False
        if allSame:
            tagComNum[3] += 1
    if all_num != 0:
        fw.write("all_num:{0}\n".format(all_num))
        fw.write("entity:{0}, partion:{1}\tintent:{2}, partion:{3}\tconstraint:{4}, partion:{5}\tallFeatures:{6}, partion:{7}\n".format(tagComNum[0], float(tagComNum[0])/all_num, tagComNum[1], float(tagComNum[1])/all_num, tagComNum[2], float(tagComNum[2])/all_num, tagComNum[3], float(tagComNum[3])/all_num))
    else:
        fw.write("all_num is 0")
    fw.close()


def main():
    if(len(sys.argv) == 1):
        baseTagsFn = "C:/Code/data/baseQueryTags.tsv"
        QASTagsFn = "C:/Code/data/QASQueryTags.tsv"
        similarityFn = "C:/Code/data/similarity.tsv"
    else:
        baseTagsFn = sys.argv[1]
        QASTagsFn = sys.argv[2]
        similarityFn = sys.argv[3]
    tagsCheck = {'entity', 'intent', 'constraint'}
    tagsPos = {'entity':0, 'intent':1, 'constraint':2}
    queryTagsBase = {}
    loadQueryTags(baseTagsFn, queryTagsBase, tagsCheck)
    queryTagsQAS = {}
    loadQueryTags(QASTagsFn, queryTagsQAS, tagsCheck)

    SimilarityTags(queryTagsBase, queryTagsQAS, tagsPos, similarityFn)



if __name__ == "__main__":
    main()