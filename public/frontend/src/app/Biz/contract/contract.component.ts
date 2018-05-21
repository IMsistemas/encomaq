import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ContractService } from '../../service/bcontract/contract.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  message_info: any;
  list_contract = [];
  info_tem_edit: any;
  tem_cancel_activate: any;
  msm_cancel_activate: any;
  descripcion: any = '';
  idcategory: any = '';
  idunittype: any = '';
  state = '1';
  column = 'biz_contract.nocontract';
  order = 'ASC';
  num_page = 5;
  /*variables para paginar*/
  loading = false;
  total = 0;
  page = 1;
  limit = 0;
  from = 0;
  /*variables para paginar*/
  idcliente_select = '';
  constructor(private contract: ContractService) { }

  ngOnInit() {
    $('#myTab a').on('click', function (e) {
      e.preventDefault();
      $(this).tab('show');
    });
    $('.modal').draggable();
    $('.dropdown-toggle').dropdown();
    this.get_list_contract();
  }
  get_list_contract() {
    const o = {
      Buscar: this.descripcion,
      idcategoryitem: this.idcategory,
      idunittype: this.idunittype,
      state: this.state,
      column: this.column,
      order: this.order,
      num_page: this.num_page
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
  new_contract() {
    this.idcliente_select = '';
    $('#addcontract').modal('show');
  }
  update_list(evento, type) {
    if (evento === true) {
      if (type === 'create') {
        this.message_info = 'Sea guardado correctamente los datos..!!';
        $('#mdlMessageSuccess').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Sea editado correctamente los datos..!!';
        $('#mdlMessageSuccess').modal('show');
      }
    } else {
      if (type === 'create') {
        this.message_info = 'Ha ocurrido un error al intentar agregar un contrato o el mismo ya existe en el sistema..!!';
        $('#mdlMessageError').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Ha ocurrido un error al intentar editar un contrato o el mismo ya existe en el sistema..!!';
        $('#mdlMessageError').modal('show');
      }
    }
    this.get_list_contract();
  }

  idclient_select(n): void {
    this.idcliente_select = n;
  }
}
