import os
import re


def ConvertToSlotFormat(fn_QAS, fn_Slot):
    with open(fn_Slot, 'w', encoding='utf-8') as fw:
        fw.write("m:Query\tm:AddQuery\n")
        with open(fn_QAS, 'r', encoding='utf-8') as fr:
            slot_start_pos = len("2:mdTypeNameAugmentationToAppend:")
            for line in fr:
                arr = line.strip().split('\t')
                query = arr[0]
                slotInfo = arr[3]
                slotInfo = slotInfo[slot_start_pos:]
                fw.write("{0}\t{1}\n".format(query, slotInfo))

def DecodeIntentId(intentInfo, rePat):
    mc = re.search(rePat, intentInfo)
    if mc:
        return int(mc.group(1))
    else:
        return -1

def LoadQASIdToRankerId(fn_qasIdToRankerId, qasId2RankerId):
    with open(fn_qasIdToRankerId, 'r', encoding='utf-8') as fr:
        for line in fr:
            arr = line.strip().split('\t')
            qasId = int(arr[0])
            rankerId = arr[2]
            qasId2RankerId[qasId] = rankerId

def ConvertToIntentIdFormat(fn_QAS, fn_IntentId, fn_qasIdToRankerId):
    qasId2RankerId = {}
    LoadQASIdToRankerId(fn_qasIdToRankerId, qasId2RankerId)
    with open(fn_IntentId, 'w', encoding='utf-8') as fw:
        with open(fn_QAS, 'r', encoding='utf-8') as fr:
            rePat = re.compile("\[QLF\$2662:(\d+)\]")
            for line in fr:
                arr = line.strip().split('\t')
                query = arr[0]
                intentInfo = arr[1]
                intentId = DecodeIntentId(intentInfo, rePat)
                if intentId not in qasId2RankerId:
                    continue
                rankerId = qasId2RankerId[intentId]
                fw.write("{0}\t{1}\n".format(rankerId, query))

def main():
    fn_QAS = "C:/Code/Music/QAS/MusicQASNecessaryFilesChangeNameStep4/QAS/AuDoQuerySetForSlot.tsv.metadata.output.txt"
    fn_Slot = "C:/Code/data/querySlotAU.tsv"
    fn_IntentId = "C:/Code/data/queryIntentIdAUDO.tsv"
    fn_qasIdToRankerId = "C:/Code/data/qasIdToClusterId.tsv"
    ConvertToSlotFormat(fn_QAS, fn_Slot)
    ConvertToIntentIdFormat(fn_QAS, fn_IntentId, fn_qasIdToRankerId)

if __name__ == "__main__":
    main()