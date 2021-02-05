import axios from "axios";

export class TesseractService {
    async PostImage(image) {
        let formData = new FormData();
        formData.append("file", image);
        var res = await axios({
            method: "post",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
            url: `/api/read-value`,
        })
        return res.data
    }

    async GetProductDetails(item) {
        var res = await axios.get(`/api/product/`, { params: {'item':item} });
        return res.data.item
    }
}