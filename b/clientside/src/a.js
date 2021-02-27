const applyFilter=(data,options)=>{
  let result=[];
  for(var prop in data){
    if (Object.prototype.hasOwnProperty.call(data,prop)){
      let str=convertRowToString(data[prop]);
      str=str.replace(/[`~!@#%^&=:;'<>?,\*]/gi, '');
      str=str.replace(/ +(?= )/g,'');
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
          obj[options.header[j]]=x;
        }
        result.push(obj);
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
let options={
  regex:/^[0-9]+ [0-9]+ d (IBCO|OTH) [0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
  header:["qtyOrdered","itemNo","description","a","b","c","unitPrice","extendedPrice"],
  body:[1,1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1,1,1]
};
console.log(applyFilter({1:{1:" ",2:" 2 2 CAS  AM20 NO RETURN Amul ACCEPTED Chees Slice 7oz (30)  74.50 149.00"}},options));
