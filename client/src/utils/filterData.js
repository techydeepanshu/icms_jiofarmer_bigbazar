import { chetak } from "./invoice-filters/chetak";

export const chooseFilter = (invoiceName, data) => {

  switch (invoiceName) {
    case "chetak":
        return chetak(data)
    default:
      break;
  }
}