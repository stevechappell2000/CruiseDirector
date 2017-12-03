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
  private postApp: application = null;
  private activeURL: string = undefined;
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
      this.data = this.Application;
 
    
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
      if(null === this.postApp){
          this.postApp = new application("test","test");
      }
      var ser = new services(this.selectedPlugin.name)//
      ser.addParam("action", this.selectedAction.actionName);
      for(let i=0;i<this.selectedAction.actionParams.length;i++){
         if(this.selectedAction.actionParams[i].paramName !='ID'){
            ser.addParam(this.selectedAction.actionParams[i].paramName, this.selectedAction.actionParams[i].paramDefault);
         }
      }
      this.postApp.addService(ser);
      let js = JSON.stringify(this.postApp, null, 4);
      this.editor.set(JSON.parse(js));
  }
  doStage(){
      this.createApp();
  }
  doClear(){
      this.postApp = null;
      this.editor.set(JSON.parse("{}"));
  }
  doClearOutput(){
      this.jsonData  = "{}";
  }
  doConvert(){
      this.editor.set(JSON.parse(this.jsonData));
  }
  doShow(){
      this.postApp = null;
      this.jsonData  = JSON.stringify(this.editor.get(),null,4);
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
  doUpdateURL(event: any) { // without type info
      this.activeURL = event.target.value;
  }
  doConnect(){
      if(undefined != this.activeURL){
      this._httpPlugin.LastURL = this.activeURL;
      }
  }
}
