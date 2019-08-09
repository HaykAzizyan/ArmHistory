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
    
    render()
    {

        return(
            <div className={`tool-tip-class ${this.model.isVisible ? 'is-visible' : ''}`}>
                допустоим тут что-то есть
            </div>
        );
    }
}