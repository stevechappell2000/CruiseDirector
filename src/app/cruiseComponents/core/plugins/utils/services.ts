import { parameter } from './parameter';

export class services {
    public parameters = {};
    constructor(value: string){
        this.parameters["pluginName"] = value;
    }
    addParam(name: string, value: string){
        this.parameters[name] = value;
    }
    getParam(name: string){

    }
}