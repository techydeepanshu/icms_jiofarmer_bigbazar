import Axios from "./axios";

export class TesseractService {
    async PostImage(image) {
        const data = new FormData();
        data.append("file", image);
        var res = await Axios.post(`/api/read-value`, data);
        return res.data
    }

    async GetProductDetails(item) {
        var res = await Axios.get(`/api/product/`, { params: {'item':item.trim()} });
        return res.data.item
    }

    async GetOCRData(filename) {
        var res = await Axios.post(`/api/ocr`, { data: {filename} });
        return res.data
    }
}