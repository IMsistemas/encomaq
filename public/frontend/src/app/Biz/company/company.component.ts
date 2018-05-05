import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BcompanyService } from './../../service/bcompany/bcompany.service';
import { UrlApi } from './../../service/url-api';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  @Input() tem_edit_role: any;
  url_api = new UrlApi();
  message_success: any;
  message_error: any;
  fileToUpload: File = null;
  urlimage = './assets/image/no_image_available.jpg';
  constructor(private company: BcompanyService) { }

  ngOnInit() {

    $('#btn_upload').prop('disabled', true);

    this.company.get().subscribe(
      (response) => {

        if (response.length != 0) {

          this.tem_edit_role = response[0];

          if (response[0].image != null && response[0].image != '') {

              this.urlimage = this.url_api.get_url_api() + response[0].image;

          }

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
          
          this.message_success = 'Se ha editado satisfactoriamente la Información de la Empresa';
          $('#mdlMessageSuccess').modal('show');

          this.ngOnInit();

        } else {
          
          this.message_error = 'Ha ocurrido un error al intentar guardar la Información de la Empresa';
          $('#mdlMessageError').modal('show');

        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    $('#btn_upload').prop('disabled', false);
  }

  upload() {

    this.company.upload(this.fileToUpload).subscribe(
      (response) => {
        if (response.success === true) {
          
          this.message_success = 'Se ha agregado la imagen satisfactoriamente';
          $('#mdlMessageSuccess').modal('show');

          this.ngOnInit();

        } else {
          
          this.message_error = 'Ha ocurrido un error al intentar agregar la imagen o no está creada la Información de la Empresa';
          $('#mdlMessageError').modal('show');

        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });

  }

}
