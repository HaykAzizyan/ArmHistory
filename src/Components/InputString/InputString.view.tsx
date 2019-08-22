import React from 'react';
import {observer} from 'mobx-react';
import {computed} from 'mobx';
import InputStringModel from './InputString.model';
@observer
export default class InputString extends React.Component<any, any>
{
    private input: any = React.createRef();
    private readonly model: InputStringModel;
    private subscription: any;
    private get currentInputValue(){
        return this.input.current.value;
    }
    private compareValues(): boolean{
        return (this.input.current.value === this.model.value);
    } 
    private onChange(e: any){
        if(this.compareValues) return false;
        else {
            this.model.setValue(this.currentInputValue)
        } 

    }
    public componentDidMount(){
        
        const valueObserver = computed(()=>this.model.value)
        this.subscription = valueObserver.observe((value)=>console.log(value))
    }

    public componentWillUnmount(){
        this.subscription();
    }

    render(){  
        const {model} =this;           
        return(
            <div className={`input-string`}>
                <input ref={this.input}
                className={`${this.props.className || ""}`} 
                type="text" 
                onChange={(e)=> this.onChange(e)}/>
   
            </div>
        );
    }

    constructor (props: any){
        super(props);
        this.model = props.model;

    }
}
