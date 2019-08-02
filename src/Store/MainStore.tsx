import {action, computed, observable} from 'mobx';
import { MobxRouter, RouterStore, startRouter} from 'mobx-router';
export class MainStore 
{
    @observable
    public title: string = "ArmHistory";

    public router: RouterStore = new RouterStore() 
}
export default new MainStore()