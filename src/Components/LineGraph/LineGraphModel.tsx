export interface ILineGraphEvents{
    click?:any,
    mouseover?:any,
    mouseout?:any,
    mousemove?:any
}

export default class LineGraphModel{
    public events: ILineGraphEvents={
        click:(e) => console.log(e), 
        mouseover:(e) => console.log(e),
        mousemove:(e) => console.log(e),
        mouseout:(e) => console.log(e)
    }

    constructor (customevents: ILineGraphEvents={})
    {
        Object.keys(this.events).forEach(key => {
            if (customevents.hasOwnProperty(key) && typeof customevents[key] === "function")
            {this.events[key] = customevents[key]}
        })
    }
}