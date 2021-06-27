const fs =require('fs');
const data = fs.readFileSync("./merge-chetak-edit.csv", 'utf8').split("\n");
let x={};
for(let i=1;i<data.length;i++){
  let arr=data[i].split(",");
  arr[0]=arr[0].replace(/ +(?= )/g,'');
  arr[0]=arr[0].trimStart();
  arr[0]=arr[0].trimEnd();
  arr[1]=arr[1].replace(/ +(?= )/g,'');
  arr[1]=arr[1].trimStart();
  arr[1]=arr[1].trimEnd();
  arr[2]=arr[2].replace(/ +(?= )/g,'');
  arr[2]=arr[2].trimStart();
  arr[2]=arr[2].trimEnd();
  arr[3]=arr[3].replace(/ +(?= )/g,'');
  arr[3]=arr[3].trimStart();
  arr[3]=arr[3].trimEnd();
  arr[1]=arr[1].replace(/\([0-9]+\)/,'');
  arr[1]=arr[1].replace(/[0-9]+\)/,'');
  arr[1]=arr[1].replace(/\([0-9]+/,'');
  let obj={
    Item:arr[0],
    Description:arr[1],
    Quantity:arr[2],
    Price:arr[3]
  };
  x[arr[0]]=obj;
}
x=JSON.stringify(x,null,2);
fs.writeFileSync("./chetak-new.json",x);
