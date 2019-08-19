import { observable, action } from "mobx";

export interface ILayoutGridItem{
    name: string,
    content: any,
    index: number
}
export default class LayoutGridModel{
    @observable
    public currentIndex: number = -1; 

    @observable.shallow
    public items: ILayoutGridItem[]=[]

    @action
    public addItems(data){
        const _data = Array.isArray(data) ? data:[data];
        _data.forEach((element, index) => {
            this.items.push({
                name: "item" + index,
                content: element,
                index: index
            })
        });

    
    }

} 