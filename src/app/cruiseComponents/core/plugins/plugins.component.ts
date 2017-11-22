import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA, HostBinding} from '@angular/core';
import { PluginsService } from '../dataservices/plugins.service';
import { HttpParams } from '@angular/common/http';
import { JsonEditorComponent, JsonEditorOptions } from 'angular4-jsoneditor/jsoneditor/jsoneditor.component';
import { GlobalvariablesComponent } from '../globalvariables/globalvariables.component';
import { actions } from './utils/actions';
import { actionParams } from './utils/actionparams';
import { pluginObject } from './pluginobject';
import { application } from './utils/application';
import { services } from './utils/services';
@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.css']
})

export class PluginsComponent implements OnInit {
  private plugin;
  public editorOptions: JsonEditorOptions;
  public data: any;
  public jsonData: string;
  private gv = new GlobalvariablesComponent();
  public supportedPlugin: pluginObject[] = [];
  public supportedActions: actions[] = [];
  public supportedActionParams: actionParams[] = [];
  public selectedPlugin: pluginObject;
  public selectedAction: actions;
  public selectedActionParams: actionParams;
  private postApp: application;
  //@HostBinding('attr.id') id;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  
  private Application = {};
  private initSend = {
              "parameters" : {
                "name" : "sampleapp",
                "id" : "sampleid"
              },
              "credentials" : {
                "parameters" : {
                  "password" : "admin",
                  "username" : "admin"
                }
              },
              "services" : [
                    {"parameters" : {
                        "pluginName" : "CruiseCorePlugin",
                        "service":"SomeService",
                        "action" : "info"
                     }
                    }
                ]
              };
private customSend = {
        "parameters" : {
            "name" : "sampleapp",
            "id" : "sampleid"
          },
          "credentials" : {
            "parameters" : {
              "password" : "admin",
              "username" : "admin"
            }
          },
          "services" : [
                {"parameters" : {
                    "pluginName" : "CruiseCorePlugin",
                    "service":"SomeService",
                    "action" : "info"
                 }
                }
            ]
          };

  constructor(private _httpPlugin: PluginsService) {
      this.Application = this.initSend;
      this.editorOptions = new JsonEditorOptions()
      this.editorOptions.modes = ['code', 'form', 'text', 'tree', 'view']; // set all allowed modes
      //this.options.mode = 'code'; //set only one mode
        
      this.data = this.Application;
      //this.jsonData = JSON.stringify(this.Application, null, 4);
    
  }

  ngOnInit() {
      this.data = this._httpPlugin.doPOST(this.Application).then(data => {
          this.data = data;
          for(let i=0;i<this.data.Plugins.length;i++){
              //console.log('XXXX:'+this.data.Plugins[i].plugInMetaData.name);
              let el = this.data.Plugins[i].plugInMetaData;
              this.supportedPlugin.push(new pluginObject(el.name, el.version, el.vendor, el.actions));
              
          }
          this.jsonData = (JSON.stringify(this.supportedPlugin, null, 4));
        });
  }
  onNameKeyUp(event: any) {
      console.log(event.target.value);
  }
  doPOST() {
        
        this.data = this._httpPlugin.doPOST(this.editor.get()).then(data => {
            this.data = data;
            this.jsonData = (JSON.stringify(this.data, null, 4));
        });
      //}
    }
  private createApp(){
      //var app: application;
      var app = new application("test","test");
      app.addService(new services(this.selectedPlugin.name));
      app.services[0].addParam("action", this.selectedAction.actionName);
      //let cnt: int = this.selectedAction.actionParams.length;
      for(let i=0;i<this.selectedAction.actionParams.length;i++){
         if(this.selectedAction.actionParams[i].paramName !='ID'){
             app.services[0].addParam(this.selectedAction.actionParams[i].paramName, this.selectedAction.actionParams[i].paramDefault);
         }
      }
      let js = JSON.stringify(app, null, 4);
      this.editor.set(JSON.parse(js));
  }
  doStage(){
      this.createApp();
  }
  onActionChange(action: actions){
      
      this.selectedAction = action
      this.supportedActionParams = action.actionParams;
      this.jsonData = (JSON.stringify(this.selectedAction, null, 4));
  }
  onActionParamChange(actionParams: actionParams){
      this.selectedActionParams = actionParams;
  }
  onPluginChange(plugin: pluginObject){
      this.selectedPlugin = plugin;
      this.jsonData = (JSON.stringify(this.selectedPlugin, null, 4));
      this.supportedActions = plugin.actions;
  }
}
