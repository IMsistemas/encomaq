import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CarrierService } from '../../../service/carrier/carrier.service';
import { Observer } from 'rxjs';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-listcarrier',
  templateUrl: './listcarrier.component.html',
  styleUrls: ['./listcarrier.component.css']
})
export class ListcarrierComponent implements OnInit {

  listCarrier = [];
  listCarrier2: Observable<any>;
  descripcion: any = '';
  /*variables para paginar*/
  state = '1';
  column = 'carriername';
  order = 'ASC';
  loading = false;
  total = 0;
  page = 1;
  limit = 20;
  from = 0;
  num_page = 5;
  select_data: any = '';
  /*variables para paginar*/
  @Input() cliente: any;
  @Output() carrier_s = new EventEmitter<any>();
  constructor(private carrier: CarrierService) { }

  ngOnInit() {
    this.get_list_carrier();
  }

  get_list_carrier() {
    console.log('AAAAAAAAAAA');
    // this.listCarrier = this.carrier.get();
    const o = {
      Buscar: this.descripcion,
      state: this.state,
      column: this.column,
      order: this.order,
      num_page: this.num_page
    };
    this.carrier.filtro_carrier(this.page, o).subscribe(
      (response) => {
        this.listCarrier = response.data;
        console.log(this.listCarrier);
        this.from = response.from;
        this.total = response.total;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      });
  }

  goToPage(n: number): void {
    this.page = n;
    this.get_list_carrier();
  }
  onNext(): void {
    this.page++;
    this.get_list_carrier();
  }
  onPrev(): void {
    this.page--;
    this.get_list_carrier();
  }

  select_carrier(data) {
    this.carrier_s.emit(data);
    $('.listcarrier').modal('hide');
    console.log(this.carrier_s);
  }

}
