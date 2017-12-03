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



@NgModule({
  declarations: [
    AppComponent,
    PluginsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Ng4JsonEditorModule,
    TabsModule.forRoot()
  ],
  providers: [PluginsService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
