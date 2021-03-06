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

def GenPatToSchema(fnPatToSchema, fnPatToScoreIdx, patToSchema, fnPESuccess):
    scoreIdxToPat = {}
    with open(fnPatToScoreIdx, 'r', encoding='utf-8') as fr:
        for line in fr:
            arr = line.strip().split('\t')
            scoreIdx = arr[1]
            pat = arr[0]
            scoreIdxToPat[scoreIdx] = pat

    patSuccSet = set()
    with open(fnPESuccess, 'r' , encoding='utf-8') as fr:
        for line in fr:
            pat = line.strip()
            patSuccSet.add(pat)

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
        patSuccSet.add(pat)

    fw = open(fnPESuccess, 'w', encoding='utf-8')
    for pat in patSuccSet:
        fw.write("{0}\n".format(pat))
    fw.close()


def GenOfficialSchema(argv):
    if (len(argv) <= 1):
        argv = ["", "", "", "", "", ""]
        argv[1] = "C:/Code/data/patternIn.tsv"
        argv[2] = "C:/Code/data/PatternToSchemaStep3_2.tsv"
        argv[3] = "C:/Code/data/Pattern_Engine_Music_Step3.txt"
        argv[4] = "C:/Code/data/PESchemaInStep3_2.tsv"
        argv[5] = fnPatternSuccess
    fnPatIn = argv[1]
    fnPatToSchema = argv[2]
    fnPatToScoreIdx = argv[3]
    fnPESchema = argv[4]
    fnPESuccess = argv[5]

    patToSchema = {}
    GenPatToSchema(fnPatToSchema, fnPatToScoreIdx, patToSchema, fnPESuccess)

    with open(fnPESchema, 'w', encoding='utf-8') as fw:
        for pat, schema in patToSchema.items():
            fw.write("{0}\t{1}\n".format(pat, schema))


def GenOfficialSchemaNotSuccess(argv):
    pass
    #if len(argv) <= 1:





def main():

#Step

    if len(sys.argv) == 1:
        fnUrl = "C:/Code/data/urlRetroIndex.tsv"
        fnPat = "C:/Code/data/pattern{0}.tsv"
        fnPat2Url = "C:/Code/data/Pattern_Engine_Music_Step5.txt"
    else:
        fnUrl = sys.argv[1]
        fnPat = sys.argv[2]
        fnPat2Url = sys.argv[3]

    urlFreqSorted = []
    urlFreqSorted = LoadUrl(fnUrl)

    patternSet = set()
    markets = ['In', 'Ca', 'Gb', 'Ca']
    for market in markets:
        fn = fnPat.format(market)
        LoadPat(patternSet, fn, fnPatternSuccess)

    PatToUrl(patternSet, urlFreqSorted, fnPat2Url, 10)

#Step2
    #GenOfficialSchema(sys.argv)


#Step3: repeat generate the PE official schema of the patterns that not success return

   # GenOfficialSchemaNotSuccess(sys.argv)


if __name__ == "__main__":
    main()