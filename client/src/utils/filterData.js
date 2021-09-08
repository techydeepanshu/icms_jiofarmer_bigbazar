import { applyFilter,emptyColumn } from "./filter";
import { krishnaFoods } from "./invoice-filters/krishna-foods";
import { optionData } from "./optionData";
import {dropdownOptions} from "./invoiceList";
export const chooseFilter = (invoiceName, data) => {
  console.log("IN CHOOSE FILTER");
  console.log(invoiceName);
  console.log(data);

  const newData=emptyColumn(data);
  
  console.log(newData);
  
  if(invoiceName==="krishna-foods")return krishnaFoods(Object.values(data[0]));
  for(let i=0;i<dropdownOptions.length;i++){
    
    if(invoiceName===dropdownOptions[i].slug) {
      
      console.log(dropdownOptions[i]);
      console.log(dropdownOptions[i].emptyColumn);
      
      return applyFilter(dropdownOptions[i].emptyColumn?newData:data, optionData[dropdownOptions[i].slug]);
    }
  }
}