import React from "react";
import axios from "axios";
import APIcnst from "../Helpers/api.cnst"

export class HttpService {

    public sendPostReq(url, data){

    }

    public sendGetReq(url){
        return axios.get(url)
    }

}


export default new HttpService();

