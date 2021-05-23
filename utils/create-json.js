const fs =require('fs');
const spawn=require('child_process').spawnSync;
const dir="/home/dell/v/a/";
function find(str){
  const newProcess=spawn('python',[dir+"script.py",str,1,dir+"csv/Hicksville.csv"]);
  let res=newProcess.stdout.toString().trim().split("@@@");
  return {name:res[4],code:res[1],sku:res[0]};
}
fs.readdir(dir+"model/",function(err,files){
    files.forEach(function(file){
      let json=require(dir+"model/"+file);
      for(var prop in json){
        if (Object.prototype.hasOwnProperty.call(json,prop)){
          const obj=find(json[prop]["Description"]);
          json[prop]["POS"]=obj.name;
          json[prop]["Barcode"]=obj.code;
          json[prop]["PosSKU"]=obj.sku;
        }
      }
      let data=JSON.stringify(json,null,2);
      fs.writeFileSync(dir+"new-model/"+file,data);
      console.log(`${file} completed`);
    });
});