import Axios from "./axios";
const appendURL=process.env.NODE_ENV==="production"?"/server":"";
export class TesseractService {
    async PostImage(image) {
        const data = new FormData();
        data.append("file", image);
        var res = await Axios.post(appendURL+`/api/upload-image`, data);
        return res.data
    }

    async GetProductDetails(invoiceName) {
        var res = await Axios.get(appendURL+`/api/product/`, {
          params: { invoiceName: invoiceName },
        });
        return res.data
    }

    async GetOCRData(filename) {
        var res = await Axios.post(appendURL+`/api/ocr`, { data: {filename} });
        console.log(res);
        return res.data
    }

    async GetSavedInvoiceData(invoiceName, invoiceNo, date) {
        console.log("IN TESSERACT SERVICE");
        var res = await Axios.get(appendURL + "/api/invoice/getsaveinvoicedata/", {params:{ invoiceName: invoiceName, invoiceNo: invoiceNo,date: date}});
        console.log(res);
        return res.data;
    }
}