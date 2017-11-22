import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import { PluginsComponent } from '../plugins/plugins.component';
import { GlobalvariablesComponent } from '../globalvariables/globalvariables.component';
@Injectable()
export class PluginsService {
    PlugInData;
    LastURL: string;
    gv: GlobalvariablesComponent;
    constructor(private _http: HttpClient) {
        this.gv = new GlobalvariablesComponent();
        this.LastURL = this.gv.GetEngineURL();
        console.log('Constructor PluginsService:'+this.LastURL);
    }
    getPlugin(URL: string, params) {
        // 'http://localhost:8079/CuiseSite/Cruiselet?TableName=testtable'
        this.LastURL = URL;
        console.log('FetchData PluginsService');
        this._http.get(URL, params).subscribe(data => {
            this.PlugInData = data;
            console.log(JSON.stringify(data));
            console.log(data);
            return data;
        });
        
    }
    setCruiseEngine(inURL: string){
        this.LastURL = inURL;
    }
    doGET() {
        /*console.log("GET:"+this.LastURL);
        let url = `${this.LastURL}`;
        return this._http.get(url).retry(3).subscribe(res => {
            console.log("Hello:"+res)
            return res;
        },
        (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              // A client-side or network error occurred. Handle it accordingly.
              console.log('An error occurred:', err.error.message);
            } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong,
              console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            }
        });*/
        let url = `${this.LastURL}`;
        return new Promise(resolve => {
            this._http.get(url).subscribe(data => {
              resolve(data);
            }, err => {
              console.log(err);
            });
          });
    }
    
    doPOST(Application) {
        console.log("POST:"+this.LastURL+"/"+JSON.stringify(Application));
        let url = `${this.LastURL}`;
        
        let body = JSON.stringify({ Application });
        /*let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        
        this._http.post(url, body).subscribe(res => {
            console.log("Hello:"+res)
            return res;
        },
        (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
              // A client-side or network error occurred. Handle it accordingly.
              console.log('An error occurred:', err.error.message);
            } else {
              // The backend returned an unsuccessful response code.
              // The response body may contain clues as to what went wrong,
              console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            }
        });*/
        
        return new Promise(resolve => {
            this._http.post(url, body).subscribe(data => {
              resolve(data);
            }, err => {
              console.log(err);
            });
          });
    }
    
    doPUT() {
        console.log("PUT");
    }
    
    doDELETE() {
        console.log("DELETE");
    }
    
    doGETAsPromise() {
        console.log("GET AS PROMISE");
    }
    
    doGETAsPromiseError() {
        console.log("GET AS PROMISE ERROR");
    }
    
    doGETAsObservableError() {
        console.log("GET AS OBSERVABLE ERROR");
    }
    
    doGETWithHeaders() {
        console.log("GET WITH HEADERS");
    }
}
