import { Component, OnInit } from '@angular/core';
import { PluginsService } from '../dataservices/plugins.service';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.css']
})

export class PluginsComponent implements OnInit {
  plugin;
  NewParms = {
          "Application" : {
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
              "services" : {
                "DatabaseConnection" : {},
                "TableUpdate" : {},
                "TableSelect" : {}
              }
            }
          };


  constructor(private _httpPlugin: PluginsService) {
      // console.log("Constructor2 PluginsComponent");
      // this.plugin =  _httpPlugin.getPlugins();
      // console.log(this.plugin);
  }

  ngOnInit() {
      const params = new HttpParams()
      .set('aaa', '111')
      .set('bbb', '222');
      this.plugin = this._httpPlugin.getPlugin('http://localhost:8079/CuiseSite/Cruiselet?TableName=testtable', params);
  }
  onNameKeyUp(event: any) {
      console.log(event.target.value);
  }

}
