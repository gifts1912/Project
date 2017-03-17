import sys
import json

def fakeQLF(infile, outfile):
    with open(infile, 'r', encoding='utf-8') as fr:
        with open(outfile, 'w', encoding='utf-8') as fw:
            for line in fr:
                arr = line.strip().split('\t')
                if(len(arr) != 2):
                    continue
                clusterId = arr[0]
                query = arr[1]
                resultFormat = "{0}\t[QLF$2662:{1}]\t[QLF$2663:100]\n".format(query, clusterId)
                fw.write(resultFormat)

def slotFormat(slotTag):
    slotArr = slotTag.strip().split('|')
    slotOut = {"entity":[], "intent":{}, "constraint":[], "urlkeyword":[], "guarding":[], "officialsite":[], "siteconstraint":[], "otherslots":[]}
    # example of slotOut {entity:freedom of expression&1,intent:,constraint:,urlkeyword:dp,guarding:,officialsite:&,siteconstraint:,otherslots:^}
    for slot in slotArr:
        slotStruct = json.loads(slot, encoding='utf-8')
        type = slotStruct["Type"].lower()
        span = slotStruct["Span"].strip()
        score = slotStruct['Score']
        if(type == "ent_ent"):
            slotOut["entity"].append(span + '&' + str(score)) # entity1^entity2
        elif (type == "cons_cons"): #constraint format: constraint
            slotOut["constraint"].append(span + "&&&")
        elif (type.startswith("int_")): #design format: intent:int_intent1->intent1_tag1&intent1_tag2^int_intent2->intent2_tag1&intent2_tag2
            if type not in slotOut['intent']:
                slotOut['intent'][type] = []
            slotOut['intent'][type].append(span)
    slotOutStr = json.dumps(slotOut)
    res = "{"
    resDic = {}
    for k, v in slotOut.items():
        if k == "entity":
            res += 'entity:' + '^'.join(v) + ','
            resDic[k] = "^".join(v)
        elif k == "constraint":
            res += "constraint:" + '^'.join(v) + ','
            resDic[k] = '^'.join(v)
        elif k == "intent":
            resCur = ""
            for k_int, v_int in v.items():
                res += "intent:" + k_int + '->' + '&'.join(v_int) + '^'
                resCur +=k_int + '->' + '&'.join(v_int) + '^'
            resCur = resCur.rstrip('^')
            res = res.rstrip('^') + ','
            resDic[k] = resCur
        elif k == "otherslots":
            resDic[k] = '^'
        elif k == "officialsite":
            resDic[k] = '&'
        else:
            res += k + ':' + '^'.join(v) + ','
            resDic[k] = '^'.join(v)
    res = res.rstrip(',')+ '}'
    res = json.dumps(resDic, separators=(',', ':')).replace('"', '')
    return "AddQuery:MSSemanticFrame{0}".format(res)



def slotQLF(infile, outfile):
    with open(infile, 'r', encoding='utf-8') as fr:
        with open(outfile, 'w', encoding='utf-8') as fw:
            for line in fr:
                arr = line.strip().split('\t')
                if(len(arr)) != 2:
                    continue
                query = arr[0]
                slotTag = arr[1]
                slotFormatRes = slotFormat(slotTag)
                fw.write("{0}\t{1}\n".format(query, slotFormatRes))

def main():
    if(len(sys.argv) == 1):
        infile = "C:/Code/data/inputSlotTagging.txt"
        outfile = "C:/Code/data/watch.tsv"
    else:
        infile = sys.argv[1]
        outfile = sys.argv[2]
#    fakeQLF(infile, outfile)
    slotQLF(infile, outfile)



if __name__ == "__main__":
    main()