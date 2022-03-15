import { POSAxios, WordpressAxios } from "./axios";
import Axios from "./axios";
const appendURL = process.env.NODE_ENV === "production" ? "/server" : "";

export class InventoryService {
  async GetProductDetails(productSKU) {
    const response = await WordpressAxios.get(`/products/`, {
      params: { sku: productSKU },
    });
    return response.data;
  }

  async UpdateProductDetails(productId, data) {
    const res = await WordpressAxios.put(`/products/${productId}`, data);
    return res.data;
  }
  async getAllProducts() {
    const res = await WordpressAxios.get("products");
    return res.data;
  }
  async createProduct(data) {
    const res = await WordpressAxios.post("products", data);
    return res.data;
  }

  async GetPOSProductDetails(upc, itemName = "") {
    const response = await Axios.get(appendURL + "/api/getPOSProduct", {
      params: { upc, itemName },
    });
    return response.data;
  }
  async GetPOSInventoryDetails(Barcode) {
    const response = await Axios.get(appendURL + "/api/GetPOSInventory", {
      params: { Barcode:Barcode},
    });
    return response.data;
  }
  async UpdatePOSProducts(data) {
    console.log(data);
    const res = await Axios.post(
      appendURL + "/api/pos/Product/ManageItem",
      data
    );
    return res.data;
  }
  
  async UpdatePOSInventory(data) {
    console.log(data);
    const res = await Axios.post(
      appendURL + "/api/updateinventory",
      data
    );
    return res.data;
  }
  async SyncInventory() {
    const res = await Axios.get(appendURL + "/api/sync");
    console.log(res.data);
    return res.data;
  }
  async UpdateProductFields(data) {
    /**
     ***** data format
     * data = {invoiceName: "chetak", itemName:"CAS 123", value:{"Description": "jnckwc", "Price": "44"}}
     */
    //  console.log(data);
    const res = await Axios.put(
      appendURL + "/api/invoice/product/update",
      data
    );
    return res.data;
  }

  // added by Deepanshu
  async UpdateHandWrittenProductFields(data) {

    const res = await Axios.put(
      appendURL + "/api/handwritteninvoice/product/update",
      data
    );
    return res.data;
  }

  async CreateNotFoundItems(data) {
    /**
     * data format
     * {Item:String,Description:String,Quantity:String,Price:String,sku:String,Barcode:String,PosSKU:String,InvoiceName:String}
     */
    const res = await Axios.post(appendURL + "/api/invoice/notfound", data);
    return res.data;
  }

  async CreateScanInvoiceData(data){
    //console.log("IN INVENTORY SERVICE");
    //console.log(data);
    const res = await Axios.post(appendURL + "/api/invoice/scaninvoicedata", data);
    return res.data;
  }
  async UpdateInvoiceData(invoiceName, invoiceNo, date, itemNo) {
    console.log(invoiceName);
    console.log(invoiceNo);
    console.log(itemNo);
    console.log(date);
    const res = await Axios.post(appendURL + "/api/invoice/updateinvoicedata", {params:{ invoiceName: invoiceName, invoiceNo: invoiceNo,date: date, itemNo: itemNo}});
    return res.data;
  }

  async UpdateDBafterPosUpdate(data){
    console.log(data);
    const res = await Axios.post(appendURL + "/api/invoice/updatedbafterposupdate", data);
    console.log(res);
  }
  
  async UpdateInventoryInDB(data){
    console.log(data);
    const res = await Axios.post(appendURL + "/api/invoice/updateinventoryindb", data);
    console.log(res);
  }

  async saveDetails(data) {
    console.log(data);
    const res = await Axios.post(appendURL + "/api/invoice/savedetails", data);
    return res.data;

  }

  async reversePOSUpdate(invoiceName, invoiceNo, date, itemNo) {
    console.log(invoiceName);
    console.log(invoiceNo);
    console.log(itemNo);
    console.log(date);
    const res = await Axios.post(appendURL + "/api/invoice/reverseposupdate", {params:{ invoiceName: invoiceName, invoiceNo: invoiceNo,date: date, itemNo: itemNo}});
    return res.data;
  }

  async gethandwrittenPosLogs(data){
    console.log("data : ",data);

    const res = await Axios.get(appendURL + "/api/invoice/gethandwrittenposlogs",{params:{invoicename:data.invoicename,itemNo:data.itemNo,sku:data.sku,updatedate:data.updatedate}});
    return res.data;
  }
  
  async linkingCorrect(data) {
    console.log(data);
    const res = await Axios.post(appendURL+ "/api/invoice/linkingcorrect", data);
    return res;
  }


  async linkManually(data) {
    console.log(data);

    const res = await Axios.post(appendURL + "/api/invoice/linkmanually", data);
    return res;
  }

  async getHicksvilleData(value) {
    console.log("in inventory for hicks data");
    const res = await Axios.get(appendURL + "/api/invoice/gethicksvilledata", {params: {input: value}});
    return res.data;
  }

  async getSavedInvoices (data) {
    console.log("in inventory for saved invoices");
    console.log(data);
    const res = await Axios.get(appendURL + "/api/invoice/getsavedinvoices", {params: data} );
    return res.data;

  }

  async UpdateDBProduct(data) {
    console.log(data);
    const res = await Axios.put(appendURL + "/api/invoice/pos/update", data);
    return res.data;
  }
  async CreateDBProduct(data) {
    const res = await Axios.post(appendURL + "/api/invoice/pos/create", data);
    return res.data;
  }

  async getInitialSyncedData(dateObj) {
    console.log("In inventory service");
    console.log(dateObj);
    const res = await Axios.get(appendURL + "/api/invoice/pos",dateObj);
    console.log(res);
    return res.data;
  }

  async generateLog(data) {
    console.log(data);
    const res = await Axios.post(appendURL + "/api/invoice/generatelog", data);
    return res;

  }

  async linkManuallyLog(data) {
    console.log(data);
    const res = await Axios.post(appendURL+ "/api/invoice/linkmanuallylog", data);
    return res;
  }

  async reverseUpdate(data) {
    console.log(data);

    const res = await Axios.post(appendURL + "/api/invoice/reverseupdate", data);
    return res.data;
  }

  async UnidentifiedLog(data) {
    console.log(data);
    const res = await Axios.post(appendURL + "/api/invoice/unidentifiedlog", data);
    return res;
  }

  async handwrittenPosLogs(data) {
    console.log(data);
    const res = await Axios.post(appendURL + "/api/invoice/handwrittenposlogs", data);
    return res;
  }
  async GethandwrittenLogs(invName) {
   const data = {
      invoiceName:invName
    }
    console.log(data);
    const res = await Axios.get(appendURL + "/api/invoice/gethandwrittenlogs", {params:data});
    return res;
  }

  async fetchProductFromPosList(data) {
    console.log(data);
    const res = await Axios.get(appendURL + "/api/invoice/fetchproductfromposlist", data);
    return res.data;
  }

  async posLogs(data) {
    console.log(data);
    const res = await Axios.post(appendURL + "/api/invoice/poslogs", data)
    return res.data;
  }

  async posInventoryLogs(data) {
    console.log(data);
    const res = await Axios.post(appendURL + "/api/invoice/posinventorylog", data)
    return res.data;
  }

  async getItemForHandwrittenInvoice(data) {
    console.log(data);
    const res = await Axios.get(appendURL + "/api/invoice/getitemhandwritten", {params: data});
    return res.data;
  }
}
