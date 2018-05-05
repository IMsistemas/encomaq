import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from './../../service/user/user.service';
import { UrlApi } from './../../service/url-api';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @Input() tem_edit_user: any;
  url_api = new UrlApi();
  message_success: any;
  message_error: any;
  constructor(private user: UserService) { }

  ngOnInit() {

    this.tem_edit_user = JSON.parse(localStorage.getItem('user'));

  }

  update(data: any) {
    this.user.update(data.iduser, data).subscribe(
      (response) => {
        if (response.success === true) {

          response.user.password = '';

          localStorage.setItem('user', JSON.stringify(response.user));

          this.message_success = 'Se ha editado satisfactoriamente la Información de Perfil';
          $('#mdlMessageSuccess').modal('show');

          this.ngOnInit();

        } else {

          this.message_error = 'Ha ocurrido un error al intentar guardar la Información de Perfil';
          $('#mdlMessageError').modal('show');

        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }

}
