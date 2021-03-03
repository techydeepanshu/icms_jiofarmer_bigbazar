import { applyFilter,emptyColumn } from "./filter";
import { chetak } from "./invoice-filters/chetak";
import { krishnaFoods } from "./invoice-filters/krishna-foods";
import { optionData } from "./optionData";

export const chooseFilter = (invoiceName, data) => {
  // console.log("Invoice to be filtered", invoiceName)
  const newData=emptyColumn(data)
  switch (invoiceName) {
    case "chetak":
      // let ;
      return applyFilter(newData, optionData["chetak"]);
    case "krishna-foods":
      return krishnaFoods(Object.values(data[0]));
    case "advance-foods":
      return applyFilter(data, optionData["advance-foods"])
    case "sea-mark":
      return applyFilter(data, optionData["sea-mark"])
    case "best-foods":
      // let newData=emptyColumn(data);
      return applyFilter(newData, optionData["best-foods"]);
    case "joy-gourment-foods":
      // let newData=emptyColumn(data);
      return applyFilter(newData, optionData["joy-gourment-foods"]);
    case "katzam-foods":
      return applyFilter(data, optionData["katzam-foods"])
    default:
      return chetak(data);
  }
}