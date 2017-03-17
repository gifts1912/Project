import os
import sys


startIdx = 182

def loadQASId2IntentId(fn, qas2IntentId, intentId2QasId):
    with open(fn, 'r', encoding='utf-8') as fr:
        for line in fr:
            arr = line.strip().split('\t')
            if(len(arr) != 3):
                print(line.strip())
                continue
            qasId = arr[0]
            intentId = arr[2]
            qas2IntentId[qasId] = intentId
            intentId2QasId[intentId] = qasId

def patToPatKeyDic(fn_patKeytermDic, pat2PatKeyDic):
    with open(fn_patKeytermDic, 'r', encoding='utf-8') as fr:
        for line in fr:
            arr = line.strip().split('\t')
            if(len(arr) != 2):
                print(line.strip())
                continue
            pat = arr[0]
            patKeyDic = arr[1]
            pat2PatKeyDic[pat] = patKeyDic


def loadAuthorityEncode(fn_authorityEncode, intentAuthorityEncode, intId2qas):
    with open(fn_authorityEncode, 'r', encoding='utf-8') as fr:
        for line in fr:
            arr = line.strip().split('\t')
            if (len(arr) != 5):
                print(line.strip())
                continue
            intentId = arr[0]
            qasId = intId2qas[intentId]
            pat = arr[1]
            encode = arr[2]
            try:
                score = int(arr[4])
            except:
                print(line.strip())
                continue
            if qasId not in intentAuthorityEncode:
                intentAuthorityEncode[qasId] = {}
            intentAuthorityEncode[qasId][pat] = (encode, score)
    intentAuthorityEncodeSort = {}
    for intentId, patEncode in intentAuthorityEncode.items():
        patEncodeSortByScore = sorted(patEncode.items(), key=lambda x: x[1][1], reverse=True)
        intentAuthorityEncodeSort[intentId] = patEncodeSortByScore
    return intentAuthorityEncodeSort


def convertPatKeyDicFormat(fn_result, intPatEncodeSortByScore, pat2PatKeyDic, marketId = "5"):
    global startIdx
    with open(fn_result, 'w', encoding='utf-8') as fw:
        for intent, patEncode in intPatEncodeSortByScore.items():
            if(int(intent) >= 300):
                continue
            sectionName = "[KeyTermDict:SIIntentLevelPlatformAuthoritySitesUnUN:{0}]".format(startIdx)
            startIdx += 1
            matchConstraint = "MatchConstraint=(AND QLF$1200:1 QLF$1201:{0} QLF$2662:{1})".format(marketId, intent)
            fw.write("\n{0}\n".format(sectionName))
            fw.write("{0}\n".format(matchConstraint))
            num = 0
            patKeyDicSet = set()
            for patEncodeInfo in patEncode:
                pat = patEncodeInfo[0]
                if pat not in pat2PatKeyDic:
                    continue
                patKeyRes = pat2PatKeyDic[pat]
                score = patEncodeInfo[1][0]
                if int(score) == 0:
                    print(patEncodeInfo)
                    continue
                if patKeyRes not in patKeyDicSet:
                    patKeyDicSet.add(patKeyRes)
                    fw.write("KeyTerm_{1}={0}\nScore_{1}={2}\n".format(patKeyRes, num, score))
                    num += 1

def main():
    markets = ["In", 'Ca', 'Au', 'Gb']
    marketsId = ['5', '2', '4', '3']

    for i in range(4):
        mrk = markets[i]
        mrkId = marketsId[i]
        fn_qasIdToClusterId = "C:/Code/Music/QAS/musicQASNeedMaterial/qasIdToClusterId.tsv"
        fn_patKeytermDic = "C:/Code/Music/PatternEngine/FinallyMaterial/patSchema_20170310V0.2.tsv"
        fn_authorityEncode = "C:/Code/Music/PatternEngine/AuthoritySite/en{0}DoAuthorityDecode.tsv".format(mrk)
        fn_petKeyTermDicRes = "C:/Code/Music/PatternEngine/AuthoritySite/patKeyDicEn{0}Do.tsv".format(mrk)

        qas2IntId = {}
        intId2qas = {}
        loadQASId2IntentId(fn_qasIdToClusterId, qas2IntId, intId2qas)

        pat2PatKeyDic = {}
        patToPatKeyDic(fn_patKeytermDic, pat2PatKeyDic)

        intentPatEncodeDic = {}
        intentPatEncodeSortByScore = loadAuthorityEncode(fn_authorityEncode, intentPatEncodeDic, intId2qas)

        convertPatKeyDicFormat(fn_petKeyTermDicRes, intentPatEncodeSortByScore, pat2PatKeyDic, mrkId)


if __name__ == "__main__":
    main()