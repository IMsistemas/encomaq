import { Component, OnChanges, Output, EventEmitter, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReferralguideService } from '../../service/referralguide/referralguide.service';
import { ListcarrierComponent } from '../carrier/listcarrier/listcarrier.component';
import { CarrierService } from '../../service/carrier/carrier.service';
import { BcompanyService } from '../../service/bcompany/bcompany.service';
import { ReasontransferService } from '../../service/ntranseferreason/reasontransfer.service';

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
  column = 'biz_referralguide.guidenumber';
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
  fieldSelectedPlace: any;
  objectcarrier_select: any;
  objectplace_select_start: any;
  objectplace_select_end: any;
  info: any;
  listcarrier: any;
  companyData = {

    idcompany: 0,
    businessname: '',
    tradename: '',
    identify: '',
    phone: '',
    address: '',
    email: '',
    urlweb: ''

  };
  listTransferReason = [];
  idtransferreason: any = '';
  constructor(
    private referralguide: ReferralguideService,
    private carriers: CarrierService,
    private company: BcompanyService, private transferreason: ReasontransferService) {
    this.listcarrier = new ListcarrierComponent(carriers);
   }

  ngOnInit() {
    this.loadInitJQuery();
    this.getTransferActive();
    this.getList();
    this.getCompany();
  }

  getCompany() {
    this.company.get().subscribe(
      (response) => {

        if (response.length !== 0) {

          this.companyData = response[0];

        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
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

  getTransferActive() {
    this.listTransferReason.push({ idtransferreason: '', transferreasonname: '--Seleccione Motivo de Traslado--' });
    this.transferreason.getTransferActive().subscribe(
      (response) => {
        for (const cat of response) {
          const o = {
            idtransferreason: cat.idtransferreason,
            transferreasonname: cat.transferreasonname
          };
          this.listTransferReason.push(o);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }

  getList() {

    const o = {
      idtransferreason: this.idtransferreason,
      search: this.descripcion,
      state: this.state,
      column: this.column,
      order: this.order,
      num_page: this.num_page
    };

    this.referralguide.get(this.page, o).subscribe(
      (response) => {
        // console.log(response.data);
        this.listReferralGuide = response.data;
        this.from = response.from;
        this.total = response.total;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      });

  }

  createReferralNull() {
    $('#mdlCreateReferralNull').modal('show');
  }

  create() {
    this.idcontract_select  = { idcontract: '', biz_client: { businessname: '' }, nocontract: '' };
    this.objectcarrier_select = { idcarrier: '', carriername: '', identify: '', licenseplate: '' };
    this.objectplace_select_start = { idplace: '', placename: '' };
    this.objectplace_select_end = { idplace: '', placename: '' };
    $('#createreferralguide').modal('show');
  }

  editSelected(item: any) {
    // console.log(item);
    // this.listcarrier.get_list_carrier();
    this.info_tem_edit = item;
    this.idcontract_select = item.biz_contract;

    if (item.biz_carrier !== null) {
      this.objectcarrier_select = item.biz_carrier;
    } else {
      this.objectcarrier_select = { idcarrier: '', carriername: '', identify: '', licenseplate: '' };
    }

    if (item.idproject === null) {
      this.info_tem_edit.idproject = '';
    }

    if (item.idwarehouse === null) {
      this.info_tem_edit.idwarehouse = '';
    }

    if (item.idtransferreason === null) {
      this.info_tem_edit.idtransferreason = '';
    }

    if (item.biz_referralguide_place.length !== 0) {
      this.objectplace_select_start = {
        idplace: item.biz_referralguide_place[0].biz_place_start.idplace,
        placename: item.biz_referralguide_place[0].biz_place_start.placename
      };
      this.objectplace_select_end = {
        idplace: item.biz_referralguide_place[0].biz_place_end.idplace,
        placename: item.biz_referralguide_place[0].biz_place_end.placename
      };
    }
    $('#updatereferralguide').modal('show');
  }



  confirmDelete(item: any) {

  }

  setState() {

  }

  contract_select(n): void {
    // console.log(n);
    this.idcontract_select = n;
  }

  itemglobal_select(n): void {
    this.globalitem_select = n;
  }

  carrier_select(n): void {
    this.objectcarrier_select = n;
  }

  place_select(n): void {
    // console.log(n);
      if (this.fieldSelectedPlace === 1) {
        this.objectplace_select_start = n[0];
      } else {
        this.objectplace_select_end = n[0];
      }
  }

  fieldPlaceSelected(n) {
    // console.log(n);
    this.fieldSelectedPlace = n;
  }

  updateList(event, type) {

    this.listcarrier.get_list_carrier();

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

  view_info(data: any) {
    // console.log(data);
    this.info = data;
    $('#info').modal('show');
  }
}
