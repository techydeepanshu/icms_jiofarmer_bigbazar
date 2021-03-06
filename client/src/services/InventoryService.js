import { WordpressAxios } from "./axios";

export class InventoryService {
    async GetProductDetails(productSKU) {
        const response = await WordpressAxios.get(`/products/`,{ params: {sku: productSKU}})
        console.log("response.data on woocommerce", response.data[0])
        return response.data
    }

    async UpdateProductDetails(productId, data) {
        console.log("Data for updating on woo commerce", data)
        const res = await WordpressAxios.put(`/products/${productId}`, data);
        console.log("response.data on woocommerce", res.data)
        return res.data
    }
}
/*********
 * product sku list
 * 
 * 
 */
// {
//     /**chetak itemcode for cheese */
//     "CAS M20": {
//         sku: 123,
//         product: "Cheese"
//     },
//     /**best foods item code */
//     "45256": {
//         sku: 123,
//         product: "Cheese"
//     }
// }