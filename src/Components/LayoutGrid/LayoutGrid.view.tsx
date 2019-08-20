import React from 'react'
import { observer} from 'mobx-react';
import { ILayoutGridItem } from './LayoutGrid.model';
import * as d3 from 'd3';
import "./LayoutGrid.scss"
import { observable, action, computed } from 'mobx';
const WIDTH = "width";
const HEIGHT = "height";

@observer
export default class LayoutGrid extends React.Component<any, any>
{
    @observable
    private sortOrder: any = {}
    @action 
    private refreshSortOrder(){
        this.props.model.items.forEach((datum: ILayoutGridItem) => {
            this.sortOrder[datum.name] = datum.index           
        });
    } 
    @computed 
    private get sortedItems(){
        return Object.keys(this.sortOrder).sort((a, b) => {
            let valA = this.sortOrder[a], valB = this.sortOrder[b];
            return valA < valB ? -1 : (valA > valB ? 1 : 0);
          }).map(key => this.props.model.items.find((datum: ILayoutGridItem) => datum.name === key ));
    }

    @action
    private onMouseOver(e: any, data: ILayoutGridItem){               
      if (this.props.model.currentIndex !== data.index) {
        const i = data.index;
       data.index = this.props.model.currentIndex;
       this.props.model.currentIndex = i;
        this.refreshSortOrder(); 
      }
    }

    private refreshView(){
        const root = d3.select(this.root.current)
        let
        cells: any[] = [];

      root.select(".layout-grid-row").selectAll(`.layout-grid-item`).each(function (this: any) {
        console.log(this)
        cells.push(this);
      });

      root.select(".layout-grid-markup").selectAll(`.layout-grid-markup-cell`).each(function (this: any, d: any, i: number) {
        let rect = cells[i].getBoundingClientRect();
        d3.select(this)
          .style(WIDTH, () => `${rect[WIDTH]}px`)
          .style(HEIGHT, () => `${rect[HEIGHT]}px`);
      });
    }


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
        this.props.model.changeCurrentIndex(data.index)
        const root = d3.select(this.root.current)
        const doc = d3.select(document)
        const body = d3.select("body").classed("no-select", true) 
        const activeItem= root.select(".layout-grid-active-item") 
        const sizes = item.node().getBoundingClientRect()
        const offsetX =  sizes.left - clientX;
        const offsetY = sizes.top - clientY;
        const markUp = root.select(".layout-grid-markup").classed("is-active", true)

        activeItem
            .html('')
            .style(WIDTH, () => `${sizes[WIDTH]}px`)
            .style(HEIGHT, () => `${sizes[HEIGHT]}px`)
            .style("transform", `translate(${offsetX + clientX}px,${offsetY + clientY}px)`)
            .node().appendChild(item.node().firstChild.cloneNode(true));
        doc
            .on("mousemove", ()=>{
                const _event = d3.event;
                activeItem
                    .style("transform", `translate(${offsetX + _event.clientX}px,${offsetY + _event.clientY}px)`)
            }) 
            .on("mouseup", ()=>{
                doc
                    .on("mousemove", null)
                    .on("mouseup", null);
                activeItem
                    .html('')
                    .style(WIDTH, () => `${0}px`)
                    .style(HEIGHT, () => `${0}px`);
                body.classed("no-select", false)
                markUp.classed("is-active", false)
                this.props.model.changeCurrentIndex()
            })
            this.refreshView();
      }
    } 
    constructor (props: any){
        super(props)
    }
    componentDidMount(){
        this.refreshSortOrder()
    }


    render(){
        console.log(this.sortedItems);
        return(
            <div className="layout-grid-container" ref={this.root}>
                    <div className="layout-grid-row row">{this.sortedItems.map((d, i) =>{
                        return <div className={`layout-grid-item col-4 
                                ${d.index === this.props.model.currentIndex ? 'isSelected' : ''}`}
                                onMouseDown={(e)=> this.handeleOnMouseDownEvent(e, d)} key={i}>
                                
                            {d.content}
                        </div>
                    }) }
                    </div>
                
                <div className="layout-grid-active-item"></div>
                <div className="layout-grid-markup">{this.sortedItems.map((d, i) =>{
                    return <div className={`layout-grid-markup-cell`}
                                onMouseOver={(e)=> this.onMouseOver(e, d )} key={i}>                       
                        </div> 
                }) }</div>
            </div>    
        );
    }
}