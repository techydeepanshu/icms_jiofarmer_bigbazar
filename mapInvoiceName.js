const { InvoiceMapping } = require("./Invoice-Mapping");

const getDBInvoiceName = (slug) => {
  console.log("getDBInvoiceName_slug : ",slug);
  for (let i = 0; i < InvoiceMapping.length; i++) {
    if (slug === InvoiceMapping[i].slug)
      return InvoiceMapping[i].databaseName
  }
};

module.exports = {
  getDBInvoiceName,
};
