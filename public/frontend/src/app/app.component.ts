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
       
    this.login.getSessionExist().subscribe(
      (response) => {
        
        this.sessionExist = response.success;
        
      },
      (error) => {

        console.log('POST call in error", respons', error);
        
      });

  }
}
