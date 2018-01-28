import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { GlobalvariablesComponent } from '../globalvariables/globalvariables.component';
import { PluginsService } from '../dataservices/plugins.service';
import { routeData } from './routeData';
import { allroutes} from './allroutes';

@Component({
  selector: 'app-cruiseroute',
  templateUrl: './cruiseroute.component.html',
  styleUrls: ['./cruiseroute.component.css']
})
export class CruiserouteComponent implements OnInit {
    public data: any;
    public sampleData :any;
    private routes: allroutes[] = [];
    //private allRoutes: this.routes[] = [];
    //private x = this.sampleData2.concat(items)
    private applicationName = "CruiseDirector";
    private applicationId = "CruiseDirectorID";
    public customSend = {
            "parameters" : {
                "name" : this.applicationName,
                "id" : this.applicationId
              },
              "credentials" : {
                "parameters" : {
                  "password" : "admin",
                  "username" : "admin"
                }
              },
              "services" : [
                    {"parameters" : {
                        "pluginName" : "CruiseRouter",
                        "service":"getServerInfo",
                        "action" : "serverInfo",
                        "startInactive" : "false"
                     }
                    }
                ]
              };
    
    constructor(private _httpPlugin: PluginsService, private gv: GlobalvariablesComponent) {
        
    }
    log(){
        
    }
    ngOnInit() {
        this.loadData();
    }
    loadData(){
        
        this.data = this._httpPlugin.doPOST(this.customSend).then(data => {
            this.routes = data['CruiseRouter'];
            console.log(data);
            //this.jsonData = (JSON.stringify(this.supportedPlugin, null, 4));*/
          });
    }
    refresh(flag){
        if(flag){
            this.customSend.services[0].parameters.startInactive = "true";
        }else{
            this.customSend.services[0].parameters.startInactive = "false";
        }
        this.loadData();
    }
}
