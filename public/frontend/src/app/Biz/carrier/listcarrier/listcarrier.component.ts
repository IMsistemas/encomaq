import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ContractService } from '../../../service/bcontract/contract.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-listcarrier',
  templateUrl: './listcarrier.component.html',
  styleUrls: ['./listcarrier.component.css']
})
export class ListcarrierComponent implements OnInit {

  list_contract = [];
  descripcion: any = '';
  /*variables para paginar*/
  loading = false;
  total = 0;
  page = 1;
  limit = 0;
  from = 0;
  /*variables para paginar*/
  @Input() cliente: any;
  @Output() idcontract = new EventEmitter<any>();
  constructor(private contract: ContractService) { }

  ngOnInit() {
    this.get_list_contract();
  }

  get_list_contract() {
    const o = {
      Buscar: this.descripcion,
      state: '1',
      column: 'nocontract',
      order: 'DESC',
      num_page: 5
    };
    this.contract.filtro_contract(this.page, o).subscribe(
      (response) => {
        this.list_contract = response.data;
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
    this.get_list_contract();
  }
  onNext(): void {
    this.page++;
    this.get_list_contract();
  }
  onPrev(): void {
    this.page--;
    this.get_list_contract();
  }

  select_contract(data) {
    this.idcontract.emit(data);
    $('.listcontract').modal('hide');
  }

}
