const fs =require('fs');
const spawn=require('child_process').spawnSync;
const dir="./";
function find(str){
  const newProcess=spawn('python',[dir+"script.py",,1,dir+"csv/Hicksville.csv"]);
  let res=newProcess.stdout.toString().trim().split("@@@");
  console.log(res);
  return {name:res[4],code:res[1],sku:res[0]};
}
find();