import {action, observable} from 'mobx';

export default class TooltipModel
{
    @observable
    public isVisible: boolean = false;
  
    @observable
    public x: number = 0;
  
    @observable
    public y: number = 0;
  
    @observable
    public content: string | any = 'HelloWOrld!!!';
  
    @action
    public setCoordinates (x: number , y: number ) {
      this.x = x;
      this.y = y;
     return this;
    }
  
    @action
    public show () {
      this.isVisible = true;
      return this;
    }
  
    @action
    public hide () {
      this.isVisible = false;
      return this;
    }
  
  }