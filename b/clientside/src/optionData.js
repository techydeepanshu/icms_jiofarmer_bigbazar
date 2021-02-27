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
    regex:/^[0-9]+ [0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","itemNo","description","extra","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1]
  },
  "best-foods":{
    regex:/^[0-9]+ .+ [A-Z]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["itemNo","description","unit","qty","unitPrice","extendedPrice"],
    body:[1,[0,/ [A-Z]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1,1]
  },
  "joy-gourment-foods":{

  },
  "katzam-foods":{

  },
  "krishna-foods":{

  },
}