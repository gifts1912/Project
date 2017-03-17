import sys
import os

fnPatternSuccess = "C:/Code/data/patternSuccess.tsv"
def LoadUrl(fnUrl="C:/Code/data/url.tsv"):
    urlFreq = {}
    with open(fnUrl, 'r', encoding='utf-8') as fr:
        for url in fr:
            url = url.strip()
            urlFreq.setdefault(url, 0)
            urlFreq[url] += 1
    urlFreqSorted = sorted(urlFreq.items(), key=lambda x: x[1], reverse=True)
    return urlFreqSorted


def LoadPat(patternSet, fnPat, fnPatFilter):
    patFilterSet = set()
    with open(fnPatFilter, 'r', encoding='utf-8') as fr:
        for line in fr:
            pat = line.strip()
            patFilterSet.add(pat)

    with open(fnPat, 'r', encoding='utf-8') as fr:
        for line in fr:
            arr = line.strip().split('\t')
            pattern = arr[1]
            pat = pattern.strip()
            if pat in patFilterSet:
                continue
            patternSet.add(pat)



def UrlProcess(url):
    #urlNew = url.replace("http://", "").replace("https://", "").replace("www.", "").replace("*", "").rstrip("/")
    urlNew = url.replace("*", "").rstrip("/")
    return urlNew

def PatToUrl(patternSet, urlFreqSorted, fn = "C:/Code/data/patternToUrl.tsv", topN = 1):
    with open("C:/Code/data/patternToPESchemaFail.tsv", 'w', encoding='utf-8') as fw:
        for pat in patternSet:
            fw.write("{0}\n".format(pat))

    score = 0
    fwNotUrl = open("C:/Code/data/patNoUrl.tsv", 'w', encoding='utf-8')
    with open(fn, 'w', encoding='utf-8') as fw:
        for pat in patternSet:
            patNew = UrlProcess(pat)
            num = 0
            for url, freq in urlFreqSorted:
                urlNew = UrlProcess(url)
                if urlNew.startswith(patNew):
                    fw.write("{0}\t{2}\t{1}\n".format(pat, url, score))
                    num += 1
                    if num >= topN:
                        break
            score += 1
            if num == 0:
                fwNotUrl.write("{0}\n".format(pat))
    fwNotUrl.close()

def GenPatToSchema(fnPatToSchema, fnPatToScoreIdx, patToSchema):
    scoreIdxToPat = {}
    with open(fnPatToScoreIdx, 'r', encoding='utf-8') as fr:
        for line in fr:
            arr = line.strip().split('\t')
            scoreIdx = arr[1]
            pat = arr[0]
            scoreIdxToPat[scoreIdx] = pat

    scoreIdxToSchema = {}
    with open(fnPatToSchema, 'r', encoding='utf-8') as fr:
        flag = False
        indexSchema = {}
        for line in fr:
            if line.startswith("KeyTerm_"):
                pos_b = line.find("=")
                schema = line.strip()[pos_b + 1:]
            elif line.startswith("Score_"):
                pos_b = line.find("=")
                score = line.strip()[pos_b + 1:]
                flag = True
            if flag:
                indexSchema[score] = schema
                flag = False

    for scoreIdx, pat in scoreIdxToPat.items():
        if scoreIdx not in indexSchema:
            continue
        schema = indexSchema[scoreIdx]
        patToSchema[pat] = schema



def GenOfficialSchema(fnPatToSchema, fnPatToScoreIdx, fnPESchema):
    patToSchema = {}
    GenPatToSchema(fnPatToSchema, fnPatToScoreIdx, patToSchema)

    with open(fnPESchema, 'w', encoding='utf-8') as fw:
        for pat, schema in patToSchema.items():
            fw.write("{0}\t{1}\n".format(pat, schema))


def main():
    if (len(sys.argv) <= 1):
        sys.argv = [""] * 4
        sys.argv[1] = "C:/Code/data/KeyTermPatternStep5_4.ini"
        sys.argv[2] = "C:/Code/data/patScoreUrl_Step5_3.tsv"
        sys.argv[3] = "C:/Code/data/patToSchemaStep5_.tsv"

    fnPatToSchema = sys.argv[1]
    fnPatToScoreIdx = sys.argv[2]
    fnPESchema = sys.argv[3]
    GenOfficialSchema(fnPatToSchema, fnPatToScoreIdx, fnPESchema)




if __name__ == "__main__":
    main()