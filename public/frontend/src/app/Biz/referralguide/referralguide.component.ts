import { Component, OnChanges, Output, EventEmitter, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReferralguideService } from '../../service/referralguide/referralguide.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-referralguide',
  templateUrl: './referralguide.component.html',
  styleUrls: ['./referralguide.component.css']
})
export class ReferralguideComponent implements OnInit {
  @Output() update_component_father = new EventEmitter<boolean>();

  listReferralGuide: Observable<any>;
  message_success: any;
  message_error: any;
  referralguide_selected: any;

  descripcion: any = '';
  idcategory: any = '';
  idunittype: any = '';
  state = '1';
  column = 'biz_contract.nocontract';
  search: any = '';
  order = 'ASC';
  num_page = 5;
  /*variables para paginar*/
  loading = false;
  total = 0;
  page = 1;
  limit = 0;
  from = 0;
  /*variables para paginar*/
  idcliente_select: any;
  globalitem_select: any;

  constructor(private referralguide: ReferralguideService) { }

  ngOnInit() {
    this.loadInitJQuery();
  }

  loadInitJQuery() {
    $('.dropdown-toggle').dropdown();
    $('.modal-dialog').draggable();
  }

  getList() {

    const o = {
      search: this.search,
      state: this.state,
      column: this.column,
      order: this.order,
      num_page: this.num_page
    };

    this.referralguide.get(this.page, o).subscribe(
      (response) => {
        this.listReferralGuide = response.data;
        this.from = response.from;
        this.total = response.total;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      });

  }

  create() {

  }

  editSelected(item: any) {

  }

  confirmSetState(item: any) {

  }

  confirmDelete(item: any) {

  }

  setState() {

  }

  delete() {

  }

  updateList(event, type) {
    if (event === true) {

      if (type === 'create') {

        this.message_success = 'Se ha creado satisfactoriamente el Usuario';

      } else {

        this.message_success = 'Se ha editado satisfactoriamente el Usuario seleccionado';

      }

      $('#mdlMessageSuccess').modal('show');


    } else {

      if (type === 'create') {

        this.message_error = 'Ha ocurrido un error al intentar agregar un Usuario o el mismo ya existe en el sistema...';

      } else {

        this.message_error = 'Ha ocurrido un error al intentar editar el Usuario seleccionado o el mismo nombre ya existe en el sistema';

      }

      $('#mdlMessageError').modal('show');

    }

    this.getList();

  }

  goToPage(n: number): void {
    this.page = n;
    this.getList();
  }

  onNext(): void {
    this.page++;
    this.getList();
  }

  onPrev(): void {
    this.page--;
    this.getList();
  }

}
