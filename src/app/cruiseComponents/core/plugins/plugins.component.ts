import { Component, OnInit, ViewChild, CUSTOM_ELEMENTS_SCHEMA, HostBinding} from '@angular/core';
import { PluginsService } from '../dataservices/plugins.service';
import { JsonEditorComponent, JsonEditorOptions, JsonEditorTreeNode } from 'angular4-jsoneditor/jsoneditor/jsoneditor.component';
import { HttpParams } from '@angular/common/http';
import { GlobalvariablesComponent } from '../globalvariables/globalvariables.component';
import { actions } from './utils/actions';
import { actionParams } from './utils/actionparams';
import { pluginObject } from './pluginobject';
import { application } from './utils/application';
import { credentials } from './utils/credentials';
import { services } from './utils/services';
import { Cruises3Component } from '../cruises3/cruises3.component';

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
  //private gv = new GlobalvariablesComponent();
  public supportedPlugin: pluginObject[] = [];
  public supportedActions: actions[] = [];
  public supportedActionParams: actionParams[] = [];
  public selectedPlugin: pluginObject;
  public selectedAction: actions;
  public selectedActionParams: actionParams;
  private postApp: application = undefined;
  private activeURL: string = undefined;
  //@HostBinding('attr.id') id;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  
  private Application = {};

  constructor(private _httpPlugin: PluginsService, private _cruises3: Cruises3Component, private gv: GlobalvariablesComponent) {
      this.Application = this.gv.initPluginSend;
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
 /**
          Called from the doStageEditor event (stage button clicked)
          
          **/
  private createApp(){
          //var app: application;
          if(undefined === this.postApp){
              this.postApp = new application(this.gv.applicationName,this.gv.applicationId);
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
          this.gv.currentService = JSON.parse(js);
          this.editor.set(this.gv.currentService);
      }
  doPOSTEditor() {
        console.log("doPOSTEditor");
        this.gv.currentService =  this.editor.get();
        this.data = this._httpPlugin.doPOST(this.gv.currentService).then(data => {
            this.data = data;
            this.jsonData = (JSON.stringify(this.data, null, 4));
        });
      //}
    }
  doStageEditor(){
      console.log("doStageEditor");
      this.createApp();
  }
  doClearEditor(){
      console.log("doClearEditor");
      this.postApp = undefined;
      this.gv.currentService = undefined;
      this.editor.set(JSON.parse("{}"));
  }
  doShowEditor(){
      console.log("doShowEditor");
      this.postApp = undefined;
      this.jsonData  = JSON.stringify(this.editor.get(),null,4);
  }
      
  /**
      Output window button events
      
     
      
  doClearOutput(){
      console.log("doClearOutput");
      this.jsonData  = "{}";
  }
  doConvertOutput(){
      console.log("doConvertOutput:"+this.jsonData);
      //this.data = this.jsonData;
      this.editor.data = JSON.parse(JSON.stringify(this.jsonData));
      console.log("-------------------------");
  }
 **/
/**
      Drop down box events
      
      **/
  onEditable(inOb: JsonEditorTreeNode){
      console.log(inOb);
  }
  onPluginChange(plugin: pluginObject){
      this._cruises3.log();
      this.selectedPlugin = plugin;
      this.jsonData = (JSON.stringify(this.selectedPlugin, null, 4));
      this.supportedActions = plugin.actions;
  }
  onActionChange(action: actions){
      this.selectedAction = action
      this.supportedActionParams = action.actionParams;
      this.jsonData = (JSON.stringify(this.selectedAction, null, 4));
  }
  onActionParamChange(actionParams: actionParams){
      this.selectedActionParams = actionParams;
  }
  doUpdateURL(event: any) { // without type info
      this.activeURL = event.target.value;
  }
  doConnect(){
      if(undefined != this.activeURL){
      this._httpPlugin.LastURL = this.activeURL;
      }
  }
  doUpdateObject(event: any){
      this.gv.objectName = event.target.value;
  }
  doLoadObject(event: any){
      this.gv.objectLoad.services[0].parameters.bucketName = this.gv.bucketName;
      this.gv.objectLoad.services[0].parameters.objectName = this.gv.objectName;
      //console.log(JSON.stringify(this.gv.objectLoad, null, 4));
      this.data = this._httpPlugin.doPOST(this.gv.objectLoad).then(data => {
          //console.log(JSON.stringify(data,null,4));
          let len = data["SaveObject.s3GetString"].length;
          let o = JSON.parse(data["SaveObject.s3GetString"].object);
          let p = o.parameters;
          let s = o.services;
          let c = o.credentials;
          //console.log(JSON.stringify(o,null,4));
          this.postApp = new application(p.name, p.id)
          //console.log("name:"+c.parameters.username);
          this.postApp.credentials = new credentials(c.parameters.username, c.parameters.password);
          for(var i=0;i<o.services.length;i++){
              this.postApp.services.push(o.services[i]);
          }
          this.editor.set(JSON.parse(JSON.stringify(this.postApp)));
        });
  }
  doSaveObject(event: any){
      this.gv.objectSave.services[0].parameters.object = JSON.stringify(this.editor.get());
      this.gv.objectSave.services[0].parameters.bucketName = this.gv.bucketName;
      this.gv.objectSave.services[0].parameters.objectName = this.gv.objectName;
      console.log(JSON.stringify(this.gv.objectSave, null, 4));
      this.data = this._httpPlugin.doPOST(this.gv.objectSave).then(data => {
          this.jsonData = (JSON.stringify(data, null, 4));
          
          
        });
  }
}
