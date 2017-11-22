import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-globalvariables',
  templateUrl: './globalvariables.component.html',
  styleUrls: ['./globalvariables.component.css']
})
export class GlobalvariablesComponent implements OnInit {
  private engineURL: string;
  constructor() { 
      this.engineURL = 'http://localhost:8079/CuiseSite/Cruiselet';
  }
  
  ngOnInit() {
      this.engineURL = 'http://localhost:8079/CuiseSite/Cruiselet';
  }
  GetEngineURL(){
      return this.engineURL;
  }
  SetEngineURL(inURL: string){
      this.engineURL = inURL;
  }

}
