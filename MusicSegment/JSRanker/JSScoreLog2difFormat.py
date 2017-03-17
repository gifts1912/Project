import os


def loadScoreLog(fn_log, queryUrlPosList, fn_rankerOut):
    with open(fn_log, 'r', encoding='utf-8') as fr:
        head = fr.readline()
        for line in fr:
            arr = line.split('\t', 2)
            log = arr[2].strip()
            if log == "":
                continue
            query = arr[1].lower().strip()
            if query not in queryUrlPosList:
                queryUrlPosList[query] = [0] * 20
            urlScoreArr = log.rstrip(';').split(';')
            for urlScore in urlScoreArr:
                arr = urlScore.strip().split('\t')
                if len(arr) != 2:
                    print("len(arr)!=2", line)
                    continue
                url, score = arr[0], arr[1]
                url = url.strip().lower().rstrip('/')
                score = int(score.strip())
                pos = 1000 - score
                if pos > 19:
                    print("pos>19", line)
                queryUrlPosList[query][pos] = url

    with open(fn_rankerOut, 'w', encoding='utf-8') as fw:
        for query, urlList in queryUrlPosList.items():
            for pos in range(20):
                url = urlList[pos]
                fw.write("{0}\t{1}\t{2}\n".format(query, url, pos))


def main():
    queryUrlPosList = {} # query:[url_1srt, url_2nd, ..., url_20th]
    loadScoreLog("C:/Code/data/jsScoreLog.tsv", queryUrlPosList, "C:/Code/data/JSRankerOutput.tsv")


if __name__ == "__main__":
    main()