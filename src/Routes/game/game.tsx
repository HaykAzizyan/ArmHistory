import React from "react"
import {inject, observer} from 'mobx-react';
import {observable} from 'mobx';
import * as d3 from 'd3';
import InputString from '../../Components/InputString/InputString.view'
import InputStringModel from '../../Components/InputString/InputString.model';
import { CHECK_MIN_LENGTH, CHECK_REGULAR_EXPRESSION, CHECK_MAX_LENGTH } from '../../Helpers/Validators';
import { EMAIL_CHECKER, PASSWORD_CHECKER } from '../../Helpers/regularExpresions';
import APIcnst from "../../Helpers/api.cnst";
import "./game.scss";
import { directive } from "@babel/types";
import WelcomeScreen from "./gameScreens/welcomeScreen";
import GameScreen from "./gameScreens/gameScreen";
import GameModel from "./gameModel";
@inject("mainStore", "httpService", "userService")
@observer

export default class GameForm extends React.Component <any, any> {

    constructor (props: any)
    {
        super(props)
    }

    private inputEmailModel: InputStringModel = new InputStringModel("");
    private inputPasswordModel:  InputStringModel = new InputStringModel("", [CHECK_MIN_LENGTH(5), CHECK_MAX_LENGTH(40), CHECK_REGULAR_EXPRESSION(PASSWORD_CHECKER)], true);
    private model: GameModel = new GameModel();

    private onFormSubmit(){
        this.props.userService.login(this.inputEmailModel.value, this.inputPasswordModel.value)
    }



    render()
    {
        const isAuthorized = this.props.userService.isAuthorized; 
        return(
            <div>
                {isAuthorized ? <GameScreen model={this.model}/>: <WelcomeScreen/>} 

            </div>
        );
    }
}   