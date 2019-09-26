import React from "react"
import {action, computed, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import GameModel from '../gameModel';

export interface GameItem{
    name: string,
    lable: string,
    isSelected: boolean
} 

@inject("mainStore")
@observer
export default class GameScreen extends React.Component <any, any> {

    constructor (props: any)
    {
        super(props)
        this.model = props.model;

    }

    private readonly model: GameModel;
    @action
     private handleOnClick(e: any) 
    {
        const {router} = this.props.mainStore
        // switch (e){
        //     case "Start game": 
        //     case "HistoricPersons":router.goTo(routes.historicpersons);break;
        //     case "HistoricEvents":router.goTo(routes.historicevents);break;
                  
        // }
        // this.menuState = false;
        console.log(e);
    }

    
    private menuItems: GameItem[] = [
        {name: "Start game", lable: "Начать игру",           isSelected: false},
        {name: "Statistic",  lable: "Посмотреть статистику", isSelected: false},
        {name: "log out",    lable: "Выйти",                 isSelected: false}
    ]


    render(){
        return( 
            <div> {!this.model.isStarted && !this.model.isFinished &&
                <div className="game-menu-items">{this.menuItems.map ((d: GameItem, i: number)=>
                    <div className="game-menu-item" key={i} onClick={() => this.handleOnClick(d.name)}>
                        <span>{d.lable}</span>
                    </div>
                )}
                </div>
            }     
            </div>    
        );
    }
}
