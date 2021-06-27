const arr=[",CAS",",PK",",BAG",",TRY"];
const folderPath="./chetak_aws";
const destFilePath="./output.csv";
const fs =require('fs');
let str="";
let filenames = fs.readdirSync(folderPath);
filenames.forEach(file => {
  let data = fs.readFileSync(folderPath+"/"+file, 'utf8').split("\n");
  for(let i=0;i<data.length;i++){
    let row=data[i];
    let flag=true;
    for(let j=0;j<arr.length;j++){
      if(row.indexOf(arr[j])!==-1){
        row=row.substring(row.indexOf(arr[j]));
        flag=false;
        break;
      }
    }
    if(flag)continue;
    str+=row+"\n";
  }
})
str=str.split("\n");
str.sort((a,b)=>{
  let x=a.split(",");
  let y=b.split(",");
  return x.length-y.length;
})
let data="";
for(let i=0;i<str.length;i++)data+=str[i]+"\n";
fs.writeFileSync(destFilePath,data);