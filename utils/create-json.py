import os
import nltk
import re
import pandas as pd
import json
from fuzzywuzzy import fuzz
from nltk.stem.porter import PorterStemmer
dataset=pd.read_csv("../csv/Hicksville.csv",delimiter=',')
z=dataset.iloc[:,1].values
y=dataset.iloc[:,2].values
ps=PorterStemmer()
def find(item):
  item=re.sub('[^a-zA-Z]',' ',item)
  item=item.lower()
  item=item.split()
  item=set(item)
  item=[ps.stem(word) for word in item]
  item.sort()
  item=' '.join(item)
  index=[]
  for i in range(0,len(z)):
    if type(z[i]) == str :
      x=fuzz.partial_ratio(item,z[i])
      index.append([x,i])
  index=sorted(index,key=lambda x:x[0],reverse=True)
  xy=y[index[0][1]]
  xy.strip()
  xy=xy.split("@@@")
  return xy
arr=os.listdir("../model")
for i in range(0,len(arr)):
  with open('../model/'+arr[i], 'r') as openfile:
    json_object = json.load(openfile)
  for x in json_object:
    xx=find(json_object[x]["Description"])
    json_object[x]["POS"]=xx[4]
    json_object[x]["Barcode"]=xx[1]
    json_object[x]["PosSKU"]=xx[0]
    json_object[x]["Size"]=xx[13]
    json_object[x]["SellingPrice"]=xx[15]
    json_object[x]["Department"]=xx[11]
    json_object[x]["SellerCost"]=xx[7]
    print(xx[i])
  with open('../new-model/'+arr[i], "w") as outfile:
    json.dump(json_object, outfile,indent=4)
  print(arr[i]+" completed")