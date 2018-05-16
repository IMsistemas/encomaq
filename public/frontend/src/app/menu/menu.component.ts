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
  username = 'AA';
  user: any;
  constructor(private login: LoginService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.username = this.user.personname + ' ' + this.user.lastnameperson;
  }

  confirmLogout() {
    $('#mdlConfirmLogout').modal('show');
  }

  logout() {

    localStorage.removeItem('user');

    location.reload();

  }

}
