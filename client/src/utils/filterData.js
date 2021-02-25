import { chetak } from "./invoice-filters/chetak";
import { krishnaFoods } from "./invoice-filters/krishna-foods";

export const chooseFilter = (invoiceName, data) => {

  switch (invoiceName) {
    case "chetak":
      return chetak(data);
    case "krishna-foods":
      return krishnaFoods(data);
    default:
      return chetak(data);
  }
}