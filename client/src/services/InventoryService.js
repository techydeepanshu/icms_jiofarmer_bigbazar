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
  async UpdatePOSProducts(data) {
    console.log(data);
    const res = await Axios.post(
      appendURL + "/api/pos/Product/ManageItem",
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

  async UpdateDBProduct(data) {
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
}
