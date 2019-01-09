import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BpaymentformService } from './../../service/bpaymentform/bpaymentform.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-paymentform',
  templateUrl: './paymentform.component.html',
  styleUrls: ['./paymentform.component.css']
})
export class PaymentformComponent implements OnInit {

  listPaymentForm: Observable<any>;
  paymentform_selected: any;
  message_success: any;
  message_error: any;
  paymentformname_selected: any;

  constructor(private paymentform: BpaymentformService) { }

  ngOnInit() {
    this.gestListPaymentForm();
  }

  gestListPaymentForm() {
    this.listPaymentForm = this.paymentform.getList();
  }

  create() {
    $('#mdlCreate').modal('show');
  }

  updateSelectedPaymentForm(item: any) {
    this.paymentform_selected = item;
    $('#mdlUpdate').modal('show');
  }

  confirmDelete(item: any) {
    this.paymentform_selected = item;
    this.paymentformname_selected = item.paymentformname;
    $('#mdlConfirmDelete').modal('show');
  }

  delete() {
    this.paymentform.delete(this.paymentform_selected.idpaymentform).subscribe(
      (response) => {
        if (response.success === true) {

          $('#mdlConfirmDelete').modal('hide');
          this.message_success = 'Se ha eliminado satisfactoriamente la Forma de Pago: ' + this.paymentformname_selected;
          $('#mdlMessageSuccess').modal('show');
          this.gestListPaymentForm();

        } else if (response.success === false) {

          $('#mdlConfirmDelete').modal('hide');

          if (response.relations !== undefined) {

            this.message_error = 'No se puede eliminar La Forma de Pago seleccionado, ya que existen Contratos asignados';
            $('#mdlMessageError').modal('show');

          } else {

            this.message_error = 'Ha ocurrido un error al intentar eliminar la Forma de Pago seleccionado';
            $('#mdlMessageError').modal('show');

          }

        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdlConfirmDelete').modal('hide');
      });
  }

  updateListPaymentForm(event, type) {
    if (event === true) {

      if (type === 'create') {

        this.message_success = 'Se ha creado satisfactoriamente la Forma de Pago';

      } else {

        this.message_success = 'Se ha editado satisfactoriamente la Forma de Pago seleccionado';

      }

      $('#mdlMessageSuccess').modal('show');


    } else {

      if (type === 'create') {

        this.message_error = 'Ha ocurrido un error al intentar agregar la Forma de Pago o el mismo ya existe en el sistema...';

      } else {

        this.message_error = 'Ha ocurrido un error al intentar editar la Forma de Pago o el mismo nombre ya existe en el sistema';

      }

      $('#mdlMessageError').modal('show');

    }

    this.gestListPaymentForm();

  }

}
