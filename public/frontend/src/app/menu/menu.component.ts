import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './../service/login/login.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private login: LoginService) { }

  ngOnInit() {
  }

  confirmLogout() {
    $('#mdlConfirmLogout').modal('show');
  }

  logout() {

    sessionStorage.removeItem('user');

    location.reload();

  }

}
