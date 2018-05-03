import { element } from 'protractor';
import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../../service/user/user.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  listUser: Observable<any>;
  user_selected: any;
  username_selected: any;
  message_success: any;
  message_error: any;
  constructor(private user: UserService) { }

  ngOnInit() {
  }

}
