import React from 'react';
import {action, computed, observable} from 'mobx';
import LayoutGrid from "../../Components/LayoutGrid/LayoutGrid.view"
import LayoutGridModel from "../../Components/LayoutGrid/LayoutGrid.model"
import {inject, observer} from 'mobx-react';
import "./HistoricEvents.scss"
import * as d3 from 'd3';
@inject("mainStore")
@observer
export default class HistoricEvents extends React.Component <any, any>
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
        this.layoutGrid.addItems([
            'IMG_0323.JPG',
            'IMG_0324.JPG',
            'IMG_0826.JPG',
            'IMG_0827.JPG',
            'IMG_4713.JPG',
            'IMG_4714.JPG',
            'IMG_5189.JPG'
          ].map((img)=>
          <div className="get_in" style={{backgroundImage: `url("./Images/Background gallery/${img}")`}}>{img}</div>
          ))
    }
    private root: any= React.createRef();
    private layoutGrid: LayoutGridModel = new LayoutGridModel();

    render()
    {
        return(
                <div className={`pagecontent `} ref={this.root}>
                    <h1>HistoricEvents</h1>
                    <LayoutGrid model={this.layoutGrid}/>
                </div>
        );
    }
}