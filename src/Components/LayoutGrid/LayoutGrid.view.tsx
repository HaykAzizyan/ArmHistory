import React from 'react'
import { observer } from 'mobx-react';
import { ILayoutGridItem } from './LayoutGrid.model';
import * as d3 from 'd3';
const WIDTH = "width";
const HEIGHT = "height";

@observer
export default class LayoutGrid extends React.Component<any, any>
{
    private root: any = React.createRef()
    private handeleOnMouseDownEvent(event: any, data: ILayoutGridItem){
        const {clientX, clientY, target} = event; 
        let
        item = d3.select(event.target);
  
      while (item && !item.classed("layout-grid-item")) {
        let parent = item.node().parentElement;
        if (parent) item = d3.select(parent);
        else item = null;   
      }
      if (!item) return;
      else{
        const root = d3.select(this.root.current)
        const doc = d3.select(document)
        const activeItem= root.select(".layout-grid-active-item") 
        const sizes = item.node().getBoundingClientRect()
        activeItem
            .html('')
            .style(WIDTH, () => `${sizes[WIDTH]}px`)
            .style(HEIGHT, () => `${sizes[HEIGHT]}px`)
            .node().appendChild(item.node().firstChild.cloneNode(true));
        doc
            .on("mousemove", ()=>{
                const _event = d3.event;
                activeItem
                    .style("transform", `translate(${_event.clientX}px,${_event.clientY}px)`)
            }) 
            .on("mouseup", ()=>{
                doc
                    .on("mousemove", null)
                    .on("mouseup", null)
                activeItem
                    .html('')
                    .style(WIDTH, () => `${0}px`)
                    .style(HEIGHT, () => `${0}px`)
            })
      }
    } 
    constructor (props: any){
        super(props)
    }
    render(){
        return(
            <div className="layout-grid-container" ref={this.root}>
                <div className="container">
                    <div className="layout-grid-row row">{this.props.model.items.map((d, i) =>{
                        return <div className={`layout-grid-item col-4 
                                ${d.index === this.props.model.currentIndex ? 'isSelected' : ''}`}
                                onMouseDown={(e)=> this.handeleOnMouseDownEvent(e, d)} key={i}>
                                
                            {d.content}
                        </div>
                    }) }

                    </div>
                </div>
                <div className="layout-grid-active-item"></div>
            </div>    
        );
    }
}