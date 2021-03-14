import { applyFilter,emptyColumn } from "./filter";
import { chetak } from "./invoice-filters/chetak";
import { krishnaFoods } from "./invoice-filters/krishna-foods";
import { optionData } from "./optionData";

export const chooseFilter = (invoiceName, data) => {
  // console.log("Invoice to be filtered", invoiceName)
  const newData=emptyColumn(data)
  switch (invoiceName) {
    case "chetak":
      return applyFilter(newData, optionData["chetak"]);
    case "krishna-foods":
      return krishnaFoods(Object.values(data[0]));
    case "advance-foods":
      return applyFilter(data, optionData["advance-foods"])
    case "sea-mark":
      return applyFilter(data, optionData["sea-mark"])
    case "best-foods":
      return applyFilter(newData, optionData["best-foods"]);
    case "joy-gourment-foods":
      return applyFilter(newData, optionData["joy-gourment-foods"]);
    case "katzam-foods":
      return applyFilter(data, optionData["katzam-foods"]);
    case "baroody":
      return applyFilter(newData, optionData["baroody"]);
    case "east-end":
      return applyFilter(data, optionData["east-end"]);
    case "indian-spice-trading":
      return applyFilter(newData, optionData["indian-spice-trading"]);
    case "grocer-mill":
      return applyFilter(newData, optionData["grocer-mill"]);
    case "meenaxi-enterprise":
      return applyFilter(newData, optionData["meenaxi-enterprise"]);
    case "rajbhog-food":
      return applyFilter(data, optionData["rajbhog-food"]);
    case "moda-food":
      return applyFilter(data, optionData["moda-food"]);
    case "us-gourmet-food":
      return applyFilter(data, optionData["us-gourmet-food"]);
    case "delight-food":
      return applyFilter(newData, optionData["delight-food"]);
    case "jalaram-produce":
      return applyFilter(data, optionData["jalaram-produce"]);
    case "vijay-food":
      return applyFilter(data, optionData["vijay-food"]);
    case "radhey-food":
      return applyFilter(data, optionData["radhey-food"]);
    case "vintage-food":
      return applyFilter(data, optionData["vintage-food"]);
    case "delight-distribution":
      return applyFilter(data, optionData["delight-distribution"]);
    case "dsa-snacks":
      return applyFilter(data, optionData["dsa-snacks"]);
    case "dawn-food":
      return applyFilter(data, optionData["dawn-food"]);
    default:
      return chetak(data);
  }
}