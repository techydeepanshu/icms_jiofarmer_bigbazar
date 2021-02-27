export const optionData={
  "advance-foods":{
    regex:/^[0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","description","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1]
  },
  "chetak":{
    regex:/^[0-9]+ [A-Z]+ [A-Z0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","itemNo","description","unitPrice","extendedPrice"],
    body:[1,2,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1]
  },
  "sea-mark":{
    
  }
}