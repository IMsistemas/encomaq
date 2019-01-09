import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BplaceService } from './../../service/bplace/bplace.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  listPlace: Observable<any>;
  place_selected: any;
  message_success: any;
  message_error: any;
  placename_selected: any;

  constructor(private place: BplaceService) { }

  ngOnInit() {
    this.gestListPlace();
  }

  gestListPlace() {
    this.listPlace = this.place.get();
  }

  create() {
    $('#mdlCreate').modal('show');
  }

  updateSelectedPlace(item: any) {
    this.place_selected = item;
    $('#mdlUpdate').modal('show');
  }

  confirmDelete(item: any) {
    this.place_selected = item;
    this.placename_selected = item.placename;
    $('#mdlConfirmDelete').modal('show');
  }

  delete() {
    this.place.delete(this.place_selected.idplace).subscribe(
      (response) => {
        if (response.success === true) {

          $('#mdlConfirmDelete').modal('hide');
          this.message_success = 'Se ha eliminado satisfactoriamente el Lugar: ' + this.placename_selected;
          $('#mdlMessageSuccess').modal('show');
          this.gestListPlace();

        } else if (response.success === false) {

          $('#mdlConfirmDelete').modal('hide');

          if (response.relations !== undefined) {

            this.message_error = 'No se puede eliminar el Lugar seleccionado, ya que existen Guías de Remisión asignados';
            $('#mdlMessageError').modal('show');

          } else {

            this.message_error = 'Ha ocurrido un error al intentar eliminar el Lugar seleccionado';
            $('#mdlMessageError').modal('show');

          }

        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdlConfirmDelete').modal('hide');
      });
  }

  updateListPlace(event, type) {
    if (event === true) {

      if (type === 'create') {

        this.message_success = 'Se ha creado satisfactoriamente el Lugar';

      } else {

        this.message_success = 'Se ha editado satisfactoriamente el Lugar seleccionado';

      }

      $('#mdlMessageSuccess').modal('show');


    } else {

      if (type === 'create') {

        this.message_error = 'Ha ocurrido un error al intentar agregar un Lugar o el mismo ya existe en el sistema...';

      } else {

        this.message_error = 'Ha ocurrido un error al intentar editar el Lugar seleccionado o el mismo nombre ya existe en el sistema';

      }

      $('#mdlMessageError').modal('show');

    }

    this.gestListPlace();

  }

}
