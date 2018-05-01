import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './service/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sessionExist: any;
  result: Observable<any>;
  constructor(private login: LoginService) { }

  ngOnInit() {
    this.getSessionExist();
  }

  getSessionExist() {       
        
    //this.sessionExist = this.login.getSessionExist();

    this.result = this.login.getSessionExist(); 

    console.log(this.result);

  }
}
