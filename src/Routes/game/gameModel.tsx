import { observable } from "mobx";



export default class GameModel{
    @observable
    public playerTurns: boolean = false;
    @observable
    public isStarted: boolean = false;
    @observable
    public isFinished: boolean = false;
    
    public readonly maxTurns: number = 3;


    
}