import { parameter } from './parameter';

export class credentials {
    public parameters = {};
    constructor(username: string, password: string){
        this.parameters["username"]= username;
        this.parameters["password"] = password;
    }
    addParam(name: string, value: string){
        this.parameters[name] = value;
    }
    getParam(name: string){

    }
}