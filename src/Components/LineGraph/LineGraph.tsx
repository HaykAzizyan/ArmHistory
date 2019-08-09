import React from 'react';
import {inject, observer} from 'mobx-react';
import * as d3 from 'd3';
import "./LineGraph.scss";
@inject("mainStore")
@observer
export default class LineGraph extends React.Component <any, any>
{
    private data = [];
    private color: string = 'black'

    constructor (props: any)
    {
        super(props);
        this.data = props.data;
    }
    private root: any= React.createRef();

    public componentDidMount(): void{
        const root = d3.select(this.root.current);
        const size = this.root.current.getBoundingClientRect()
        const Canvas = root.select('.line-graph_Canvas')
        const path = Canvas.select('.line')
        const  {width, height} = size;
        const y = d3.scaleLinear().domain([0, d3.max(this.data, (d) => d[1])]).range([height, 0]);
        const x = d3.scaleLinear().domain([0, d3.max(this.data, (d) => d[0])]).range([0, width]);
        const pathbuilder = d3.line()
            .x(function(d) { return x(d[0]); })
            .y(function(d) { return y(d[1]); });

        path.data([this.data])
        // .attr('transform', `translate(0, ${height} )`)
        .attr('stroke', this.color)
        .attr('d', (d) => pathbuilder(d))
        .attr('fill', 'rgba(0,0,0,0)')

    } 

    render()
    {
        return(
            <div className="line-graph" ref={this.root}>
                <svg className='line-graph_Canvas'>
                    <path className='line'>

                    </path>
                </svg>
            </div>
        );
    }
}