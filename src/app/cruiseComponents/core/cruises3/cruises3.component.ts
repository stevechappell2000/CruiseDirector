import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { GlobalvariablesComponent } from '../globalvariables/globalvariables.component';
import { actions } from '../plugins/utils/actions';
import { actionParams } from '../plugins/utils/actionparams';
import { application } from '../plugins/utils/application';
import { services } from '../plugins/utils/services';
import { PluginsService } from '../dataservices/plugins.service';
import { bucketData } from './bucketdata';
import { filedata } from './filedata';

@Component({
  selector: 'app-cruises3',
  templateUrl: './cruises3.component.html',
  styleUrls: ['./cruises3.component.css']
})
export class Cruises3Component implements OnInit {
    public data: any;
    public supportedBuckets: bucketData[] = [];
    public supportedFiles: filedata[] = [];
    public selectedFile: filedata;
    public selectedBucket: bucketData;
    private Application = {};
    
    
   
  constructor(private _httpPlugin: PluginsService, private gv: GlobalvariablesComponent) {
      
  }
  log(){
      
  }
  ngOnInit() {
     this.loadData();
  }
  //    constructor(public bucketName:string, public key: string, public size: string, public lastModified: string, public storageClass: string, public owner: string, public etag: string){
  onFileChange(selectedfile: filedata){
      this.gv.objectName = selectedfile.key;
  }
  loadFiles(){
      this.gv.initFileList.services[0].parameters.bucketName = this.selectedBucket.name;

      this.data = this._httpPlugin.doPOST(this.gv.initFileList).then(data => {
          //this.data = data;
          //console.log(JSON.stringify(data, null, 4));
          let bucketObject = data['BucketLoadList.s3ListAllFiles'].objectSummaries;
          for(let i=0;i<bucketObject.length;i++){
              //console.log('XXXX:'+bucketObject[i].name);
              let el = bucketObject[i];
              //console.log(el);
              this.supportedFiles.push(new filedata(el.bucketName,el.key,el.size,el.lastModified,el.storeageClass,el.owner,el.etag));
              
          }
          //this.jsonData = (JSON.stringify(this.supportedPlugin, null, 4));*/
        });
  }
  loadData(){
      
      this.data = this._httpPlugin.doPOST(this.gv.initSend).then(data => {
          this.data = data;
          //console.log("*************RETURNED");
          //public name:string, public owner: string, public displayName: string, public creationDate: string
          for(let i=0;i<this.data['BucketLoadList.s3ListBuckets'].length;i++){
              console.log('XXXX:'+this.data['BucketLoadList.s3ListBuckets'][i].name);
              let el = this.data['BucketLoadList.s3ListBuckets'][i];
              this.supportedBuckets.push(new bucketData(el.name, el.owner, el.displayName, el.creationDate));
              
          }
          //this.jsonData = (JSON.stringify(this.supportedPlugin, null, 4));*/
        });
  }
  deleteObject(){
          //this.gv.objectName
      this.gv.objectDelete.services[0].parameters.bucketName = this.gv.bucketName;
      this.gv.objectDelete.services[0].parameters.objectName = this.gv.objectName;
      this.data = this._httpPlugin.doPOST(this.gv.objectDelete).then(data => {
          this.data = data;
          //console.log("*************RETURNED");
          //public name:string, public owner: string, public displayName: string, public creationDate: string
          /*for(let i=0;i<this.data['BucketLoadList.s3ListBuckets'].length;i++){
              console.log('XXXX:'+this.data['BucketLoadList.s3ListBuckets'][i].name);
              let el = this.data['BucketLoadList.s3ListBuckets'][i];
              this.supportedBuckets.push(new bucketData(el.name, el.owner, el.displayName, el.creationDate));
              
          }*/
          //this.jsonData = (JSON.stringify(this.supportedPlugin, null, 4));*/
          this.supportedFiles = [];
          this.loadFiles();
        });
  }         
  onBucketChange(bucket: bucketData){
      this.supportedFiles = [];
      this.loadFiles();
      this.gv.bucketName = bucket.name;
  }
  onRefreshList(){
      this.supportedBuckets = [];
      this.supportedFiles = [];
      this.loadData();
  }
  doDeleteObject(){
      this.deleteObject();
  }

}
