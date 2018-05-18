import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { LoginService } from './../service/login/login.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login_view = true;
  login_failed: any;
  message_success: any;
  message_error: any;
  year: any;
  constructor(private login: LoginService) { }

  ngOnInit() {

    let date = new Date();
    this.year = date.getFullYear();

  }

  verify(data) {

    this.login.verifyLogin(data).subscribe(
      (response) => {
        if (response.success === true) {

          response.user.password = '';

          localStorage.setItem('user', JSON.stringify(response.user));

          location.reload();

        } else  {

          this.login_failed = 'Email y/o Password incorrecto...';
          $('#view-failed-login').show();

        }
      },
      (error) => {

        console.log('POST call in error", respons', error);

      });

  }

  showLogin() {
    this.login_view = true;
  }

  showRecover() {
    this.login_view = false;
  }

  recover(data) {
    this.login.recover(data).subscribe(
      (response) => {

        if (response.success === true) {

          this.message_success = 'Se ha enviado satisfactoriamente el email de verificacion a su correo...';
          $('#mdlMessageSuccess').modal('show');

        } else  {

          this.message_error = 'Ha ocurrido un error al intentar enviar email de verificacion a su correo';
          $('#mdlMessageError').modal('show');

        }
      },
      (error) => {

        console.log('POST call in error", respons', error);

      });
  }
}
