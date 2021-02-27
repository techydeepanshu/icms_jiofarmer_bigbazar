import { applyFilter } from "./filter";
import { chetak } from "./invoice-filters/chetak";
import { krishnaFoods } from "./invoice-filters/krishna-foods";
import { optionData } from "./optionData";

export const chooseFilter = (invoiceName, data) => {
  console.log("Invoice to be filtered", invoiceName)
  switch (invoiceName) {
    case "chetak":
      return applyFilter(data, optionData["chetak"]);
    case "krishna-foods":
      return krishnaFoods(data);
    case "advance-foods":
      return applyFilter(data, optionData["advance-foods"])
    default:
      return chetak(data);
  }
}