import { element } from 'protractor';
import { Component, OnChanges, Output, EventEmitter, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CarrierService } from './../../service/carrier/carrier.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['./carrier.component.css']
})
export class CarrierComponent implements OnInit {
  @Output() update_component_father = new EventEmitter<boolean>();
  listCarrier: Observable<any>;
  carrier_selected: any;
  carriername_selected: any;
  message_success: any;
  message_error: any;
  constructor(private carrier: CarrierService) { }

  ngOnInit() {
    this.loadInitJQuery();
    this.getListCarrier();
  }

  loadInitJQuery() {
    $('.dropdown-toggle').dropdown();
    $('.modal-dialog').draggable();
  }

  getListCarrier() {
    this.listCarrier = this.carrier.get();
  }

}
