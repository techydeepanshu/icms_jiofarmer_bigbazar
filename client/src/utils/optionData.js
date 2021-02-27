export const optionData={
  "advance-foods":{
    regex:/^[0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qty","description","unitPrice","extendedPrice"],
    body:[1,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1]
  },
  "chetak":{
<<<<<<< Updated upstream:client/src/utils/optionData.js
    regex:/^[0-9]+ [0-9]+ CAS [A-Z0-9]+ .*\([0-9]+\) [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qtyOrdered","qty","itemNo","description","unitPrice","extendedPrice"],
    body:[1,1,2,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1]
=======
    regex:/^[0-9]+ [A-Z]+ [A-Z0-9]+ .+ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/,
    header:["qtyShipped","itemNo","description","unitPrice","extendedPrice"],
    body:[1,2,[0,/ [0-9]+\.[0-9]+ [0-9]+\.[0-9]+$/],1,1]
>>>>>>> Stashed changes:b/clientside/src/optionData.js
  },
  "sea-mark":{
    
  }
}