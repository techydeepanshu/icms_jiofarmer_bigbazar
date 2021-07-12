import sys
import nltk
import re
import pandas as pd
from fuzzywuzzy import fuzz
from nltk.stem.porter import PorterStemmer
item=""
total=1
dirName=sys.argv[1]
dataset=pd.read_csv(dirName,delimiter=',')
z=dataset.iloc[:,1].values
y=dataset.iloc[:,2].values

""" listY = y.tolist()
result = '$$$'.join(listY) """
""" print(result.split('$$$')[0])
print(result.split('$$$')[1])
print(result.split('$$$')[2])
 """
result = y[0]
for i in range(1,len(y)):
  result=result+"$$$"+y[i]
print(result)
sys.stdout.flush()
""" print(len(result.split('$$$'))) """
""" listY = y.tolist()
print(len(listY))

result = '$$$'.join(y)
resArr = result.split('$$$')
print(resArr[0]) """

""" ps=PorterStemmer()
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
result=y[index[0][1]]
for i in range(1,total):
  result=result+"$$$"+y[index[i][1]] """




