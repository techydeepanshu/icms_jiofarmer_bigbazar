import nltk
import re
import pandas as pd
from nltk.stem.porter import PorterStemmer
dataset=pd.read_csv('/home/dell/v/a/csv/Maharaja_Export.csv',delimiter=',')
y=dataset.iloc[:,0:].values
z=[]
for i in range(0,len(y)):
  if y[i][3].find('E+') == -1:
    ps=PorterStemmer()
    s=re.sub('[^a-zA-Z]',' ',y[i][3])
    s=s.lower()
    s=s.split()
    s=set(s)
    if len(s) <= 1:
      continue
    s=[ps.stem(word) for word in s]
    s.sort()
    s=' '.join(s)
    x=str(y[i][0])
    for j in range(1,len(y[i])):
      x=x+"@@@"+str(y[i][j])
    z.append([s,x])
csv= pd.DataFrame(z,columns=['val','name'])
csv.to_csv('/home/dell/v/a/csv/Export.csv')
