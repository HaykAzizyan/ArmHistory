import React from "react";
import axios from "axios";
import APIcnst from "../Helpers/api.cnst"
import tokenService from "./token.service";


export class HttpService {

    private async noTrash(request){
        const result = await request;
        if(result.status === 200) return result.data;
        else return result;
    }

    public sendPostReq(url, data){
        
        return this.noTrash( axios.post(url, data, {headers: {Auth: tokenService.getCurrentToken()}}))
        
    }

    public sendGetReq(url){
        return this.noTrash(axios.get(url, {headers: {Auth: tokenService.getCurrentToken()}}))
    }

}


export default new HttpService();

