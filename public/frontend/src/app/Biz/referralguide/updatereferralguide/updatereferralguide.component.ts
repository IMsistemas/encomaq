import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-updatereferralguide',
  templateUrl: './updatereferralguide.component.html',
  styleUrls: ['./updatereferralguide.component.css']
})
export class UpdatereferralguideComponent implements OnInit {

  @Output() update_component_father = new EventEmitter<boolean>();
  @Input() tem_edit: any;
  lis_client = [];
  lis_item = [];
  list_itemcont = [];
  @Input() id_client: any; //
  @Input() item_select: any;

  constructor() { }

  ngOnInit() {
  }

}
