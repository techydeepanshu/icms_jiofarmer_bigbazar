const getDBInvoiceName = (slug) => {
  switch (slug) {
    case "chetak":
      return "chetakproducts";
    case "krishna-foods":
      return "krishnafoodsproducts";
    case "sea-mark":
      return "seamarks";
    case "advance-foods":
      return "advancefoods";
    case "joy-gourmet-foods":
      return "joygourmetfoods";
    case "best-foods":
      return "bestfoods";
    case "katzman":
      return "katzmen";

    default:
      break;
  }
};

module.exports = {
  getDBInvoiceName,
};
