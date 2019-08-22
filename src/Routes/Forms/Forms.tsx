import React from 'react';
import {inject, observer} from 'mobx-react';
import {observable} from 'mobx';
import * as d3 from 'd3';
import InputString from '../../Components/InputString/InputString.view'
import InputStringModel from '../../Components/InputString/InputString.model';
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
    
    private inputEmailModel: InputStringModel = new InputStringModel();
    
    render()
    {
        return(
            <div>
                <div className={`pagecontent `} ref={this.root}>
                    <h1>Forms</h1>                        
                
                <form>
                   
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1"></label>
                        <InputString  className="form-control" placeholder="Enter email" model={this.inputEmailModel}></InputString>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>                        
                    </div>
                </form>
                </div>
            </div>

        );
    }
}