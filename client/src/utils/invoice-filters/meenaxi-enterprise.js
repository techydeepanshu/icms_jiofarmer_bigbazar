export const meenaxiEnterprise=(arr,options)=>{
    console.log("IN APPLY FILTER data");
    console.log("me_arr : ",arr);
    console.log("me_options : ",options);
    let result=[];
    for(let i=0;i<arr.length;i++){
      let data=arr[i];
      console.log("DATA");
      console.log("me_data",data);
  
      for(var prop in data){
        console.log("PROP");
        console.log("me_index : ",prop);
        console.log("me_object : ",Object.prototype.hasOwnProperty.call(data,prop));
  
        if (Object.prototype.hasOwnProperty.call(data,prop)){
          let str=convertRowToString(data[prop]);
          console.log("STR");
          console.log("me_str : ",str);
          str=str.replace(options.notAllowed, '');
          str=str.replace(/ +(?= )/g,'');
          str=str.replace(":",'.');
          console.log("me_replace : ",str);
          str=str.replace(",",".");
          str=str.trimStart();
          str=str.trimEnd();
          console.log("me_final str : ",str);
          console.log("me_check_by_regex",(options.regex).test(str));
  
          if((options.regex).test(str)){
            let obj={};
  
            for(let j=0;j<options.header.length;j++){
              console.log("me_index_options.header.length : ",j);
              let x="";
  
              if(Array.isArray(options.body[j])){
                let index=str.search(options.body[j][1]);
                console.log("me_index_options.body[j][1]  : ",index);
                x=str.substr(0,index);       // ***
                str=str.substr(x.length);    // ***
                console.log("me_x : ",x," me_str : ",str);
              }else{
                let y=str.split(" ");
                console.log("me_y : ",y);
                str="";
                for(let k=0;k<options.body[j];k++)x+=y[k]+" ";
                console.log("me_x_array : ",x);
                for(let k=options.body[j];k<y.length;k++)str+=y[k]+" ";
                console.log("me_str_array : ",str);
              }
              x=x.trimStart();
              x=x.trimEnd();
              str=str.trimStart();
              str=str.trimEnd();
              console.log(x);
              console.log(str);
              obj[options.header[j]]=x.toUpperCase();
              console.log("me_x.toUpperCase()",x.toUpperCase());
              console.log("obj[options.header[j]] : ",obj[options.header[j]]);
            }
            console.log(obj);
            result.push(obj);
          }
        }
      }
    }
    console.log("IN APPLY FILTER");
    console.log("me_result",result);
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