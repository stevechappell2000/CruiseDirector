import { parameter } from './parameter';
import { credentials } from './credentials';
import { services } from './services';
export class application {
    public parameters = {};
    public services: services[] = [];
    public credentials: credentials = new credentials({"username":"admin", "password":"admin"});
    constructor(Parameters:{}){//appName: string, id: string){
        //console.log(Parameters);
        this.parameters = Parameters;
        //this.parameters['name'] = appName;
        //this.parameters['id'] = id;
    }
    addParam(name: string, value: string){
        this.parameters[name] = value;
    }
    getParam(name: string){

    }
    addCredential(cred: credentials){
        this.credentials = cred;
    }
    addService(serv: services){
        this.services.push(serv);
    }
}