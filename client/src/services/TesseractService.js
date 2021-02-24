import Axios from "./axios";

export class TesseractService {
    async PostImage(image) {
        const data = new FormData();
        data.append("file", image);
        var res = await Axios.post(`/api/upload-image`, data);
        return res.data
    }

    async GetProductDetails(invoiceName) {
        var res = await Axios.get(`/api/product/`, {
          params: { invoiceName: invoiceName },
        });
        return res.data.invoiceData
    }

    async GetOCRData(filename) {
        var res = await Axios.post(`/api/ocr`, { data: {filename} });
        return res.data
    }
}