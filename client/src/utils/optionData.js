export const optionData={
  "advance-foods":{
    regex:/^[0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","description","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "chetak":{
    regex:/^[0-9]+ [A-Z]+ [A-Z0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","itemNo","description","unitPrice","extendedPrice"],
    body:[1,2,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "sea-mark":{
    regex:/^[0-9]+ [0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","itemNo","description","extra","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "best-foods":{
    regex:/^[0-9]+ .+ [A-Z]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["itemNo","description","unit","qty","unitPrice","extendedPrice"],
    body:[1,[0,/ [A-Z]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "joy-gourment-foods":{
    regex:/^.+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["itemNo","description","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "katzam-foods":{
    regex:/^[0-9]{2}\/[0-9]{2}\/[0-9]{2} [0-9]+ [0-9]+ .+ [A-Z]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["date","ticket","qty","description","origin","unitPrice","extendedPrice"],
    body:[1,1,1,[0,/ [A-Z]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "krishna-foods":{

  },
  "baroody":{
    regex:/^.+ [0-9]+(\.|\,)[0-9]+ [0-9]+(\.|\,)[0-9]+$/,
    header:["description","unitPrice","extendedPrice"],
    body:[[0,/ [0-9]+(\.|\,)[0-9]+ [0-9]+(\.|\,)[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?\*]/gi
  },//replace , by . and use empty column
  "east-end":{
    regex:/^[A-Z0-9]+ .+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["itemNo","description","qty","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "indian-spice-trading":{
    regex:/^.+ [0-9]+\.[0-9]+ (.+ |.*)[0-9]+\.[0-9]+$/,
    header:["description","unitPrice","detail","extendedPrice"],
    body:[[0,/ [0-9]+\.[0-9]+ (.+ |.*)[0-9]+\.[0-9]+$/],1,[0,/ [0-9]+\.[0-9]+$/],1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },//use empty column
  "grocer-mill":{
    regex:/^.+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["description","qty","unitPrice","extendedPrice"],
    body:[[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },//use empty column
  "meenaxi-enterprise":{
    regex:/^.+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["description","unitPrice","extendedPrice"],
    body:[[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },//use empty column
  "rajbhog-food":{
    regex:/^[0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [A-Z0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qtyOrdered","qty","itemNo","description","detail","unitPrice","extendedPrice"],
    body:[1,1,1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "moda-food":{
    regex:/^.+ [0-9]+ [0-9]+\.[0-9]+ [0-9].+$/,
    header:["description","qty","unitPrice","extendedPrice"],
    body:[[0,/ [0-9]+ [0-9]+\.[0-9]+ [0-9].+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:();'<>?,\*]/gi
  },
  "us-gourmet-food":{
    regex:/^.+ [A-Z]+: [0-9]+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["description","itemNo","qty","unitPrice","extendedPrice"],
    body:[[0,/ [A-Z]+: [0-9]+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],[0,/ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=;'<>?,\*]/gi
  },
  "delight-food":{
    regex:/^.+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["itemNo","description","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },//use empty column
  "jalaram-produce":{
    regex:/^.+ [0-9]+ [a-zA-Z]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["description","qty","detail","unitPrice","extendedPrice"],
    body:[[0,/ [0-9]+ [a-zA-Z]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "vijay-food":{
    regex:/^[0-9]+ .+ [A-Z0-9]+ [0-9]+\.[0-9]+ [0-9]+$/,
    header:["qty","description","itemNo","unitPrice","extendedPrice"],
    body:[1,[0,/ [A-Z0-9]+ [0-9]+\.[0-9]+ [0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "radhey-food":{
    regex:/^[0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","description","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "vintage-food":{
    regex:/^[0-9]+ [a-z]+ [0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","unit","itemNo","description","unitPrice","extendedPrice"],
    body:[1,1,1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "delight-distribution":{
    regex:/^.+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["description","qty","unitPrice","extendedPrice"],
    body:[[0,/ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "dsa-snacks":{
    regex:/^.+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["description","qty","unitPrice","extendedPrice"],
    body:[[0,/ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "dawn-food":{
    regex:/^[0-9]+ [0-9]+ .+ [A-Z]+ [A-Z]+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qtyOrdered","qty","description","tax","detail","material","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [A-Z]+ [A-Z]+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  }
}