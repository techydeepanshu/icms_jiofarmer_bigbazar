import nltk
import re
import pandas as pd
from nltk.stem.porter import PorterStemmer
dataset=pd.read_csv('/home/dell/v/a/csv/Maharaja_Hicksville.csv',delimiter=',')
y=dataset.iloc[:,4].values
z=[]
for i in range(0,len(y)):
  if y[i].find('E+') == -1:
    ps=PorterStemmer()
    str=re.sub('[^a-zA-Z]',' ',y[i])
    str=str.lower()
    str=str.split()
    str=set(str)
    str=[ps.stem(word) for word in str]
    str.sort()
    str=' '.join(str)
    z.append([str,y[i]])
csv= pd.DataFrame(z,columns=['val','name'])
csv.to_csv('/home/dell/v/a/csv/Hicksville.csv')
