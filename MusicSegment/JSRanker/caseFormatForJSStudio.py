import pandas as pd
import numpy as np
import os
import sys

def reRankFeatures(df_fea):
    columnsStr = ""
    for i in range(8):
        columnsStr += 'NumberOfOccurrences_MultiInstanceTitle_{0}'.format(str(i)) + ','
    for i in range(8):
        columnsStr += 'NumberOfOccurrences_Body_{0}'.format(str(i)) + ','
    columns = columnsStr.rstrip(',').split(',')
    x = df_fea[columns].values
    reRankFeaturesVec = []
    for i in range(20):
        info = x[i]
        res = ""
        for j in range(8):
            v = info[j]
            if pd.isnull(v):
                v = 0
            v = int(v)
            res += "NumberOfOccurrences_MultiInstanceTitle_{0}:{1}".format(j, v) + ','
        for j in range(8):
            v = info[j+8]
            if pd.isnull(v):
                v = 0
            v = int(v)
            res += "NumberOfOccurrences_Body_{0}:{1}".format(j, v) + ','
        res += "NumberOfOccurrences_MultiInstanceTitle_8:0,NumberOfOccurrences_MultiInstanceTitle_9:0,NumberOfOccurrences_Body_8:0,NumberOfOccurrences_Body_9:0,OnlineMemoryUrlFeature_0:0,NumberOfPerfectMatch_BingClick:0"
        reRankFeaturesVec.append(res)
    return reRankFeaturesVec

def genCaseForJSStudio(query, JSInput, fnCaseFormat = "C:/Code/data/caseFormat.tsv"):
    data = pd.read_csv(JSInput, sep = '\t', header= 0)
    caseDF = data[data['m:Query'] == query]
    del data
    snapShotHeader = """<QueryInfoListView>
Document Count==20
Market==0
Augmented Query (augmentedquery)=={0}
Normalized Query (normalizedquery)==
Normalized Raw Query (normalizedrawquery)==
Raw Query (rawquery)=={1}
Altered Query (alteredquery)== {1}
Fusion AccumulatedQuerySignals==
QueryPathLabels==
Fusion QuerySignals==
</QueryInfoListView>
<DocumentsInputListView>"""
    snapShot = """{9}==Docs=={0}
{9}==Url=={1}
{9}==Title=={6}
{9}==Snippet=={7}
{9}==Tier==
{9}==DisplayUrl==
{9}==l2score=={2}
{9}==markers==9:{8},11:{10}
{9}==xinis==
{9}==DomainId=={3}
{9}==HostId=={4}
{9}==QueryIndex==
{9}==OriginalPosInPath==
{9}==rerank features==DomainAuthorityFeature_DUMultiInstanceUrlV2_0_4:{14},HostId:{4},DomainId:{3},{11}
{9}==AccumulatedDocSignals==
{9}==DocSignals==
{9}==RerankScore==0
{9}==FusionScore==0"""

    fw = open(fnCaseFormat, 'w', encoding='utf-8')
    reRankerFeaturesVec = reRankFeatures(caseDF)
    columns = ["DocumentPosition", 'm:Url', 'DRScore', 'DomainId', 'HostId', 'OnlineMemoryUrlFeature_0', 'm:Title', 'm:Snippet', 'Marker_9', 'Marker_11', 'm:CanonicalQuery', 'm:Query', 'DomainAuthorityFeature_DUMultiInstanceUrlV2_0_4']
    num = len(columns)
    addQuery = ""
    query = ""
    fea_narray = caseDF[columns].values
    for i in range(fea_narray.shape[0]):
        arr = []
        for j in range(num):
            v = fea_narray[i][j]
            if pd.isnull(v):
                v = 0
            arr.append(v)
        if query == "":
            query = arr[11]
            addQuery = arr[10]
            print(addQuery, query)
            fw.write(snapShotHeader.format(addQuery, query) + '\n')
        title = arr[6]
        snippet = arr[7]
        try:
            title = title.decode('utf-8').encode('utf-8')
            snippet = snippet.decode('utf-8').encode('utf-8')
        except:
            print({'title':title, "snippet":snippet})
        arr[0] = int(arr[0])
        arr[12] = int(arr[12])
        res = snapShot.format(arr[0], arr[1], arr[2], int(arr[3]), int(arr[4]), arr[5], arr[6], arr[7], arr[8], str(i), arr[9], reRankerFeaturesVec[i], arr[10], arr[11], arr[12])
        fw.write(res + '\n')
    fw.write("</DocumentsInputListView>" + '\n')
    fw.close()
    print(np.unique(caseDF[['m:CanonicalQuery', 'm:Query']].values))


def main():
    query = "the weekend i can t feel my face lyrics"
    genCaseForJSStudio(query, "C:/Code/data/fusionJSRankerIn.tsv", "C:/Code/data/caseFormat.tsv")


if __name__ == "__main__":
    main()