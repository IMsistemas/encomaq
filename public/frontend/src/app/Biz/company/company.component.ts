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

    this.company.get().subscribe(
      (response) => {

        if (response.length != 0) {

          this.tem_edit_role = response[0];

        } else {

          this.tem_edit_role = {

            idcompany: 0,  
            businessname: '',
            tradename: '',
            identify: '',
            phone: '',
            address: '',
            email: '',
            urlweb: ''

          };

        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });

  }



  update(data: any) {
    this.company.update(data.idcompany, data).subscribe(
      (response) => {
        if (response.success === true) {
          
        } else {
          
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }

}
