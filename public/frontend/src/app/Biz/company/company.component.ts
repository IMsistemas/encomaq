import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BcompanyService } from './../../service/bcompany/bcompany.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  @Input() tem_edit_role: any;
  constructor(private company: BcompanyService) { }

  ngOnInit() {

    this.tem_edit_role = {

      businessname: '',
      tradename: '',
      identify: '',
      phone: '',
      address: '',
      email: '',
      urlweb: ''

    };

  }

  update(data: any) {
    /*this.role.update(data.idrole, data).subscribe(
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
      });*/
  }

}
