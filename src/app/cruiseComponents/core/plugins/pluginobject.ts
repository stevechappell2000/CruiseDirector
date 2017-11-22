import { services } from './utils/services';
import { actions } from './utils/actions';
export class pluginObject {
    public Actions: actions[] = [];
    constructor(public name:string, public version: string, public vendor: string, public actions: actions[] = []){
        //this.Actions = actions;
        //console.log();
    }
}