import React from 'react';
import {inject, observer} from 'mobx-react';
import {observable} from 'mobx';
import * as d3 from 'd3';
import InputString from '../../Components/InputString/InputString.view'
import InputStringModel from '../../Components/InputString/InputString.model';
import { CHECK_MIN_LENGTH, CHECK_REGULAR_EXPRESSION, CHECK_MAX_LENGTH } from '../../Helpers/Validators';
import { EMAIL_CHECKER } from '../../Helpers/regularExpresions';
@inject("mainStore")
@observer
export default class Forms extends React.Component <any, any>
{
    constructor (props: any)
    {
        super(props)
    }

    public componentDidMount():void{
        const root = d3.select(this.root.current);
        console.log(root);
        root.transition().duration(500).ease(d3.easeLinear)
        .style('transform', () => 'translate(0, 0px)')
        .style('opacity', () => 1);
    }
    private root: any= React.createRef();
    
    @observable
    private status: boolean = true;
    
    private inputEmailModel: InputStringModel = new InputStringModel("", [CHECK_REGULAR_EXPRESSION(EMAIL_CHECKER)], true);
    private inputNameModel:  InputStringModel = new InputStringModel("", [CHECK_MIN_LENGTH(2), CHECK_MAX_LENGTH(20)], true)
    private inputLastModel:  InputStringModel = new InputStringModel("", [CHECK_MIN_LENGTH(2), CHECK_MAX_LENGTH(40)])

    private onFormSubmit(){
        console.log(this.inputEmailModel.value)
    }
    render()
    {
        return(
            <div>
                <div className={`pagecontent `} ref={this.root}>
                    <h1>Forms</h1>                        
                    <div className="container">
                        <form>                   
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1"></label>
                                <InputString  className="form-control" placeholder="Enter First Name" model={this.inputNameModel}></InputString>
                                <small id="nameHelp" className="form-text text-muted">input your first name.</small>
                                <InputString  className="form-control" placeholder="Enter Last Name" model={this.inputLastModel}></InputString>
                                <small id="nameHelp" className="form-text text-muted">input your Last name.</small>
                                <InputString  className="form-control" placeholder="Enter email" model={this.inputEmailModel}></InputString>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> 
                                <textarea name="comment" id="your-text" rows={5} cols={30}></textarea>
                                <button className="btn btn-secondary " 
                                disabled={!this.inputEmailModel.isValid || !this.inputNameModel.isValid || !this.inputLastModel.isValid} 
                                onClick={e=>this.onFormSubmit()}> кнопочка
                                </button>  

                            </div>
                        </form>
                    </div>
                </div>
            </div>

        );
    }
}