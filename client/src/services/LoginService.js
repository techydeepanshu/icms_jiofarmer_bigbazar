import Axios from "./axios"
const appendURL=process.env.NODE_ENV==="production"?"/server":"";
export class LoginService  {

    async authenticate(data) {
        var res = await Axios.post(appendURL+'/api/login', {data})
        return res.data
    }
}