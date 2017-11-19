import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PluginsComponent } from './cruiseComponents/core/plugins/plugins.component';
import { ProjectsComponent } from './cruiseComponents/core/projects/projects.component';
import { PluginsService } from './cruiseComponents/core/dataservices/plugins.service';

@NgModule({
  declarations: [
    AppComponent,
    PluginsComponent,
    ProjectsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [PluginsService, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
