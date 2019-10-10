import React from "react";
import * as d3 from 'd3';

export interface MapTilesItem{
    top: number,
    left: number,
    width: number,
    heigth: number,
    tileTakenby: string, 
    tileID: string
} 

export default class GameMapBuilde extends React.Component <any, any> {

    
       
     

    constructor (props: any)
    {
        super(props)
    }

    render(){
        return( 
            <div className="gameMapBuilder"></div>
        );
    }
}