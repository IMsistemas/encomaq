import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-createreferralguide',
  templateUrl: './createreferralguide.component.html',
  styleUrls: ['./createreferralguide.component.css']
})
export class CreatereferralguideComponent implements OnInit {

  @Output() update_component_father = new EventEmitter<boolean>();
  lis_client = [];
  lis_item = [];
  list_itemcont = [];
  @Input() id_client: any; //
  @Input() item_select: any;

  constructor() { }

  ngOnInit() {
  }

}
