import { parameter } from './parameter';

export class credentials {
    public parameters = {};
    constructor(Parameters:{}){//username: string, password: string){
        this.parameters = Parameters;
        //this.parameters["username"]= username;
        //this.parameters["password"] = password;
    }
    addParam(name: string, value: string){
        this.parameters[name] = value;
    }
    getParam(name: string){

    }
}