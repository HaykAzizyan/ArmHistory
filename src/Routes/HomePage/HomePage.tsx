import React from 'react';
import {action, computed, observable} from 'mobx';
import {inject, observer} from 'mobx-react';
import * as d3 from 'd3';
import BackGround from '../../Components/Background/Background';
import BackGroundModel from '../../Components/Background/BackgroundModel';
@inject("mainStore")
@observer
export default class HomePage extends React.Component <any, any>
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
    private model: BackGroundModel = new BackGroundModel().addImage({source: "./Images/Background gallery/IMG_0323.JPG", lable: "Այր ու ձի"});
    
    render()
    {   
        return(
                <div className={`pagecontent `} ref={this.root}>                    
                    <h1>HomePage</h1>
                    <BackGround model={this.model}/>
                </div>
        );
    }
}