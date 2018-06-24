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
  info_tem_edit: any;

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
  idcontract_select: any;
  globalitem_select: any;
  objectcarrier_select: any;

  constructor(private referralguide: ReferralguideService) { }

  ngOnInit() {
    this.loadInitJQuery();
    this.getList();
  }

  loadInitJQuery() {
    $('#myTab a').on('click', function (e) {
      e.preventDefault();
      $(this).tab('show');
    });
    $('.modal').draggable();
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
        console.log(response.data);
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
    $('#createreferralguide').modal('show');
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

  contract_select(n): void {
    this.idcontract_select = n;
  }

  itemglobal_select(n): void {
    this.globalitem_select = n;
  }

  carrier_select(n): void {
    this.objectcarrier_select = n;
  }

  updateList(event, type) {
    if (event === true) {

      if (type === 'create') {

        this.message_success = 'Se ha creado satisfactoriamente la guía de remisión';

      } else {

        this.message_success = 'Se ha editado satisfactoriamente la guía de remisión';

      }

      $('#mdlMessageSuccess').modal('show');


    } else {

      if (type === 'create') {

        this.message_error = 'Ha ocurrido un error al intentar agregar la guía de remisión o la misma ya existe en el sistema';

      } else {

        this.message_error = 'Ha ocurrido un error al intentar editar la guía de remisión o la misma  ya existe en el sistema';

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
