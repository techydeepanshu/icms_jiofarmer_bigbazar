import { applyFilter,emptyColumn } from "./filter";
import { krishnaFoods } from "./invoice-filters/krishna-foods";
import { optionData } from "./optionData";
import {InvoiceMapping} from "../../../Invoice-Mapping";
export const chooseFilter = (invoiceName, data) => {
  const newData=emptyColumn(data);
  if(invoiceName==="krishna-foods")return krishnaFoods(Object.values(data[0]));
  for(let i=0;i<InvoiceMapping.length;i++){
    if(invoiceName===InvoiceMapping[i].slug)
      return applyFilter(InvoiceMapping[i].emptyColumn?newData:data, optionData[InvoiceMapping[i].slug]);
  }
}