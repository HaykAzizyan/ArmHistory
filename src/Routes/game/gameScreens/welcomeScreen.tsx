import React from "react"
import {observable} from 'mobx';
import * as d3 from 'd3';
import InputString from '../../../Components/InputString/InputString.view'
import InputStringModel from '../../../Components/InputString/InputString.model';
import { CHECK_MIN_LENGTH, CHECK_REGULAR_EXPRESSION, CHECK_MAX_LENGTH } from '../../../Helpers/Validators';
import { EMAIL_CHECKER, PASSWORD_CHECKER } from '../../../Helpers/regularExpresions';
import APIcnst from "../../../Helpers/api.cnst";
import { observer, inject } from "mobx-react";
@inject("mainStore", "httpService", "userService")
@observer
export default class WelcomeScreen extends React.Component <any, any> {

    constructor (props: any)
    {
        super(props)
    }

    private inputEmailModel: InputStringModel = new InputStringModel("");
    private inputPasswordModel:  InputStringModel = new InputStringModel("", [CHECK_MIN_LENGTH(5), CHECK_MAX_LENGTH(40), CHECK_REGULAR_EXPRESSION(PASSWORD_CHECKER)], true);


    private onFormSubmit(){
        this.props.userService.login(this.inputEmailModel.value, this.inputPasswordModel.value)
    }
     
    render(){
        return <div className="game-form"> 
                        <h1>Wanna play a game?</h1>                        
                        <div className="container">
                            {/* <form>                    */}
                                <div className="form-group">
                                    
                                    <InputString  className="form-control" placeholder="Enter email" model={this.inputEmailModel}></InputString>
                                    <br/>
                                    <InputString  className="form-control" placeholder="Enter Last Name" model={this.inputPasswordModel}></InputString>
                                    <br/>
                                    <button className="btn btn-secondary " 
                                    disabled={!this.inputEmailModel.isValid || !this.inputPasswordModel.isValid } 
                                    onClick={e=>this.onFormSubmit()}> letsgo 
                                    </button>  
                                    
                                </div>
                            {/* </form> */}
                        </div>       
                </div>
    }
}