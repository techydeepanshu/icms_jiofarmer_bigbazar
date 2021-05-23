import Axios from "./axios";
const appendURL=process.env.NODE_ENV==="production"?"/server":"";
export class Api {
    async GetFuzz(name,type){
      var res=await Axios.get(appendURL+`/api/fuzzwuzz`,{params:{name:name,type:type}});
      return res.data
    }
}