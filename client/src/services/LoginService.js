import Axios from "./axios"

export class LoginService  {

    async authenticate(userId) {
        var res = await Axios.post('/api/login', {data:userId})
        return res.data
    }
}