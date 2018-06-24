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

  create() {
    $('#mdlCreate').modal('show');
  }

  updateSelected(item: any) {
    this.carrier_selected = item;
    $('#mdlUpdate').modal('show');
  }

  confirmDelete(item: any) {
    this.carrier_selected = item;
    this.carriername_selected = item.carriername;
    $('#mdlConfirmDelete').modal('show');
  }

  delete() {
    this.carrier.delete(this.carrier_selected.idcarrier).subscribe(
      (response) => {
        if (response.success === true) {

          $('#mdlConfirmDelete').modal('hide');
          this.message_success = 'Se ha eliminado satisfactoriamente el Transportista: ' + this.carriername_selected;
          $('#mdlMessageSuccess').modal('show');
          this.getListCarrier();

        } else if (response.success === false) {

          $('#mdlConfirmDelete').modal('hide');

          if (response.dependence !== undefined) {

            this.message_error = 'No se puede eliminar el Transportista seleccionado, ya que existen Guías de Remisión asignados';
            $('#mdlMessageError').modal('show');

          } else {

            this.message_error = 'Ha ocurrido un error al intentar eliminar el Transportista seleccionado';
            $('#mdlMessageError').modal('show');

          }

        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdlConfirmDelete').modal('hide');
      });
  }


  confirmSetState(item: any) {
    this.carrier_selected = item;
    this.carriername_selected = item.carriername;
    $('#mdlConfirmSetState').modal('show');
  }

  setState() {
    this.carrier.updateState(this.carrier_selected.idcarrier, this.carrier_selected).subscribe(
      (response) => {
        if (response.success === true) {
          $('#mdlConfirmSetState').modal('hide');
          this.getListCarrier();
        } else {
          $('#mdlConfirmSetState').modal('hide');
          this.getListCarrier();
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdlUpdate').modal('hide');
        this.getListCarrier();
      });
  }

  updateListCarrier(event, type) {
    if (event === true) {

      if (type === 'create') {

        this.message_success = 'Se ha creado satisfactoriamente el Transportista';

      } else {

        this.message_success = 'Se ha editado satisfactoriamente el Transportista seleccionado';

      }

      $('#mdlMessageSuccess').modal('show');


    } else {

      if (type === 'create') {

        this.message_error = 'Ha ocurrido un error al intentar agregar un Transportista o el mismo ya existe en el sistema...';

      } else {

        // tslint:disable-next-line:max-line-length
        this.message_error = 'Ha ocurrido un error al intentar editar el Transportista seleccionado o el mismo  ya existe en el sistema';

      }

      $('#mdlMessageError').modal('show');

    }

    this.getListCarrier();

  }

  refresfather(data: any) {
    this.getListCarrier();
  }
}
