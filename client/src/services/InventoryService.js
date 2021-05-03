import { POSAxios, WordpressAxios } from "./axios";
import Axios from "./axios";

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
  async UpdatePOSProducts(data) {
    const res = await POSAxios.post("/Product/ManageItem", data);
    return res.data;
  }
}
