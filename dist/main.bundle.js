webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n\t<h2 class=\"text-muted\">\n\t\tDashboard <small>Statistics Overview</small>\n\t</h2>\n\t<div class=\"row\">\n\t\t<div class=\"col-md-12\">\n\t\t\t<img src=\"assets\\img\\slider1.jpg\">\n\t\t</div>\n\t</div>\n\t<hr>\n\t<tabset>\n\t  <tab heading='Cruise-JSON'>\n\t     <app-plugins></app-plugins>\n\t  </tab>\n\t  <tab>\n\t    <ng-template tabHeading>Cruise-UI</ng-template>\n\t    To-Do\n\t  </tab>\n\t</tabset>\n    \n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__cruiseComponents_core_plugins_plugins_component__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/plugins/plugins.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__cruiseComponents_core_dataservices_plugins_service__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/dataservices/plugins.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angular4_jsoneditor__ = __webpack_require__("../../../../angular4-jsoneditor/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_tabs__ = __webpack_require__("../../../../ngx-bootstrap/tabs/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_5__cruiseComponents_core_plugins_plugins_component__["a" /* PluginsComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */],
            __WEBPACK_IMPORTED_MODULE_7_angular4_jsoneditor__["a" /* Ng4JsonEditorModule */],
            __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_tabs__["a" /* TabsModule */].forRoot()
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_6__cruiseComponents_core_dataservices_plugins_service__["a" /* PluginsService */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["b" /* HttpClientModule */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/dataservices/plugins.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PluginsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/@angular/common/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__globalvariables_globalvariables_component__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/globalvariables/globalvariables.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PluginsService = (function () {
    function PluginsService(_http) {
        this._http = _http;
        this.gv = new __WEBPACK_IMPORTED_MODULE_2__globalvariables_globalvariables_component__["a" /* GlobalvariablesComponent */]();
        this.LastURL = this.gv.GetEngineURL();
        console.log('Constructor PluginsService:' + this.LastURL);
    }
    PluginsService.prototype.getPlugin = function (URL, params) {
        var _this = this;
        // 'http://localhost:8079/CuiseSite/Cruiselet?TableName=testtable'
        this.LastURL = URL;
        console.log('FetchData PluginsService');
        this._http.get(URL, params).subscribe(function (data) {
            _this.PlugInData = data;
            console.log(JSON.stringify(data));
            console.log(data);
            return data;
        });
    };
    PluginsService.prototype.setCruiseEngine = function (inURL) {
        this.LastURL = inURL;
    };
    PluginsService.prototype.doGET = function () {
        var _this = this;
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
        var url = "" + this.LastURL;
        return new Promise(function (resolve) {
            _this._http.get(url).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    PluginsService.prototype.doPOST = function (Application) {
        var _this = this;
        console.log("POST:" + this.LastURL + "/" + JSON.stringify(Application));
        var url = "" + this.LastURL;
        var body = JSON.stringify({ Application: Application });
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
        return new Promise(function (resolve) {
            _this._http.post(url, body).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    PluginsService.prototype.doPUT = function () {
        console.log("PUT");
    };
    PluginsService.prototype.doDELETE = function () {
        console.log("DELETE");
    };
    PluginsService.prototype.doGETAsPromise = function () {
        console.log("GET AS PROMISE");
    };
    PluginsService.prototype.doGETAsPromiseError = function () {
        console.log("GET AS PROMISE ERROR");
    };
    PluginsService.prototype.doGETAsObservableError = function () {
        console.log("GET AS OBSERVABLE ERROR");
    };
    PluginsService.prototype.doGETWithHeaders = function () {
        console.log("GET WITH HEADERS");
    };
    return PluginsService;
}());
PluginsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]) === "function" && _a || Object])
], PluginsService);

var _a;
//# sourceMappingURL=plugins.service.js.map

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/globalvariables/globalvariables.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/globalvariables/globalvariables.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  globalvariables works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/globalvariables/globalvariables.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalvariablesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GlobalvariablesComponent = (function () {
    function GlobalvariablesComponent() {
        this.engineURL = 'http://cruise-env.aferuuzpxv.us-west-2.elasticbeanstalk.com/Cruiselet';
        //this.engineURL = 'http://steve-env.fijpm3ncun.us-west-2.elasticbeanstalk.com/Cruiselet';
    }
    GlobalvariablesComponent.prototype.ngOnInit = function () {
        this.engineURL = 'http://cruise-env.aferuuzpxv.us-west-2.elasticbeanstalk.com/Cruiselet';
        //this.engineURL = 'http://steve-env.fijpm3ncun.us-west-2.elasticbeanstalk.com/Cruiselet';
    };
    GlobalvariablesComponent.prototype.GetEngineURL = function () {
        return this.engineURL;
    };
    GlobalvariablesComponent.prototype.SetEngineURL = function (inURL) {
        this.engineURL = inURL;
    };
    return GlobalvariablesComponent;
}());
GlobalvariablesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-globalvariables',
        template: __webpack_require__("../../../../../src/app/cruiseComponents/core/globalvariables/globalvariables.component.html"),
        styles: [__webpack_require__("../../../../../src/app/cruiseComponents/core/globalvariables/globalvariables.component.css")]
    }),
    __metadata("design:paramtypes", [])
], GlobalvariablesComponent);

//# sourceMappingURL=globalvariables.component.js.map

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/plugins/pluginobject.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return pluginObject; });
var pluginObject = (function () {
    function pluginObject(name, version, vendor, actions) {
        if (actions === void 0) { actions = []; }
        this.name = name;
        this.version = version;
        this.vendor = vendor;
        this.actions = actions;
        this.Actions = [];
        //this.Actions = actions;
        //console.log();
    }
    return pluginObject;
}());

//# sourceMappingURL=pluginobject.js.map

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/plugins/plugins.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "    #jsoneditor {\r\n      width: '100%';\r\n      height: '100%';\r\n    }\r\n    #jsondisplay {\r\n      width: '100%';\r\n      height: '100%';\r\n    }\r\n    body, html {\r\n      font-family: \"DejaVu Sans\", sans-serif;\r\n    }\r\n\r\n    p, li {\r\n      width: 100%;\r\n      font-size: 10.5pt;\r\n    }\r\n\r\n    code {\r\n      background: #f5f5f5;\r\n    }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/plugins/plugins.component.html":
/***/ (function(module, exports) {

module.exports = "<!-- button class=\"btn btn-outline-secondary\"  [ngbTooltip]=\"tipContent\">Show</button -->\n\t<div class=\"row\">\n\t\t<div class=\"col-xl-3 col-lg-6\">\n\t\t\t<div class=\"card card-primary card-inverse\">\n\t\t\t\t<div class=\"card-header card-primary\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-xs-3\">\n\t\t\t\t\t\t\t<i class=\"fa fa-comments fa-5x\"></i>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-xs-9 text-xs-right\">\n\t\t\t\t\t\t<div class=\"huge\">{{supportedPlugin.length}}</div>\n\t\t\t\t\t\t\t<div class=\"huge\">Supported Plugins</div>\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div>\n\t\t\t\t\t<select [(ngModel)]=\"selectedPlugin\" (ngModelChange)=\"onPluginChange($event)\">\n\t\t\t\t\t  <option *ngFor=\"let sp of supportedPlugin\" title=\" By:{{sp.vendor}} Version:{{sp.version}}\" [ngValue]=\"sp\">{{sp.name}} </option>\n\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"col-xl-3 col-lg-6\">\n\t\t\t<div class=\"card card-success card-inverse\">\n\t\t\t\t<div class=\"card-header card-success\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-xs-3\">\n\t\t\t\t\t\t\t<i class=\"fa fa-tasks fa-5x\"></i>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-xs-9 text-xs-right\">\n\t\t\t\t\t\t\t<div class=\"huge\">{{supportedActions.length}}</div>\n\t\t\t\t\t\t\t<div>Supported Actions</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div >\n\t\t\t\t\t<select [(ngModel)]=\"selectedAction\" (ngModelChange)=\"onActionChange($event)\">\n\t\t\t\t\t  <option *ngFor=\"let sa of supportedActions\" title=\"{{sa.actionDesc}}\" [ngValue]=\"sa\">{{sa.actionName}}</option>\n\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"col-xl-3 col-lg-6\">\n\t\t\t<div class=\"card card-warning card-inverse\">\n\t\t\t\t<div class=\"card-header card-warning\">\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t\t<div class=\"col-xs-3\">\n\t\t\t\t\t\t\t<i class=\"fa fa-shopping-cart fa-5x\"></i>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"col-xs-9 text-xs-right\">\n\t\t\t\t\t\t\t<div class=\"huge\">{{supportedActionParams.length}}</div>\n\t\t\t\t\t\t\t<div>New Orders!</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div >\n\t\t\t\t\t<select [(ngModel)]=\"selectedActionParams\" (ngModelChange)=\"onActionParamChange($event)\">\n\t\t\t\t\t  <option *ngFor=\"let sap of supportedActionParams\" title=\"{{sap.paramDesc}}\" [ngValue]=\"sap\">{{sap.paramName}}</option>\n\n\t\t\t\t\t</select>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t</div>\n\t<div class=\"row\">\n\t    <input type=\"url\" class=\"form-control\" id=\"myURL\" (blur)=\"doUpdateURL($event)\" aria-describedby=\"urlHelp\" placeholder=\"http://localhost:4200\">\n\t    <!-- button class=\"btn btn-primary btn-sm active\"  (click)=\"doConnect()\" title=\"Connect to Cruise Engine.\">Clear</button -->\n\t</div>\n\t<div class=\"row\">\n\t\t<div class=\"col-lg-5\">\n\t\t\t<div class=\"card card-default\">\n\t\t\t\t<div class=\"card-header\">\n\t\t\t\t\t<i class=\"fa fa-clock-o fa-fw\"></i>Editor:\n\t\t\t\t\t<button class=\"btn btn-primary btn-sm active\"  (click)=\"doClear()\" title=\"Clears the Editor Content\">Clear</button>\n\t\t\t\t    <button class=\"btn btn-primary btn-sm active\" (click)=\"doStage()\" title=\"Moves the selected Plugin and Action to the editor\">Stage</button>\n\t\t\t\t  \t<button class=\"btn btn-primary btn-sm active\" (click)=\"doPOST()\" title=\"Sends the editor content to the Cruise Engine\">Send</button>\n\t\t\t\t  \t<button class=\"btn btn-primary btn-sm active\" (click)=\"doShow()\" title=\"Shows the raw JSON from the editor in the Response area.\">Show</button>\n\t\t\t\t</div>\n\t\t\t\t\t<div id=\"jsoneditor\">\n\t\t\t\t\t\t<json-editor [options]=\"editorOptions\" [data]=\"Application\"></json-editor>\n\t\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"col-lg-5\">\n\t\t\t<div class=\"card card-default\">\n\t\t\t\t<div class=\"card-header\">\n\t\t\t\t\t<i class=\"fa fa-bell fa-fw\"></i> Response\n\t\t\t\t\t<button class=\"btn btn-primary btn-sm active\" (click)=\"doClearOutput()\">Clear</button>\n\t\t\t\t    <button class=\"btn btn-primary btn-sm active\" (click)=\"doConvert()\">Edit</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"m-t-1\">\n\n\t\t\t\t</div>\n\t\t\t\t<!-- /.card-header -->\n\t\t\t\t<div id=\"jsondisplay\">\n\t\t\t\t\t  <div class=\"form-group\">\n\t\t\t\t\t    <textarea class=\"form-control\" id=\"exampleTextarea\" rows=\"25\">{{jsonData}}</textarea>\n\t\t\t\t\t  </div>\n\n\t\t\t\t</div>\n\t\t\t\t<!-- /.card-body -->\n\t\t\t</div>\n\t\t\t<!-- /.card -->\n\n\t\t\t<!-- /.card .chat-card -->\n\t\t</div>\n\t</div>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/plugins/plugins.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PluginsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dataservices_plugins_service__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/dataservices/plugins.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular4_jsoneditor_jsoneditor_jsoneditor_component__ = __webpack_require__("../../../../angular4-jsoneditor/jsoneditor/jsoneditor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__globalvariables_globalvariables_component__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/globalvariables/globalvariables.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pluginobject__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/plugins/pluginobject.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_application__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/plugins/utils/application.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_services__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/plugins/utils/services.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PluginsComponent = (function () {
    function PluginsComponent(_httpPlugin) {
        this._httpPlugin = _httpPlugin;
        this.gv = new __WEBPACK_IMPORTED_MODULE_3__globalvariables_globalvariables_component__["a" /* GlobalvariablesComponent */]();
        this.supportedPlugin = [];
        this.supportedActions = [];
        this.supportedActionParams = [];
        this.postApp = null;
        this.activeURL = undefined;
        this.Application = {};
        this.initSend = {
            "parameters": {
                "name": "sampleapp",
                "id": "sampleid"
            },
            "credentials": {
                "parameters": {
                    "password": "admin",
                    "username": "admin"
                }
            },
            "services": [
                { "parameters": {
                        "pluginName": "CruiseCorePlugin",
                        "service": "SomeService",
                        "action": "info"
                    }
                }
            ]
        };
        this.customSend = {
            "parameters": {
                "name": "sampleapp",
                "id": "sampleid"
            },
            "credentials": {
                "parameters": {
                    "password": "admin",
                    "username": "admin"
                }
            },
            "services": [
                { "parameters": {
                        "pluginName": "CruiseCorePlugin",
                        "service": "SomeService",
                        "action": "info"
                    }
                }
            ]
        };
        this.Application = this.initSend;
        this.editorOptions = new __WEBPACK_IMPORTED_MODULE_2_angular4_jsoneditor_jsoneditor_jsoneditor_component__["b" /* JsonEditorOptions */]();
        this.editorOptions.modes = ['code', 'form', 'text', 'tree', 'view']; // set all allowed modes
        this.data = this.Application;
    }
    PluginsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data = this._httpPlugin.doPOST(this.Application).then(function (data) {
            _this.data = data;
            for (var i = 0; i < _this.data.Plugins.length; i++) {
                //console.log('XXXX:'+this.data.Plugins[i].plugInMetaData.name);
                var el = _this.data.Plugins[i].plugInMetaData;
                _this.supportedPlugin.push(new __WEBPACK_IMPORTED_MODULE_4__pluginobject__["a" /* pluginObject */](el.name, el.version, el.vendor, el.actions));
            }
            _this.jsonData = (JSON.stringify(_this.supportedPlugin, null, 4));
        });
    };
    PluginsComponent.prototype.onNameKeyUp = function (event) {
        console.log(event.target.value);
    };
    PluginsComponent.prototype.doPOST = function () {
        var _this = this;
        this.data = this._httpPlugin.doPOST(this.editor.get()).then(function (data) {
            _this.data = data;
            _this.jsonData = (JSON.stringify(_this.data, null, 4));
        });
        //}
    };
    PluginsComponent.prototype.createApp = function () {
        //var app: application;
        if (null === this.postApp) {
            this.postApp = new __WEBPACK_IMPORTED_MODULE_5__utils_application__["a" /* application */]("test", "test");
        }
        var ser = new __WEBPACK_IMPORTED_MODULE_6__utils_services__["a" /* services */](this.selectedPlugin.name); //
        ser.addParam("action", this.selectedAction.actionName);
        for (var i = 0; i < this.selectedAction.actionParams.length; i++) {
            if (this.selectedAction.actionParams[i].paramName != 'ID') {
                ser.addParam(this.selectedAction.actionParams[i].paramName, this.selectedAction.actionParams[i].paramDefault);
            }
        }
        this.postApp.addService(ser);
        var js = JSON.stringify(this.postApp, null, 4);
        this.editor.set(JSON.parse(js));
    };
    PluginsComponent.prototype.doStage = function () {
        this.createApp();
    };
    PluginsComponent.prototype.doClear = function () {
        this.postApp = null;
        this.editor.set(JSON.parse("{}"));
    };
    PluginsComponent.prototype.doClearOutput = function () {
        this.jsonData = "{}";
    };
    PluginsComponent.prototype.doConvert = function () {
        this.editor.set(JSON.parse(this.jsonData));
    };
    PluginsComponent.prototype.doShow = function () {
        this.postApp = null;
        this.jsonData = JSON.stringify(this.editor.get(), null, 4);
    };
    PluginsComponent.prototype.onActionChange = function (action) {
        this.selectedAction = action;
        this.supportedActionParams = action.actionParams;
        this.jsonData = (JSON.stringify(this.selectedAction, null, 4));
    };
    PluginsComponent.prototype.onActionParamChange = function (actionParams) {
        this.selectedActionParams = actionParams;
    };
    PluginsComponent.prototype.onPluginChange = function (plugin) {
        this.selectedPlugin = plugin;
        this.jsonData = (JSON.stringify(this.selectedPlugin, null, 4));
        this.supportedActions = plugin.actions;
    };
    PluginsComponent.prototype.doUpdateURL = function (event) {
        this.activeURL = event.target.value;
    };
    PluginsComponent.prototype.doConnect = function () {
        if (undefined != this.activeURL) {
            this._httpPlugin.LastURL = this.activeURL;
        }
    };
    return PluginsComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_angular4_jsoneditor_jsoneditor_jsoneditor_component__["a" /* JsonEditorComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2_angular4_jsoneditor_jsoneditor_jsoneditor_component__["a" /* JsonEditorComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_angular4_jsoneditor_jsoneditor_jsoneditor_component__["a" /* JsonEditorComponent */]) === "function" && _a || Object)
], PluginsComponent.prototype, "editor", void 0);
PluginsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-plugins',
        template: __webpack_require__("../../../../../src/app/cruiseComponents/core/plugins/plugins.component.html"),
        styles: [__webpack_require__("../../../../../src/app/cruiseComponents/core/plugins/plugins.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__dataservices_plugins_service__["a" /* PluginsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__dataservices_plugins_service__["a" /* PluginsService */]) === "function" && _b || Object])
], PluginsComponent);

var _a, _b;
//# sourceMappingURL=plugins.component.js.map

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/plugins/utils/application.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return application; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__credentials__ = __webpack_require__("../../../../../src/app/cruiseComponents/core/plugins/utils/credentials.ts");

var application = (function () {
    function application(appName, id) {
        this.parameters = {};
        this.services = [];
        this.credentials = new __WEBPACK_IMPORTED_MODULE_0__credentials__["a" /* credentials */]("admin", "admin");
        this.parameters['name'] = appName;
        this.parameters['id'] = id;
    }
    application.prototype.addParam = function (name, value) {
        this.parameters[name] = value;
    };
    application.prototype.getParam = function (name) {
    };
    application.prototype.addCredential = function (cred) {
        this.credentials = cred;
    };
    application.prototype.addService = function (serv) {
        this.services.push(serv);
    };
    return application;
}());

//# sourceMappingURL=application.js.map

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/plugins/utils/credentials.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return credentials; });
var credentials = (function () {
    function credentials(username, password) {
        this.parameters = {};
        this.parameters["username"] = username;
        this.parameters["password"] = password;
    }
    credentials.prototype.addParam = function (name, value) {
        this.parameters[name] = value;
    };
    credentials.prototype.getParam = function (name) {
    };
    return credentials;
}());

//# sourceMappingURL=credentials.js.map

/***/ }),

/***/ "../../../../../src/app/cruiseComponents/core/plugins/utils/services.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return services; });
var services = (function () {
    function services(value) {
        this.parameters = {};
        this.parameters["pluginName"] = value;
    }
    services.prototype.addParam = function (name, value) {
        this.parameters[name] = value;
    };
    services.prototype.getParam = function (name) {
    };
    return services;
}());

//# sourceMappingURL=services.js.map

/***/ }),

/***/ "../../../../../src/app/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false,
    defaultEngine: 'http://localhost:8079/CuiseSite/Cruiselet'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__("../../../../../src/polyfills.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app___ = __webpack_require__("../../../../../src/app/index.ts");





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_20" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app___["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../../src/polyfills.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__("../../../../core-js/es6/symbol.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__("../../../../core-js/es6/object.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__("../../../../core-js/es6/function.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__("../../../../core-js/es6/parse-int.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__("../../../../core-js/es6/parse-float.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__("../../../../core-js/es6/number.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__("../../../../core-js/es6/math.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__("../../../../core-js/es6/string.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__("../../../../core-js/es6/date.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__("../../../../core-js/es6/array.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__("../../../../core-js/es6/regexp.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__("../../../../core-js/es6/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__("../../../../core-js/es6/set.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__("../../../../core-js/es6/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__("../../../../core-js/es7/reflect.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__("../../../../zone.js/dist/zone.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
// This file includes polyfills needed by Angular 2 and is loaded before
// the app. You can add your own extra polyfills to this file.
















//# sourceMappingURL=polyfills.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map