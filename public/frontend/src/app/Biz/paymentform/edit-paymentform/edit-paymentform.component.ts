import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BpaymentformService } from './../../../service/bpaymentform/bpaymentform.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-edit-paymentform',
  templateUrl: './edit-paymentform.component.html',
  styleUrls: ['./edit-paymentform.component.css']
})
export class EditPaymentformComponent implements OnInit {
  @Input() tem_edit_paymentform: any;
  @Output() update_component_father = new EventEmitter<boolean>();
  constructor(private paymentform: BpaymentformService) { }

  ngOnInit() {
    this.tem_edit_paymentform = {
      paymentformname: ''
    };
  }

  update(data: any) {
    this.paymentform.update(data.idpaymentform, data).subscribe(
      (response) => {
        if (response.success === true) {
          $('#mdlUpdate').modal('hide');
          this.update_component_father.emit(true);
        } else {
          $('#mdlUpdate').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdlUpdate').modal('hide');
        this.update_component_father.emit(false);
      });
  }
}
