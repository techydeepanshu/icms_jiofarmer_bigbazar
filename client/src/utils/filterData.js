import { applyFilter,emptyColumn } from "./filter";
import { krishnaFoods } from "./invoice-filters/krishna-foods";
import { optionData } from "./optionData";
import {dropdownOptions} from "./invoiceList";
export const chooseFilter = (invoiceName, data) => {
  const newData=emptyColumn(data);
  if(invoiceName==="krishna-foods")return krishnaFoods(Object.values(data[0]));
  for(let i=0;i<dropdownOptions.length;i++){
    if(invoiceName===dropdownOptions[i].slug)
      return applyFilter(dropdownOptions[i].emptyColumn?newData:data, optionData[dropdownOptions[i].slug]);
  }
}