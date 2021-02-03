import axios from "axios";

export class TesseractService {
    async PostImage(image) {
        console.log("imagge", image)
        let formData = new FormData();
        formData.append("file", image);
        console.log("image", formData)
        var res = await axios({
            method: "post",
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
            url: `/api/read-value`,
        })
        console.log("response from node", res)
        return res.data
    }
}