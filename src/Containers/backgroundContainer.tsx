import React from "react"; 
import { observer, inject } from "mobx-react";
import BackGroundModel from "../Components/Background/BackgroundModel";
import BackGround from "../Components/Background/Background";
import "./backgroundContainer.scss"
@inject("dataService")
@observer
export default class BackGroundContainer extends React.Component <any, any>
{

    constructor(props: any){
        super(props);      
    }
    
    private model: BackGroundModel = new BackGroundModel();

    public componentDidMount():void{
        
        const BG = this.props.dataService.loadBackground()
        this.model.addImages(BG).setIndex();
        setInterval(() => this.model.selectNext(), 5000);

    }
    
    render()
    {
        return(
            <div className="background-container">
                <BackGround model={this.model}/>
                <div className="background-container-overlay">
                    
                </div>
            </div>
        );
    }
} 