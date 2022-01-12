import { applyFilter,emptyColumn } from "./filter";
import { krishnaFoods } from "./invoice-filters/krishna-foods";
import { aahubarahUsa } from "./invoice-filters/aahubarah-usa";
import { optionData } from "./optionData";
import {dropdownOptions} from "./invoiceList";
export const chooseFilter = (invoiceName, data) => {
  console.log("IN CHOOSE FILTER");
  console.log("invoiceNane : ",invoiceName); 
  console.log("my data is : ",data);   // filter by python

  const newData=emptyColumn(data);
  
  console.log("newData : ",newData);
  console.log("dropoption : ",dropdownOptions)
  
  if(invoiceName==="krishna-foods")return krishnaFoods(Object.values(data[0]));

  
  for(let i=0;i<dropdownOptions.length;i++){
      console.log("dropdownOption [i]",dropdownOptions[i])
    

    if(invoiceName===dropdownOptions[i].slug) {
      
      console.log("dropdownOption [i]",dropdownOptions[i]);
      console.log("dropdownOptions[i].emptyColumn",dropdownOptions[i].emptyColumn);
      if(invoiceName==="aahubarah-usa") return aahubarahUsa(dropdownOptions[i].emptyColumn?newData:data, optionData[dropdownOptions[i].slug]);
      
      return applyFilter(dropdownOptions[i].emptyColumn?newData:data, optionData[dropdownOptions[i].slug]);
    }
  }
}