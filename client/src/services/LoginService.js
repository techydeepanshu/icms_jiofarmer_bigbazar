import Axios from "./axios"

export class LoginService  {

    async authenticate(data) {
        var res = await Axios.post('/api/login', {data})
        return res.data
    }
}