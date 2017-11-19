import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PluginsService {
    PlugInData;
    constructor(private _http: HttpClient) {
        console.log('Constructor PluginsService');
    }
    getPlugin(URL: string, params: object) {
        // 'http://localhost:8079/CuiseSite/Cruiselet?TableName=testtable'

        console.log('FetchData PluginsService');
        this._http.get(URL, params).subscribe(data => {
            this.PlugInData = data;
            console.log(JSON.stringify(data));
            console.log(data);
            return data;
        });

    }

}
