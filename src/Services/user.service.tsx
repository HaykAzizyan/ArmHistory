import React from "react";
import { observable, computed, runInAction} from "mobx";
import { userInfo } from "os";
import httpService from "./http.service";
import ApiCnst from "../Helpers/api.cnst";
import tokenService from "./token.service"; 
import apiCnst from "../Helpers/api.cnst";

export interface IApplicationUser{
    username: string,  
    gamesplayed: number,
    winrate: number,
    loserate: number,
    isAuthorized: boolean
}

export class UserService{
   

    private static getDefaultUser = ()=> ({
        username: "unknown",  
        gamesplayed: 0,
        winrate:     0,
        loserate:    0,
        isAuthorized: false
    })

    private restoreSession(){
        if (tokenService.getCurrentToken()){
            httpService.sendPostReq(ApiCnst.RESTORE_USER, {})
            .then((result)=>{
                tokenService.saveSession(result.token)
                runInAction(() =>this.user.isAuthorized = true);
            })
            .catch((error)=>console.log(error))
        }
    }

    @observable.shallow
    public user: IApplicationUser = UserService.getDefaultUser();
    @computed
    public get isAuthorized() {
        return this.user.isAuthorized;
    } 

    public async login(login, password){
        return httpService.sendPostReq(ApiCnst.LOG_IN, {login, password})
        .then((result)=>{
            tokenService.saveSession(result.token);
            runInAction(() =>this.user.isAuthorized = true);
        })
        .catch((error)=>console.log(error))
    }

    constructor(){
         this.restoreSession();
         
    }

}



export default new UserService();