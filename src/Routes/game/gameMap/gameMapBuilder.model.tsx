import React from "react";
import {action, computed, observable} from 'mobx';
import {MapTilesItem} from "./gameMapBuilder";
import * as d3 from 'd3';

export default class GameMapBuilderModel {
    @observable
    public tileArray: MapTilesItem[] = []; 
    @action 
    public addTiles(data){
        
        const layoutSize = d3.min([ window.innerWidth, window.innerHeight ]) * .75;
        console.log(layoutSize);
        const emptyArray = d3.treemap().size(layoutSize, layoutSize)(d3.hierarchy({
            parent: "root",
            children: data.map((d) => {
                return {
                    top:         0,
                    left:        0,
                    width:       0,
                    heigth:      0,
                    tileTakenby: "", 
                    tileID:      d.tileID
                    }
            })
        }).sum(() => 1)).leaves().map((d) => {
            console.log(d);
            const tile: MapTilesItem = d.data; 
            tile.top = d.y0;
            tile.left = d.x0;
            tile.width = d.x1 - d.x0;
            tile.heigth = d.y1 - d.y0;
            return tile;
        });
        console.log(emptyArray);
    }
}