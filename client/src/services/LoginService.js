const { default: axios } = require("axios");

export class LoginService  {

    async authenticate(username, password) {
        var res = await axios.post('/api/login', {username,password})
        return res.data
    }
}