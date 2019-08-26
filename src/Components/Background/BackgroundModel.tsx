import React from "react"
import { observable, action, computed} from "mobx";

export interface IBackGroundItem {
    source: string,
    index?: number,
    lable: string,
}

export default class BackGroundModel{
    constructor (){}


    @observable.shallow public images: IBackGroundItem[]=[];
    
    @observable public currentIndex: number = 0;  
    
    @action public addImage(img: IBackGroundItem)
    {
        img.index = this.images.length 
        this.images.push(img);
        return this;
    }

    @action public addImages(images: IBackGroundItem[])
    {
        images.forEach(img => this.addImage(img));
        return this;
    }
    
    @action public setIndex(newIndex: number = 0)
    {
        this.currentIndex = newIndex
        return this;
    }

    @action public selectPrevious(){
        let newIndex = this.currentIndex - 1;
        if (newIndex < 0)
        {
            newIndex = this.images.length - 1;
        }
        this.setIndex(newIndex);
    }
    @action public selectNext(){
        let newIndex = this.currentIndex + 1;
        if (newIndex > this.images.length - 1)
        {
            newIndex = 0;
        }
        this.setIndex(newIndex);
        
    }
    @computed public get currentImage()
    {
        const currentImage = this.images.find((d: IBackGroundItem) => d.index === this.currentIndex);
        return currentImage || null;
    }
}