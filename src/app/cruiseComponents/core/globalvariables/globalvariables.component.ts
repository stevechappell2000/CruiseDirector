import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-globalvariables',
  templateUrl: './globalvariables.component.html',
  styleUrls: ['./globalvariables.component.css']
})
export class GlobalvariablesComponent implements OnInit {
  private engineURL: string;
  constructor() { 
      this.engineURL = 'http://cruise-env.aferuuzpxv.us-west-2.elasticbeanstalk.com/Cruiselet';
      //this.engineURL = 'http://steve-env.fijpm3ncun.us-west-2.elasticbeanstalk.com/Cruiselet';
  }
  
  ngOnInit() {
      this.engineURL = 'http://cruise-env.aferuuzpxv.us-west-2.elasticbeanstalk.com/Cruiselet';
      //this.engineURL = 'http://steve-env.fijpm3ncun.us-west-2.elasticbeanstalk.com/Cruiselet';
  }
  GetEngineURL(){
      return this.engineURL;
  }
  SetEngineURL(inURL: string){
      this.engineURL = inURL;
  }

}
