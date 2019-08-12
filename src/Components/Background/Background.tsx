import React from "react";
import BackGroundModel from "./BackgroundModel"
import "./Background.scss"

export default class BackGround extends React.Component  <any, any>{

private backGroundModel: BackGroundModel;
private getBackGroundImage():any{
    if (this.backGroundModel.currentImage)
    {
        return {"backgroundImage": `url(./Images/Background gallery/IMG_0323.JPG)`}
    }
    else return {}
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
                <div className={`back-ground-class ${className || ""}`}>
                       <div className="back-ground-inner" style={this.getBackGroundImage()}></div>
                </div>               
        );
    }
}