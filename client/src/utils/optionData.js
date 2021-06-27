export const optionData={
  "aahubarah-usa":{
    regex:/^[A-Z0-9]+ [0-9]+ .+ [0-9\.]+ [0-9\.]+$/,
    header:["itemNo","qty","description","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9\.]+ [0-9\.]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*\+\-]/gi
  },
  "ny-zara-food":{
    regex:/^[0-9]+ [A-Z0-9]+ .+ [0-9\.]+ [0-9\.]+$/,
    header:["qty","itemNo","description","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9\.]+ [0-9\.]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;()'<>?,\*]/gi
  },
  "vibrant-enterprise":{
    regex:/^[0-9]+ [A-Z]+ .+ [0-9\.]+ [0-9\.]+$/,
    header:["qty","um","description","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9\.]+ [0-9\.]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;()'<>?,\*]/gi
  },
  "karison-foods":{
    regex:/^[0-9]+ .+ [0-9\.]+ [0-9\.]+$/,
    header:["qty","description","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9\.]+ [0-9\.]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;()'<>?,\*\-]/gi
  },// use empty column
  "gurme-guru":{
    regex:/^.+ [0-9\.]+ [0-9\.]+$/,
    header:["description","unitPrice","extendedPrice"],
    body:[[0,/ [0-9\.]+ [0-9\.]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;()'<>?,\*]/gi
  },// use empty column
  "katzman-berry-corp":{
    regex:/^[0-9\.]+ .+ [A-Z]+$/,
    header:["qty","description","origin"],
    body:[1,[0,/ [A-Z]+$/],1],
    notAllowed:/[`~!@#\$%^&=:;()'<>?,\*]/gi
  },
  "mels-ice-cream":{
    regex:/^.+ [A-Z0-9]+ [0-9]+ [0-9\.]+$/,
    header:["description","itemNo","ct","cost"],
    body:[[0,/ [A-Z0-9]+ [0-9]+ [0-9\.]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;()'<>?,\*]/gi
  },
  "bedessee":{
    regex:/^[A-Z0-9]+ .+ [0-9\.]+ [0-9]+ [0-9\.]+ [0-9\.]+ [0-9\.]+$/,
    header:["itemNo","description","unit","case","unitPrice","casePrice","extendedPrice"],
    body:[1,[0,/ [0-9\.]+ [0-9]+ [0-9\.]+ [0-9\.]+ [0-9\.]+$/],1,1,1,1,1],
    notAllowed:/[`~!@#\$%^&=:;()'<>?,\*]/gi
  },
  "shakti-group-usa":{
    regex:/^[0-9].+ [A-Z0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","lotNo","itemNo","description","unitPrice","extendedPrice"],
    body:[1,1,3,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "spicy-sense":{
    regex:/^[0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","itemNo","description","unitPrice","extendedPrice"],
    body:[1,3,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:();""'<>*?,\*]/gi
  },
  "on-time-distribution":{
    regex:/^[0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","itemNo","description","unitPrice","extendedPrice"],
    body:[1,3,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "pexco-inc":{
    regex:/^[0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","itemNo","description","unitPrice","extendedPrice"],
    body:[1,3,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:();""'<>*?,\*]/gi
  },
  "krishna-aahar":{
    regex:/^.+ [0-9\.]+ [0-9\.]+$/,
    header:["itemNo","description","unitPrice","extendedPrice"],
    body:[3,[0,/ [0-9\.]+ [0-9\.]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;()'<>?,\*]/gi
  },// use empty column
  "jaan-distributors":{
    regex:/^.+ [0-9\.]+ [0-9\.]+$/,
    header:["description","unitPrice","extendedPrice"],
    body:[[0,/ [0-9\.]+ [0-9\.]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;()'<>?,\*\-]/gi
  },
  "goyal-group":{
    regex:/^.+ [0-9\.]+ [0-9\.]+$/,
    header:["itemNo","description","unitPrice","extendedPrice"],
    body:[2,[0,/ [0-9\.]+ [0-9\.]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;()'<>?,\*]/gi
  },// use empty column
  "new-reliance-traders":{
    regex:/^[A-Z0-9-]+ .+ [0-9\.]+ [A-Z]+ [0-9\.]+$/,
    header:["itemNo","description","unitPrice","unit","extendedPrice"],
    body:[1,[0,/ [0-9\.]+ [A-Z]+ [0-9\.]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;()'<>?,\*\/]/gi
  },// use empty column
  "usa-halal-foods":{
    regex:/^[A-Z]+ .+ [0-9]+ [0-9]+ [0-9\.]+ [0-9\.]+$/,
    header:["itemNo","description","cases","lb","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+ [0-9]+ [0-9\.]+ [0-9\.]+$/],1,1,1,1],
    notAllowed:/[`~!@#\$%^&=:;()'<>?,\*]/gi
  },
  "turkana-food":{
    regex:/^[0-9]+ [A-Z]+ [A-Z]+ .+ [0-9]+ [0-9]+ [0-9\.]+ [0-9\.]+$/,
    header:["itemNo","class","brand","description","barcode","qty","unitPrice","extendedPrice"],
    body:[1,1,1,[0,/ [0-9]+ [0-9]+ [0-9\.]+ [0-9\.]+$/],1,1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "temin-distribution":{
    regex:/^.+ [0-9\.]+ [0-9\.]+ [0-9\.]+$/,
    header:["description","qty","unitPrice","extendedPrice"],
    body:[[0,/ [0-9\.]+ [0-9\.]+ [0-9\.]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "surati":{
    regex:/^[0-9\.]+ .+ [0-9\.]+ [A-Z]+ [0-9\. ]+$/,
    header:["qty","description","unitPrice","unit","discount"],
    body:[1,[0,/ [0-9\.]+ [A-Z]+ [0-9\. ]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "shata-traders":{
    regex:/^.+ [0-9]+ [0-9\.]+ [0-9\.]+$/,
    header:["description","qty","unitPrice","extendedPrice"],
    body:[[0,/ [0-9]+ [0-9\.]+ [0-9\.]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },// use empty column
  "vadilal":{
    regex:/^[0-9]+ [0-9]+ .+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["sno","itemNo","description","qty","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "rollin-dairy":{
    regex:/^[0-9]+ [0-9\.]+ .+ [0-9]+ [0-9\.]+$/, 
    header:["itemNo","del","description","cs","extendedPrice"],
    body:[1,1,[0,/ [0-9]+ [0-9\.]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*\-]/gi
  },
  "putul-distributors":{
    regex:/^[0-9]+ [A-Z 0-9]+ .+ [0-9\.B]+ [0-9\.]+ [0-9\.]+$/, 
    header:["qty","itemNo","description","rate","UnitPrice","extendedPrice"],
    body:[1,3,[0,/ [0-9\.B]+ [0-9\.]+ [0-9\.]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "referred-beverage":{
    regex:/^[0-9]+ [0-9]+ .+ [0-9\.]+ [0-9\.]+$/, 
    header:["qty","itemNo","description","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9\.]+ [0-9\.]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "pams-creations":{
    regex:/^[0-9]+ .+ [0-9]+ [0-9]+$/, 
    header:["qty","description","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+ [0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*\-]/gi
  },
  "pgl-trade":{
    regex:/^[A-Z0-9]+ .+ [0-9]+ [0-9\.]+ [0-9\.]+$/,
    header:["sku","description","qty","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+ [0-9\.]+ [0-9\.]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "nirav-indian-groceries":{
    regex:/^.+ [0-9\.]+ [A-Z]+ [0-9\.]+ [0-9\.]+$/,
    header:["description","qty","measure","unitPrice","extendedPrice"],
    body:[[0,/ [0-9\.]+ [A-Z]+ [0-9\.]+ [0-9\.]+$/],1,1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "new-york-wholesale":{
    regex:/^.+ [0-9]+ [0-9\.]+ [0-9\.]+$/,
    header:["description","qty","unitPrice","extendedPrice"],
    body:[[0,/ [0-9]+ [0-9\.]+ [0-9\.]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "mr-pickle":{
    regex:/^[0-9]+ [A-Z]+ .+ [0-9\.]+ [0-9\.]+$/,
    header:["qty","itemNo","description","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9\.]+ [0-9\.]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "leblon-foods":{
    regex:/^[0-9]+ [0-9]+ .+ [0-9]+ [0-9\.]+ [0-9\.]+$/,
    header:["itemNo","upCode","description","qty","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9]+ [0-9\.]+ [0-9\.]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "krishna-food-corp":{
    regex:/^[A-Za-z ]+ .+ [0-9\.]+ [0-9\.]+$/,
    header:["itemNo","description","unitPrice","extendedPrice"],
    body:[2,[0,/ [0-9\.]+ [0-9\.]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },//use empty column
  "km-distribution-usa":{
    regex:/^[0-9]+ [A-Z-0-9]+ .+ [0-9\.]+ [0-9\.]+$/,
    header:["qty","itemNo","description","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9\.]+ [0-9\.]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "jcw-import-and-export":{
    regex:/^[0-9]+ [A-Z0-9-]+ .+ [0-9\.]+ [0-9\.T]+$/,
    header:["qty","itemNo","description","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9\.]+ [0-9\.T]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "family-five":{
    regex:/^.+ [0-9]+ [0-9\.]+ [0-9\.]+$/,
    header:["description","qty","unitPrice","extendedPrice"],
    body:[[0,/ [0-9]+ [0-9\.]+ [0-9\.]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "empire-food-importers":{
    regex:/^.+ [0-9]+ [0-9\.]+$/,
    header:["description","qty","unitPrice"],
    body:[[0,/ [0-9]+ [0-9\.]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "american-pure-honey":{
    regex:/^[A-Z0-9]+ .+ [0-9\.]+ [0-9\.]+$/,
    header:["itemNo","description","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9\.]+ [0-9\.]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*\-]/gi
  },//use empty column
  "galil":{
    regex:/^[0-9-]+ [0-9]+ [A-Z]+ [0-9\./]+ [A-Z]+ .+ [0-9]+ [0-9\.]+ [0-9\.]+$/,
    header:["itemNo","qty","extra","pack","description","unit","unitPrice","extendedPrice"],
    body:[1,1,1,2,[0,/ [0-9]+ [0-9\.]+ [0-9\.]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "hellenic":{
    regex:/^.+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["description","qty","unitPrice","extendedPrice"],
    body:[[0,/ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "hill-top-farms":{
    regex:/^.+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["description","qty","unitPrice","extendedPrice"],
    body:[[0,/ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "house-of-spices":{
    regex:/^[0-9]+ [0-9A-Z]+ .+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["sno","itemNo","description","qty","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "indian-food-and-spices":{
    regex:/^[0-9.]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","description","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "i-sifol":{
    regex:/^[0-9]+\.[0-9]+ [A-Z0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","itemNo","description","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "ritesource-corp":{
    regex:/^.+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["description","qty","unitPrice","extendedPrice"],
    body:[[0,/ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "koryeo":{
    regex:/^[A-Z0-9]+ [0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["itemNo","qty","description","unitPrice","lb","extendedPrice"],
    body:[1,1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "krinos-foods":{
    regex:/^[0-9A-Z]+ [0-9]+ .+ [0-9]+\.[0-9]+ [A-Z]+ [0-9]+\.[0-9]+$/,
    header:["itemNo","qty","description","unitPrice","per","extendedPrice"],
    body:[1,1,[0,/ [0-9]+\.[0-9]+ [A-Z]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "loumidis-foods":{
    regex:/^[0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [A-Z]+ [A-Z0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qtyOrdered","qty","tax","itemNo","description","unitPrice","extendedPrice"],
    body:[1,1,1,1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:();""'<>*?,\*]/gi
  },
  "maharaja-food-importers":{
    regex:/^[A-Z0-9]+ .+ [0-9.]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["itemNo","description","qty","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9.]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:();""'<>*?,\*]/gi
  },
  "nassau-candy":{
    regex:/^[0-9]+ [A-Z]+ [0-9]+ [0-9]+ .+ [0-9]+\.[0-9]+ [A-Z]+ [0-9]+\.[0-9]+$/,
    header:["qtyOrdered","unit","qty","itemNo","description","unitPrice","Unit","extendedPrice"],
    body:[1,1,1,1,[0,/ [0-9]+\.[0-9]+ [A-Z]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:();""'<>*?,\*]/gi
  },
  "nupur-trading":{
    regex:/^[0-9]+ [A-Z0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+ [A-Z0-9()]+ [0-9]+\.[0-9]+$/,
    header:["sno","itemNo","description","unitPrice","qty","extra","extendedPrice"],
    body:[1,1,[0,/ [0-9]+\.[0-9]+ [0-9]+ [A-Z0-9()]+ [0-9]+\.[0-9]+$/],1,1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "optima-foods":{
    regex:/^[A-Z0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [A-Z]+ [0-9/.]+ [A-Za-z]+ .+ [A-Z]+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["itemNo","qtyOrdered","qty","uom","packSize","description","brand","unit","unitPrice","extendedPrice"],
    body:[1,1,1,1,2,[0,/ [A-Z]+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1,1],
    notAllowed:/[`~!@#\$%^&=:();/""'<>*?,\*]/gi
  },
  "gaint-farm":{
    regex:/^.+ [0-9]+ [0-9]+$/,
    header:["description","unitPrice","extendedPrice"],
    body:[[0,/ [0-9]+ [0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\/\*\+\-]/gi
  },//use empty column
  "farmers-choice-dairy":{
    regex:/^.+ [0-9]+ [0-9\.]+$/,
    header:["description","pack","extendedPrice"],
    body:[[0,/ [0-9]+ [0-9\.]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\/\*\+\-]/gi
  },
  "duty-free-produce":{
    regex:/^[0-9]+ .+ [0-9]+ [0-9]+$/,
    header:["sno","qty","description","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9]+ [0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\/\*\+\-]/gi
  },
  "crestwood-farms":{
    regex:/^.+ [0-9]+ [0-9]+ [0-9\.]+$/,
    header:["description","case","qty","extendedPrice"],
    body:[[0,/ [0-9]+ [0-9]+ [0-9\.]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\/\*\+\-]/gi
  },
  "cream-o-land":{
    regex:/^[0-9]+ .+ [0-9]+\/ [0-9]+ [0-9]+ [0-9\.]+ [0-9\.]+$/,
    header:["itemNo","description","case","qty","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+\/ [0-9]+ [0-9]+ [0-9\.]+ [0-9\.]+$/],2,1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*\+\-]/gi
  },
  "big-apple-distributors":{
    regex:/^.+ [0-9]+ [0-9\.]+ [0-9\.]+$/,
    header:["itemNo","description","qty","unitPrice","extendedPrice"],
    body:[2,[0,/ [0-9]+ [0-9\.]+ [0-9\.]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*\+\-]/gi
  },
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
  },//use empty column
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
  },//use empty column
  "joy-gourment-foods":{
    regex:/^.+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["itemNo","description","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },//use empty column
  "katzam-foods":{
    regex:/^[0-9]{2}\/[0-9]{2}\/[0-9]{2} [0-9]+ [0-9]+ .+ [A-Z]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["date","ticket","qty","description","origin","unitPrice","extendedPrice"],
    body:[1,1,1,[0,/ [A-Z]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
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
  },
  "aliments":{
    regex:/^.+ [0-9]+ [0-9]+\.[0-9]+ [a-z]+ [0-9]+\.[0-9]+$/,
    header:["description","qty","unitPrice","extra","extendedPrice"],
    body:[[0,/ [0-9]+ [0-9]+\.[0-9]+ [a-z]+ [0-9]+\.[0-9]+$/],1,1,1,1],
    notAllowed:/[`~!@#\$%^&=:;/'<>?,\*]/gi
  },
  "bartlett-dairy":{
    regex:/^[0-9]+ .+ [0-9]+ [0-9]+ [0-9]+\.[0-9]+$/,
    header:["itemNo","description","case","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+ [0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;/'<>?,\*]/gi
  },
  "amtrade":{
    regex:/^[0-9]+ [A-Z]+ [A-Z0-9]+ [A-Z ]+ .+ [A-Z0-9a-z]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","ctn","extra","type","description","size","unitPrice","extendedPrice"],
    body:[1,1,1,2,[0,/ [A-Z0-9a-z]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;/'<>?,\*]/gi
  },
  "dara-food":{
    regex:/^[0-9]+ .+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["itemNo","description","qty","each","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "baraka-cold":{
    regex:/^.+ [0-9].+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["description","qty","unitPrice","extendedPrice"],
    body:[[0,/ [0-9].+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "restwood-farms":{
    regex:/^.+ [0-9]+ [0-9]+ [0-9]+\.[0-9]+$/,
    header:["description","case","qty","extendedPrice"],
    body:[[0,/ [0-9]+ [0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:/;'<>?,\*]/gi
  },
  "babco-foods":{
    regex:/^[0-9]+\.[0-9]+ [A-Z0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","sku","description","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;'<>?,\*]/gi
  },
  "adelman-foods":{
    regex:/^[0-9]+ .+ [0-9A-Za-z]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","description","packing","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9A-Za-z]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;/'<>?,\*]/gi
  },
  "anns-eco-store":{
    regex:/^[A-Z]+ [A-Z0-9]+ .+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["itemNo","description","qty","unitPrice","extendedPrice"],
    body:[2,[0,/ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "anmol-distributors":{
    regex:/^[0-9.]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","description","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "bakemark":{
    regex:/^[A-Z0-9]+ [0-9]+\.[0-9]+ [A-Z]+ [A-Z]+ .+ [0-9]+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["slot","qty","unit","brand","description","size","itemNo","unitPrice","extendedPrice"],
    body:[1,1,1,1,[0,/ [0-9]+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1,1],
    notAllowed:/[`~!@#\$%^&=:/;""'<>*?,\*]/gi
  },
  "vidyas":{
    regex:/^[0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","description","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "unique-importer":{
    regex:/^[0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","description","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "two-brother-wholesale":{
    regex:/^[0-9.]+ [0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","itemNo","description","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "symco-distributor":{
    regex:/^[0-9]+ [A-Z.]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","itemNo","description","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "spicy-world":{
    regex:/^[0-9]+\.[0-9]+ [A-Z0-9]+ .+ [A-Z]+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","itemNo","description","unit","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [A-Z]+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],2,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "solid-trade":{
    regex:/^[A-Z0-9-]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["itemNo","description","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
     notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },//use empty column
  "slaughter-house":{
    regex:/^[0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+\.[0-9]+$/,
    header:["qty","description","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "shreeji-jay":{
    regex:/^.+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["description","qty","unitPrice","extendedPrice"],
    body:[[0,/ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "shine-foods":{
    regex:/^.+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["description","qty","unitPrice","extendedPrice"],
    body:[[0,/ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "sankaj":{
    regex:/^[0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","description","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "ron-foods":{
    regex:/^.+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["description","qty","unitPrice","extendedPrice"],
    body:[[0,/ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "priya-foods":{
    regex:/^[A-Z]+ [A-Z]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["itemNo","description","unitPrice","extendedPrice"],
    body:[2,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },//use empty column
  "ranemusic":{
    regex:/^[0-9]+ [A-Z]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","itemNo","description","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "raja-foods":{
    regex:/^[0-9]+ .+ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["mpn","description","qty","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
  "produce-n-more":{
    regex:/^[0-9]+ [0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","itemNo","description","unitPrice","extendedPrice"],
    body:[1,1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1],
    notAllowed:/[`~!@#\$%^&=:;""'<>*?,\*]/gi
  },
}