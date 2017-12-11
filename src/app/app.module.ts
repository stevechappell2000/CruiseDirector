import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PluginsComponent } from './cruiseComponents/core/plugins/plugins.component';
import { PluginsService } from './cruiseComponents/core/dataservices/plugins.service';
import { Ng4JsonEditorModule } from 'angular4-jsoneditor';
import { GlobalvariablesComponent } from './cruiseComponents/core/globalvariables/globalvariables.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule} from 'ngx-bootstrap/accordion';
import { Cruises3Component } from './cruiseComponents/core/cruises3/cruises3.component';
import { CodemirrorModule } from 'ng2-codemirror';
//import {MatButtonModule, MatCheckboxModule, MatListModule} from '@angular/material';
//import { PopupModule } from 'ng2-opd-popup';
//import { CruisepopupComponent } from './cruiseComponents/core/cruisepopup/cruisepopup.component';



@NgModule({
  declarations: [
    AppComponent,
    PluginsComponent,
    Cruises3Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Ng4JsonEditorModule,
    CodemirrorModule,
    TabsModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [PluginsService, HttpClientModule,Cruises3Component,GlobalvariablesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { 



}
