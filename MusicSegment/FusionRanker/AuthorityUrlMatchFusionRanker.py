import sys
import re

def UrlNormalized(url):
    url = url.replace("http://", "").replace("https://", "").replace("www.", "")
    url = url.rstrip("*").rstrip("/")
    return url

def LoadAuthoritySitesScore(fnAuthoritySites, intentAuthoSites):
    with open(fnAuthoritySites, 'r', encoding='utf-8') as fr:
        for line in fr:
            arr = line.strip().split("\t")
            intentId = int(arr[0])
            urlPat = arr[1]
            urlPatNorm = UrlNormalized(urlPat)
            if intentId not in intentAuthoSites:
                intentAuthoSites[intentId] = []
            intentAuthoSites[intentId].append((urlPatNorm, arr[2]))


def AuthoritySitesMatch(intentAuthoSites, fnIntentUrl, fnAuthorityMatchFea, rePat):
    with open(fnAuthorityMatchFea, 'w', encoding='utf-8') as fw:
        with open(fnIntentUrl, 'r', encoding='utf-8') as fr:
            for line in fr:
                arr = line.strip().split('\t')
                intentIdInfo = arr[0]
                mc = re.search(rePat, intentIdInfo)
                intentId = -1
                if mc:
                    intentId = int(mc.group(1))
                else:
                    continue
                url = arr[1]
                urlNorm = UrlNormalized(url)
                if intentId not in intentAuthoSites:
                    continue
                for urlPatScore in intentAuthoSites[intentId]:
                    pat = urlPatScore[0]
                    score = urlPatScore[1]
                    if urlNorm.startswith(pat):
                        fw.write("{0}\t{1}\t{2}\n".format(intentId, url, score))
                        break




def main():
    if len(sys.argv) == 1:
        fnIntentUrl = "C:/Code/data/Body.tsv"
        fnAuthoritySites = "C:/Code/data/authorityScore.tsv"
        fnAuthorityMatchFea = "C:/Code/data/authoritySitesMatchFeatures.tsv"
    else:
        fnIntentUrl = sys.argv[1]
        fnAuthoritySites = sys.argv[2]
        fnAuthorityMatchFea = sys.argv[3]

    intentAuthoSites = {}
    LoadAuthoritySitesScore(fnAuthoritySites, intentAuthoSites)

    rePat = re.compile("\[QLF\$2662:(\d+)\]")
    AuthoritySitesMatch(intentAuthoSites, fnIntentUrl, fnAuthorityMatchFea, rePat)

if __name__ == "__main__":
    main()

