import React from 'react';
import {inject, observer} from 'mobx-react';
import TooltipModel from './ToolTipModel';
import "./ToolTip.scss"
@observer 
export default class Tooltip extends React.Component <any, any>
{
    constructor(props: any){
        super(props);  
        this.model = props.model 
    }
  
    private model: TooltipModel;

    private getpos = () => {
        const {x, y} = this.model 
        return{left: x + "px", top: y + "px"}
    } 

    
    render()
    {

        return(
            <div style={this.getpos()} className={`tool-tip-class ${this.model.isVisible ? 'is-visible' : ''}`}>
                <div className="tool-tip-content">
                    <div className="tool-tip-content-inner">
                        {this.props.children}
                    </div>  
                </div>
            </div>
        );
    }
}