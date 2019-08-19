import React from "react";
import BackGroundModel from "./BackgroundModel"
import "./Background.scss"
import { observer,} from "mobx-react";
import {computed} from "mobx";
import * as d3 from "d3";
import { transform } from "@babel/core";
@observer
export default class BackGround extends React.Component  <any, any>{


private lastImg: string | null = "";   
private root: any = React.createRef();
private backGroundModel: BackGroundModel;
private subscription: any = null;
private getBackGroundImage():any{
    if (this.backGroundModel.currentImage)
    {
        return {"backgroundImage": `url("${this.backGroundModel.currentImage.source}")`}
    }
    else return {}
}

public componentDidMount():void{
    const root = d3.select(this.root.current)
    const current = root.select(".back-ground-current")
    const next = root.select(".back-ground-next")
    const imgobserver = computed(()=>this.backGroundModel.currentImage)
    this.subscription = imgobserver.observe((image)=>{
        let imgSource = image.newValue && image.newValue.source;
        next.style("background-image", `url("${this.lastImg}")`)
            .style("opacity", 1)
            .style("transform", ()=> "scale(1) rotate(0deg)" )
            .transition().duration(1000)
            .style("transform", ()=> "scale(1.2) rotate(-10deg)" )
            .style("opacity", 0)
            .on('end', () => {
                next.style("transform", ()=>"scale(0)");
                this.lastImg = imgSource;
            });
        current
            .style("background-image", `url("${imgSource}")`)
            .style("opacity", () => this.lastImg ? 1 : 0)
            .style("transform", ()=> "scale(1.2) rotate(10deg)" )
            .transition().duration(1000)
            .style("transform", ()=> "scale(1) rotate(0deg)" )
            .style("opacity", 1)
    }); 

}

public componentWillUnmount():void{

}

constructor(props: any){
    super(props);
    this.backGroundModel = props.model;
}

render()
    {
        const {className} = this.props; 
        console.log(this.getBackGroundImage())
        return(
                <div className={`back-ground-class ${className || ""}`} ref={this.root}>
                    <div className="back-ground-current" ></div>
                    <div className="back-ground-next" ></div>
                </div>               
        );
    }
}