import { Component, OnInit } from '@angular/core';
import { ConfigemailService } from '../../service/sconfigemail/configemail.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-configemail',
  templateUrl: './configemail.component.html',
  styleUrls: ['./configemail.component.css']
})
export class ConfigemailComponent implements OnInit {
  message_info: any;
  dataemail = {
    idconfigemail: '',
    driver: '',
    server: '',
    port: '',
    encryptation: '',
    useremail: '',
    passwordemail: ''
  };
  constructor(private email: ConfigemailService) { }

  ngOnInit() {
    this.get_configemail();
  }
  get_configemail() {
    this.email.get_configemail().subscribe(
      (response) => {
        if (response.length > 0) {
          this.dataemail = {
            idconfigemail: response[0].idconfigemail,
            driver: response[0].driver,
            server: response[0].server,
            port: response[0].port,
            encryptation: response[0].encryptation,
            useremail: response[0].useremail,
            passwordemail: response[0].passwordemail
          };
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }
  save_configemail(data) {
    if (data.idconfigemail === '') {
      this.add_configemail(data);
    } else {
      this.edit_configemail(data);
    }
    this.get_configemail();
  }
  add_configemail(data) {
    this.email.add_configemail(data).subscribe(
      (response) => {
        if (response.success !== undefined) {
          this.message_info = 'Se guardo correctamente la información del email';
          $('#mdlMessageSuccess').modal('show');
        } else if (response.error !== undefined) {
          this.message_info = 'Error al guardar la información del email';
          $('#mdlMessageSuccess').modal('show');
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        this.message_info = 'Error al guardar la información del email';
        $('#mdlMessageSuccess').modal('show');
      });
  }
  edit_configemail(data) {
    this.email.edit_configemail(data.idconfigemail, data).subscribe(
      (response) => {
        if (response.success !== undefined) {
          this.message_info = 'Se guardo correctamente la información del email';
          $('#mdlMessageSuccess').modal('show');
        } else if (response.error !== undefined) {
          this.message_info = 'Error al guardar la información del email';
          $('#mdlMessageSuccess').modal('show');
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        this.message_info = 'Error al guardar la información del email';
        $('#mdlMessageSuccess').modal('show');
      });
  }
}
