export const applyFilter=(arr,options)=>{
  let result=[];
  for(let i=0;i<arr.length;i++){
    let data=arr[i];
    for(var prop in data){
      if (Object.prototype.hasOwnProperty.call(data,prop)){
        let str=convertRowToString(data[prop]);
        str=str.replace(options.notAllowed, '');
        str=str.replace(/ +(?= )/g,'');
        str=str.trimStart();
        str=str.trimEnd();
        if((options.regex).test(str)){
          let obj={};
          for(let j=0;j<options.header.length;j++){
            let x="";
            if(Array.isArray(options.body[j])){
              let index=str.search(options.body[j][1]);
              x=str.substr(0,index);
              str=str.substr(x.length);
            }else{
              let y=str.split(" ");
              str="";
              for(let k=0;k<options.body[j];k++)x+=y[k]+" ";
              for(let k=options.body[j];k<y.length;k++)str+=y[k]+" ";
            }
            x=x.trimStart();
            x=x.trimEnd();
            str=str.trimStart();
            str=str.trimEnd();
            obj[options.header[j]]=x.toUpperCase();
          }
          result.push(obj);
        }
      }
    }
  }
  return result;
}
const convertRowToString=(obj)=>{
  let str="";
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj,prop)){
      str+=obj[prop]+" ";
    }
  }
  //remove multiple instances of multiple space with single space
  str=str.replace(/ +(?= )/g,'');
  str=str.trimStart();
  str=str.trimEnd();
  return str;
}
export const emptyColumn=(arr)=>{
  let data=[];
  for(let i=0;i<arr.length;i++){
    let obj={};
    let table=arr[i];
    for(var prop in table){
      if (Object.prototype.hasOwnProperty.call(table,prop)){
        let str=table[prop][1];
        str=str.replace(/[`~!@#\$%^&=:;'<>?,\*]/gi, '');
        str=str.replace(/ +(?= )/g,'');
        str=str.trimStart();
        str=str.trimEnd();
        let b=str.split(" ");
        str="";
        for(let j=1;j<b.length;j++)str+=b[j];
        let o=Object.assign({},table[prop]);
        o[1]=str;
        obj[prop]=o;
      }
    }
    data.push(obj);
  }
  return data;
}