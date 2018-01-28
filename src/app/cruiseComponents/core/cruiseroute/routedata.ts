/*
{
            "CruiseRouter": [
                             [
                                 {
                                     "name": "KitchenSink",
                                     "enabled": false,
                                     "server": "http://192.168.56.1",
                                     "port": "8074",
                                     "user": "admin",
                                     "serverCount": 0,
                                     "hitCount": 0,
                                     "failures": 0,
                                     "pluginInfo": [
                                         {
                                             "plugin": "CruiseCorePlugin",
                                             "usage": 0
                                         },
                                         {
                                             "plugin": "CruiseDatabase",
                                             "usage": 0
                                         },
                                         {
                                             "plugin": "CruiseJS",
                                             "usage": 0
                                         },
                                         {
                                             "plugin": "CruiseKafka",
                                             "usage": 0
                                         },
                                         {
                                             "plugin": "CruiseS3",
                                             "usage": 0
                                         }
                                     ]
                                 }
                             ],
                             [
                                 {
                                     "name": "DB1",
                                     "enabled": false,
                                     "server": "http://192.168.56.1",
                                     "port": "8076",
                                     "user": "admin",
                                     "serverCount": 0,
                                     "hitCount": 0,
                                     "failures": 0,
                                     "pluginInfo": [
                                         {
                                             "plugin": "CruiseCorePlugin",
                                             "usage": 0
                                         },
                                         {
                                             "plugin": "CruiseDatabase",
                                             "usage": 0
                                         }
                                     ]
                                 },
                                 {
                                     "name": "DB2",
                                     "enabled": true,
                                     "server": "http://192.168.56.1",
                                     "port": "8075",
                                     "user": "admin",
                                     "serverCount": 0,
                                     "hitCount": 0,
                                     "failures": 0,
                                     "pluginInfo": [
                                         {
                                             "plugin": "CruiseCorePlugin",
                                             "usage": 0
                                         },
                                         {
                                             "plugin": "CruiseDatabase",
                                             "usage": 0
                                         }
                                     ]
                                 }
                             ]
                         ],
                         "runtime": 4
                     };*/


export class routeData {
a : string;
constructor(public name:string, public enavled: string, public server: string, public port: string, public user: string, public serverCount: string, public hitCount: string, public failures: string, public pluginInfo: string[]){
  
 /* 
                                     "name": "KitchenSink",
                                     "enabled": false,
                                     "server": "http://192.168.56.1",
                                     "port": "8074",
                                     "user": "admin",
                                     "serverCount": 0,
                                     "hitCount": 0,
                                     "failures": 0,
                                     "pluginInfo": [
  * 
 */
}
}