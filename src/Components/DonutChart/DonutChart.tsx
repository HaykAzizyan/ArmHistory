import React from 'react';
import {inject, observer} from 'mobx-react';
import * as d3 from 'd3';
import "./DonutChart.scss"
import DonutChartModel from './DonutChartModel';
@inject("mainStore")
@observer
export default class DonutChart extends React.Component <any, any>
{
    private data = [];
    private color: string = 'black'
    private model: DonutChartModel;

    constructor (props: any)
    {
        super(props);
        this.data = props.data;
        this.model = props.model;
    }
    
    private root: any= React.createRef();

    public componentDidMount(): void{
        const root = d3.select(this.root.current);
        const Canvas = root.select('.donut-chart_Canvas')
        const size = this.root.current.getBoundingClientRect()
        const {width, height} = size;
        const g = Canvas.select('.targeting').attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        const color = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];
        const radius = Math.min(width, height) / 2
        const pie = d3.pie()
        .sort(null)
        .value(function(d) { return d['x']});
        const path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 70);
        const label = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);
        const arc = g.selectAll(".arc")
        .data(pie(this.data))
        .enter().append("path")
        .classed('arc', true)
        .attr("d", path)
        .attr("fill", function(d, i) { return color[i];});
        g.selectAll(".arc").each(function(this:any,d,i){
            d["elem"]=d3.select(this)
            console.log(this)
        })
        
        .on('click', (d,i) => { 
            const event = d3.event; 
            this.model.events.click(d, [event.clientX, event.clientY]);
            console.log(this.model.events.click)
        })
        .on('mouseover', (d, i) => {
            const event = d3.event;
            this.model.events.mouseover(d, [event.clientX, event.clientY])
            d['elem'].style('fill', () => '#f00')
        })
        .on('mouseout', (d, i) => {
            const event = d3.event;
            this.model.events.mouseout(d, [event.clientX, event.clientY])
            d['elem'].style('fill', () => color[i])})     
    }


    render()
    {
        return(
            <div className="donut-chart" ref={this.root}>
                <svg className='donut-chart_Canvas'>
                    <g className='targeting'>

                    </g>
                </svg>
            </div>
        );
    }
}