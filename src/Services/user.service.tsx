import React from "react";
import { observable } from "mobx";
import { userInfo } from "os";

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
    @observable.shallow
    public user: IApplicationUser = UserService.getDefaultUser();

    public async login(login, password){
        
    }

}

export default new UserService();