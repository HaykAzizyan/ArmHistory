import React from "react";

export class TokenService {
    private token: any = null 
    public getCurrentToken (){
        return this.token && this.token.tokenName ;
    }
    public saveSession(token){
        this.token = token;
        localStorage.setItem("token-name", this.token.tokenName)
    }
    public dropSession(){
        this.token = null;
        localStorage.removeItem("token-name")
    }

}
 
export default new TokenService()