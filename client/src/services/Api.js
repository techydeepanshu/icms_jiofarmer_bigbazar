import Axios from "./axios";

export class Api {
    async GetFuzz(name,type){
      var res=await Axios.get(`/api/fuzzwuzz`,{params:{name:name,type:type}});
      return res.data
    }
}