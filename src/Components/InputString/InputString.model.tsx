import { observable, computed, action } from "mobx";

export default class InputStringModel{
    @observable
    public value: string = "";

    public readonly validators: any[] = [];

    public readonly isRequired: boolean = false;

    public readonly defaultValue: string = "";

    @action
    public setValue(newValue){
        this.value = newValue;
        return this;
    }

    public resetValue(){
        return this.setValue(this.defaultValue);
    }
    
    @computed 
    public get isValid(): boolean{
        if(this.validators.length) return this.validators.every(fn => { 
        console.log(typeof fn, fn)
        return fn(this.value)}) ;
        else return true;
    }
    
    constructor (defaultValue: string = "", validators: any[]=[], isRequired: boolean = false)
    {
        this.validators = validators;
        this.isRequired = isRequired;
        this.defaultValue = defaultValue;
    }
}