import React from 'react';
import {inject, observer} from 'mobx-react';
import * as d3 from 'd3';
import "./BarChart.scss";
import BarChartModel from "./BarChartModel";
@inject("mainStore")
@observer
export default class BarChart extends React.Component <any, any>
{
    private data = [];
    private color: string="#ff0000";
    private model: BarChartModel;

    constructor (props: any)
    {
        super(props);
        this.data = props.data;
        this.model = props.model;
    }



    public componentDidMount():void{

        
        const root = d3.select(this.root.current);
        const size = this.root.current.getBoundingClientRect()
        const Canvas = root.select('.bar-chart_Canvas') 
        const bars = Canvas.selectAll('.bar-chart_item').data(this.data.map(d => ({
            val: d,
            elem: null
          })));
        const smt = (size.width/this.data.length)
        const scaleY= d3.scaleLinear().domain([0, d3.max(this.data)]).range([0, size.height])
        
        bars.enter().append('rect').classed('bar-chart_item', true).each(function(this:any,d,i){
            d["elem"]=d3.select(this)
            console.log(this)
        })
            
        bars.exit().remove()
        Canvas.selectAll('.bar-chart_item')
        .style("fill", "steelblue")
        .attr("x", (d, i) => {console.log(d, i);return i * smt;})
        .attr("width", () => smt)
        .attr('height', (d) => size.height)
        .attr('y', (d) => size.height - scaleY(d.val))

        .on('click', (d,i) => { 
            const event = d3.event; 
            this.model.events.click(d, [event.clientX, event.clientY]);
        })
        .on('mouseover', (d) => {
            const event = d3.event;
            this.model.events.mouseover(d, [event.clientX, event.clientY])
            d['elem'].style('fill', () => '#f00')
        })
        .on('mouseout', (d) => {
            const event = d3.event;
            this.model.events.mouseout(d, [event.clientX, event.clientY])
            d['elem'].style('fill', () => 'steelblue')})
        console.log(size)
    }

    public componentDidUpdate():void{        
    }
    private root: any= React.createRef();

    render()
    {
        return(
                <div className="bar-chart" ref={this.root}>
                    <svg className="bar-chart_Canvas">
                        
                    </svg>     
                </div>
                
        );
    }
}