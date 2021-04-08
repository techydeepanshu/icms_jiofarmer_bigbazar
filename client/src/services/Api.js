import Axios from "./axios";

export class Api {
    async GetFuzz(name){
      var res=await Axios.get(`/api/fuzzwuzz`,{params:{name:name}});
      return res.data
    }
}