import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BplaceService } from './../../../service/bplace/bplace.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-list-place',
  templateUrl: './list-place.component.html',
  styleUrls: ['./list-place.component.css']
})
export class ListPlaceComponent implements OnInit {

  listPlace: Observable<any>;
  place_selected: any;
  message_success: any;
  message_error: any;
  @Input() fieldSelected = 0;
  @Output() place_s = new EventEmitter<any>();

  constructor(private place: BplaceService) { }

  ngOnInit() {
    this.gestListPlace();
  }

  gestListPlace() {
    this.listPlace = this.place.get();
  }

  select_place(data) {
    this.place_s.emit([data, this.fieldSelected]);
    $('#listPlaceShow').modal('hide');
    // console.log(this.place_s);
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
