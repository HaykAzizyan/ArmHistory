import React from 'react';
import {inject, observer} from 'mobx-react';
import * as d3 from 'd3';
import BarChart from "../../Components/BarChart/BarChart";
import LineGraph from "../../Components/LineGraph/LineGraph";
import DonutChart from "../../Components/DonutChart/DonutChart";
import ToolTipModel from "../../Components/ToolTip/ToolTipModel";
import Tooltip from '../../Components/ToolTip/ToolTip';
import BarChartModel from '../../Components/BarChart/BarChartModel';
import DonutChartModel from '../../Components/DonutChart/DonutChartModel';
import LineGraphModel from '../../Components/LineGraph/LineGraphModel';
import {action, observable} from 'mobx';

@inject("mainStore")
@observer
export default class Statistic extends React.Component <any, any>
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

    public componentDidUpdate():void{
        
    }
    private root: any= React.createRef();
    private tooltipModel:ToolTipModel = new ToolTipModel()

    @observable private chartType: string="";
    @action private changeChartType = (newChartType: string) => this.chartType = newChartType;

    @observable private dataValue: any="";
    @action private changeDataValue = (newDataValue: any) => this.dataValue = newDataValue;

    private barChartModel: BarChartModel = new BarChartModel({
        click: (d, coordinates) => this.tooltipModel.setCoordinates(coordinates[0],coordinates[1]).show(),
        mouseover: (d, coordinates) =>{
            this.changeDataValue(d.val)
            this.changeChartType("BarChart")
            this.tooltipModel.setCoordinates(coordinates[0],coordinates[1]).show()
            console.log(d);
        },
        mousemove: (d, coordinates) => this.tooltipModel.setCoordinates(coordinates[0],coordinates[1]),
        mouseout: (d, coordinates) => this.tooltipModel.hide()
    })
    private donutChartModel: DonutChartModel = new DonutChartModel({
        click: (d, coordinats) => this.tooltipModel.setCoordinates(coordinats[0], coordinats[1]).show(),
        mouseover: (d, coordinates) =>{
            this.changeDataValue(d.data.x)
            this.changeChartType("DonutChart")
            this.tooltipModel.setCoordinates(coordinates[0],coordinates[1]).show()
            console.log(d);
        },
        mousemove: (d, coordinates) => this.tooltipModel.setCoordinates(coordinates[0],coordinates[1]),
        mouseout: (d, coordinates) => this.tooltipModel.hide()
    })
    private lineGraphModel: LineGraphModel = new LineGraphModel({
        click: (d, coordinats) => this.tooltipModel.setCoordinates(coordinats[0], coordinats[1]),
        mouseover: (d, coordinates) => this.tooltipModel.setCoordinates(coordinates[0],coordinates[1]).show(),
        mousemove: (d, coordinates) => this.tooltipModel.setCoordinates(coordinates[0],coordinates[1]),
        mouseout: (d, coordinates) => this.tooltipModel.hide()
    })
    private getToolTipContent(){
        switch(this.chartType){
            case "BarChart": return <div>Barchart:{this.dataValue}</div>;     
            case "DonutChart": return <div>Donutchart:{this.dataValue}</div>;
            default: return <div>ERROR</div>;
        }     
    }

    render()
    {
        return(
            <div>
                <Tooltip model={this.tooltipModel} children={<div>{this.getToolTipContent()}</div> }/>
                <div className={`pagecontent `} ref={this.root}>                    
                    <h1>Statistic</h1>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm">
                            <DonutChart model={this.donutChartModel} data={[{x: 10,y: 50}, {x: 20,y: 50}, {x: 200,y: 500} ]}/>
                            </div>
                            <div className="col-sm">
                            <BarChart model={this.barChartModel} data={[100000, 123124, 3423423, 212412, 564656, 110023, 34534]}/>
                            </div>
                            <div className="col-sm">
                            <LineGraph model={this.lineGraphModel} data={[[10, 20],[30, 60],[20, 80],[100, 60],[50, 150],[10, 10]]}/>
                            </div>
                        </div>
                    </div>               
                </div>
            </div>    
        );
    }
}


{/* <div>                       
                        <DonutChart model={this.donutChartModel} data={[{x: 10,y: 50}, {x: 20,y: 50}, {x: 200,y: 500} ]}/>
                        <BarChart model={this.barChartModel} data={[100000, 123124, 3423423, 212412, 564656, 110023, 34534]}/>
                        <LineGraph model={this.lineGraphModel} data={[[10, 20],[30, 60],[20, 80],[100, 60],[50, 150],[10, 10]]}/>                       
                    </div>    */}