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
  message_info: any;
  message_error: any;
  referralguide_selected: any;
  tem_cancel_activate: any;
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
      search: this.descripcion,
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
    $('#createreferralguide').modal('show');
  }

  editSelected(item: any) {
    console.log(item);
    this.info_tem_edit = item;
    this.idcontract_select = item.biz_contract;
    this.objectcarrier_select = item.biz_carrier;
    $('#updatereferralguide').modal('show');
  }



  confirmDelete(item: any) {

  }

  setState() {

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

        this.message_info = 'Se ha creado satisfactoriamente la guía de remisión';

      } else {

        this.message_info = 'Se ha editado satisfactoriamente la guía de remisión';

      }

      $('#mdlMessageSuccess').modal('show');


    } else {

      if (type === 'create') {

        this.message_info = 'Ha ocurrido un error al intentar agregar la guía de remisión o la misma ya existe en el sistema';

      } else {

        this.message_info = 'Ha ocurrido un error al intentar editar la guía de remisión o la misma  ya existe en el sistema';

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
  refresfather(data: any) {
    this.getList();
  }
  cancel_activate(data: any) {
    this.tem_cancel_activate = data;
    $('#mdl_cancelactivate').modal('show');
  }
  ok_cancelactivate() {
    this.referralguide.updateState(this.tem_cancel_activate.idreferralguide).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_cancelactivate').modal('hide');
          this.message_info = 'Se ha guardado correctamente los datos!';
          $('#mdlMessageSuccess').modal('show');
          this.getList();
        } else if (response.error !== undefined) {
          $('#mdl_cancelactivate').modal('hide');
          this.message_info = 'Error al anular los datos!';
          $('#mdlMessageError').modal('show');
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        this.message_info = 'Error al anular los datos!';
        $('#mdlMessageError').modal('show');
        $('#mdl_cancelactivate').modal('hide');
      });
  }
  delete(data: any) {
    this.tem_cancel_activate = data;
    $('#mdl_delete').modal('show');
  }
  ok_delete() {
    this.referralguide.delete(this.tem_cancel_activate.idreferralguide).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_delete').modal('hide');
          this.message_info = 'Se elimino correctamente los datos!';
          $('#mdlMessageSuccess').modal('show');
          this.getList();
        } else if (response.error !== undefined) {
          $('#mdl_delete').modal('hide');
          this.message_info = 'Error al eliminar los datos!';
          $('#mdlMessageError').modal('show');
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        this.message_info = 'Error al eliminar los datos!';
        $('#mdlMessageError').modal('show');
        $('#mdl_delete').modal('hide');
      });
  }
  excel() {
    $('#list_guiaremision').table2excel({
      exclude: '.noExl',
      filename: 'Lista de guía de remisión'
    });
  }
  pdf() {
    const o = {
      search: this.descripcion,
      state: this.state,
      column: this.column,
      order: this.order,
      num_page: this.num_page
    };
    const accion = this.referralguide.filtro_referraexportarpdf(o);
    console.log(accion);
    $('#printtitle').html('Lista de guía de remisión');
    $('#print').modal('show');
    $('#printbody').html("<object width='100%' height='600' data='" + accion + "'></object>");
  }
}
