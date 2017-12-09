import { Component } from '@angular/core';
import { GlobalvariablesComponent } from './cruiseComponents/core/globalvariables/globalvariables.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
    constructor(private gv: GlobalvariablesComponent) {
        console.log("Hello from app:"+gv.bucketName);
    }
    
}
