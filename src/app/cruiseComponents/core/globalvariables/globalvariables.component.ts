import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-globalvariables',
  templateUrl: './globalvariables.component.html',
  styleUrls: ['./globalvariables.component.css']
})
export class GlobalvariablesComponent implements OnInit {
    private engineURL: string;
    public bucketName:string  = "Unselected";
    public objectName: string = "Unselected";
    public region = 'us-west-2';
    public currentService: any;
    public applicationName = "CruiseDirector";
    public applicationId = "Generated";
    public object: any;
    public initPluginSend = {
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
                      "pluginName" : "CruiseCorePlugin",
                      "service":"SomeService",
                      "action" : "info"
                   }
                  }
              ]
            };
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
                      "pluginName" : "CruiseCorePlugin",
                      "service":"SomeService",
                      "action" : "info"
                   }
                  }
              ]
            };

    public initSend = {
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
                      "pluginName" : "CruiseS3",
                      "service":"CruiseS3Connect",
                      "connectionName":"CruiseS3",
                      "region": this.region,
                      "action" : "s3Connect"
                   }
                  },
                  {"parameters" : {
                      "pluginName" : "CruiseS3",
                      "service":"BucketLoadList",
                      "connectionName":"CruiseS3",
                      "action" : "s3ListBuckets"
                   }
                  }
              ]
            };
    public initFileList = {
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
                  "pluginName" : "CruiseS3",
                  "service":"BucketLoadList",
                  "connectionName":"CruiseS3",
                  "action" : "s3ListAllFiles",
                  "bucketName": "unknown"
               }
              }
          ]
        }; 
    public objectSave = {
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
                      "pluginName" : "CruiseS3",
                      "service":"SaveObject",
                      "connectionName":"CruiseS3",
                      "action" : "s3PutString",
                      "bucketName": this.bucketName,
                      "object": this.object,
                      "objectName": this.objectName
                      
                   }
                  }
              ]
            };
    public objectDelete = {
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
                      "pluginName" : "CruiseS3",
                      "service":"DeleteObject",
                      "connectionName":"CruiseS3",
                      "action" : "s3DeleteObject",
                      "bucketName": this.bucketName,
                      "object": this.object,
                      "objectName": this.objectName
                      
                   }
                  }
              ]
            };
    public objectLoad = {
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
                      "pluginName" : "CruiseS3",
                      "service":"LoadObject",
                      "connectionName":"CruiseS3",
                      "action" : "s3GetString",
                      "bucketName": this.bucketName,
                      "objectName": this.objectName
                      
                   }
                  }
              ]
            };
  constructor() { 
      this.engineURL = 'http://ec2-34-214-163-138.us-west-2.compute.amazonaws.com/Cruise';

      //this.engineURL = 'http://localhost:8077/CuiseSite/Cruiselet';
      //this.engineURL = '../Cruiselet';
      //this.engineURL = 'http://steve-env.fijpm3ncun.us-west-2.elasticbeanstalk.com/Cruiselet';
  }
  
  ngOnInit() {
      //this.engineURL = 'http://localhost:8077/CuiseSite/Cruiselet';
      //this.engineURL = '../Cruiselet';
      //this.engineURL = 'http://steve-env.fijpm3ncun.us-west-2.elasticbeanstalk.com/Cruiselet';
  }
  GetEngineURL(){
      return this.engineURL;
  }
  SetEngineURL(inURL: string){
      this.engineURL = inURL;
  }

}
