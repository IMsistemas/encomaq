import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { LoginService } from './../service/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private login: LoginService) { }

  ngOnInit() {
  }
  verify(data) {
    this.login.verify(data).subscribe(
      (response) => {
        if (response.success === true) {
          
        } else  {
          
        }
      },
      (error) => {

        console.log('POST call in error", respons', error);
        
      });
  }
}
