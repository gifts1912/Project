import sys
import os

def loadJSLog(fn, baseQuerySet):
    queryUrlFeas = {}
    with open(fn, 'r', encoding='utf-8') as fr:
        for line in fr:
            arr = line.strip().split('\t', 2)
            query = arr[1].lower().strip()
            log = arr[2].strip('\\n').strip()
            if log == "":
                continue
            if query not in baseQuerySet:
                continue
            if query not in queryUrlFeas:
                queryUrlFeas[query] = {}
            logArr = log.split('\\n')
            for log in logArr:
                urlScoreArr = log.strip().split('\t')
                if len(urlScoreArr) != 3:
                    continue
                url = urlScoreArr[0].lower().rstrip('/')
                auScore = int(urlScoreArr[1])
                entityScore = int(urlScoreArr[2])
                queryUrlFeas[query][url] = [auScore, entityScore]
    return queryUrlFeas

def loadOff(fn, baseQuerySet):
    #only load query that in baseQuerySet and 2nd position url after l3RankerOutput
    queryUrlFeas = {}
    with open(fn, 'r', encoding='utf-8') as fr:
        columns = fr.readline().rstrip('\n').split('\t')
        queryPos = columns.index("m:Query")
        urlPos = columns.index('m:Url')
        scorePos = columns.index("AggregatedDerivedFeature0")
        authPos = columns.index("AuthorityScoreOldOriginal")
        entityPos = columns.index("EntityMatch")
        for line in fr:
            arr = line.rstrip('\n').split('\t')
            query = arr[queryPos].lower().strip()
            if query not in baseQuerySet:
                continue
            score = int(arr[scorePos])
            if score == 999:
                if query not in queryUrlFeas:
                    queryUrlFeas[query] = {}
                url = arr[urlPos].lower().rstrip('/')
                authoScore = int(arr[authPos])
                entityScore = int(arr[entityPos])
                queryUrlFeas[query][url] = [authoScore, entityScore]
    return queryUrlFeas


def loadBaseQuery(fn):
    baseqQuerySet = set()
    with open(fn, 'r', encoding='utf-8') as fr:
        for line in fr:
            baseqQuerySet.add(line.strip())

    return baseqQuerySet


def similarityCompute(queryUrlFeasLog, queryUrlFeasOff):
    # for each feature: same feature score num divided all <query, 2nd_Url> pair number;
    # for all features: only count if all featues score are equal.

    fw = open("C:/Code/data/authorityDifQueryUrlSet.tsv", 'w', encoding='utf-8')
    all_num = 0
    fea_num = [0] * 3
    for query, urlFeas in queryUrlFeasOff.items():
        for url, feas in urlFeas.items():
            if query not in queryUrlFeasLog:
                continue
            all_num += 1

            if url in queryUrlFeasLog[query]:
                flag = False
                if feas[0] == queryUrlFeasLog[query][url][0]:
                    fea_num[0] += 1
                    flag = True
                else:
                    fw.write("{0}\t{1}\n".format(query, url))
                if feas[1] == queryUrlFeasLog[query][url][1]:
                    fea_num[1] += 1
                    if flag:
                        fea_num[2] += 1

    if all_num != 0:
        print("all_num:{0}\tauthScore_comm:{1}  authScore_partition:{2}\tentityScore_comm:{3}  entityScore_partition:{4}\tallFeas_comm:{5}, allFeas_partition:{6}".format(all_num, fea_num[0], float(fea_num[0])/all_num, fea_num[1], float(fea_num[1])/all_num, fea_num[2], float(fea_num[2])/all_num))
    else:
        print("all_num:0")

    fw.close()



def authorityEntitySimilarity():
    fn_rd2Dif = "C:/Code/data/diff2QueryComm.tsv"
    baseQuerySet = loadBaseQuery(fn_rd2Dif)

    fn_log = "C:/Code/Module/JSRankerEvaluation/o2_b553d3a6-d331-42f1-a647-8f7eb365b7c7/authorityEntityMatchScoreLog.tsv"
    queryUrlFeasLog = loadJSLog(fn_log, baseQuerySet)

    fn_off = "C:/Code/data/offL3ScoreRankerOut.tsv"
    queryUrlFeasOff = loadOff(fn_off, baseQuerySet)

    similarityCompute(queryUrlFeasLog, queryUrlFeasOff)

def main():
    authorityEntitySimilarity()


if __name__ == "__main__":
    main()