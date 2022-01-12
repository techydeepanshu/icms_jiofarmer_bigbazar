export const aahubarahUsa=(arr,options)=>{
    console.log("IN APPLY FILTER data");
    console.log("au_arr : ",arr);
    console.log("au_options : ",options);
    let result=[];
    for(let i=0;i<arr.length;i++){
      let data=arr[i];
      console.log("DATA");
      console.log("au_data",data);
  
      for(var prop in data){
        console.log("PROP");
        console.log("au_index : ",prop);
        console.log("au_object : ",Object.prototype.hasOwnProperty.call(data,prop));
  
        if (Object.prototype.hasOwnProperty.call(data,prop)){
          let str=convertRowToString(data[prop]);
          console.log("STR");
          console.log("au_str : ",str);
          str=str.replace(options.notAllowed, '');
          str=str.replace(/ +(?= )/g,'');
          let a = str.substr(0,12).replace(".","");
          let b = str.substr(12);
          str=a.concat(b);
          str=str.replace(":",'.');
          str=str.trimStart();
          str=str.trimEnd();
          console.log("au_final str : ",str);
          console.log("au_check_by_regex",(options.regex).test(str));
  
          if((options.regex).test(str)){
            let obj={};
  
            for(let j=0;j<options.header.length;j++){
              console.log("au_index_options.header.length : ",j);
              let x="";
  
              if(Array.isArray(options.body[j])){
                let index=str.search(options.body[j][1]);
                console.log("au_index_options.body[j][1]  : ",index);
                x=str.substr(0,index);       // ***
                str=str.substr(x.length);    // ***
                console.log("au_x : ",x," au_str : ",str);
              }else{
                let y=str.split(" ");
                console.log("au_y : ",y);
                str="";
                for(let k=0;k<options.body[j];k++)x+=y[k]+" ";
                console.log("au_x_array : ",x);
                for(let k=options.body[j];k<y.length;k++)str+=y[k]+" ";
                console.log("au_str_array : ",str);
              }
              x=x.trimStart();
              x=x.trimEnd();
              str=str.trimStart();
              str=str.trimEnd();
              console.log(x);
              console.log(str);
              obj[options.header[j]]=x.toUpperCase();
              console.log("au_x.toUpperCase()",x.toUpperCase());
              console.log("obj[options.header[j]] : ",obj[options.header[j]]);
            }
            console.log(obj);
            result.push(obj);
          }
        }
      }
    }
    console.log("IN APPLY FILTER");
    console.log("au_result",result);
    console.log(result);
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