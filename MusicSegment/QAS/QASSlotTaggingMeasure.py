import os
import sys
from xml.parsers.expat import ParserCreate
import json


class DefaultSaxHandler(object):
    def __init__(self, querySlot):
        self.query = ""
        self.slot_name = "O"
        self.querySlot = querySlot
        self.name = ""

    def start_element(self, name, attrs):
        self.name = name
        if name == "TextRecord" and 'query' in attrs:
            self.query = (attrs['query']).lower().strip()
            if self.query not in self.querySlot:
                self.querySlot[self.query] = {}
        elif name == "E" and 'l' in attrs:
            attr_value = attrs['l']
            self.slot_name = (attr_value).lower().strip()

    def char_data(self, text):
        if self.name == "E" and self.slot_name != "O":
            if self.slot_name not in self.querySlot[self.query]:
                self.querySlot[self.query][self.slot_name] = []
            self.querySlot[self.query][self.slot_name].append(text.lower().strip())

    def end_element(self, name):
        pass
        """
        if name == "TextRecord":
            print(self.querySlot)
        """


def loadSlotTaggingQAS(fn_QAS, querySlot_QAS):
    handler = DefaultSaxHandler(querySlot_QAS)
    parser = ParserCreate()
    parser.StartElementHandler = handler.start_element
    parser.EndElementHandler = handler.end_element
    parser.CharacterDataHandler = handler.char_data
    with open(fn_QAS, 'r', encoding='utf-8') as fr:
        parser.Parse(fr.read())

    slotTypeSet = set()
    for query, slotInfo in querySlot_QAS.items():
        slotTypeSet = slotTypeSet | set(slotInfo.keys())
    with open("C:/Code/data/slotTaggingQASTypeSet.tsv", 'w', encoding='utf-8') as fw:
       for type in slotTypeSet:
           fw.write(type + '\n')

def loadSlotTaggingOff(fn, querySlot_Off):
    with open(fn, 'r', encoding='utf-8') as fr:
        for line in fr:
            arr = line.split('\t')
            query = arr[0].lower().strip()
            slotArr = arr[1].strip().split('|')
            if query not in querySlot_Off:
                querySlot_Off[query] = {}

            for slotEle in slotArr:
                obj = json.loads(slotEle)
                if 'Type' in obj and 'Span' in obj:
                    type = obj['Type'].lower().strip()
                    span = obj['Span'].lower().strip()
                    if type not in querySlot_Off[query]:
                        querySlot_Off[query][type] = []
                    querySlot_Off[query][type].append(span)

def SameContentList(list_a, list_b):
    for ele in list_a:
        if ele.strip() == "":
            continue
        if ele not in list_b:
            return False
    return True


def SimilarityMeasure(querySlot_QAS, querySlot_Off):
    fw = open("C:/Code/data/slotTaggingDiff.tsv", 'w', encoding='utf-8')
    all_num = 0
    com_num = 0
    for query, slotOff in querySlot_Off.items():
        all_num += 1
        if query not in querySlot_QAS:
            continue
        slotQAS = querySlot_QAS[query]
        same_flag = True
        for type, spans in slotOff.items():
            if type.startswith('regex_') or type.startswith("int_") or type.startswith('cons_'):
                continue
            if type not in slotQAS:
                same_flag = False
                break
            if not SameContentList(spans, slotQAS[type]):
                same_flag = False
                break
        if same_flag:
            com_num += 1
        else:
            fw.write("{0}\tQAS:{1}\tOff:{2}\n".format(query, slotQAS, slotOff))
    if all_num != 0:
        print("all_num:{0}\tshare_num:{1}\tPre:{2}".format(all_num, com_num, float(com_num)/all_num))
    else:
        print("all_num: 0")

    fw.close()

def main():
    slotTagging_QAS = "C:/Code/data/slotTagging_QAS.tsv"
    querySlot_QAS = {}
    loadSlotTaggingQAS(slotTagging_QAS, querySlot_QAS)


    slotTagging_base = "C:/Code/data/slotTagging_base.tsv"
    querySlot_Off = {}
    loadSlotTaggingOff(slotTagging_base, querySlot_Off)

    SimilarityMeasure(querySlot_QAS, querySlot_Off)

if __name__ == "__main__":
    main()