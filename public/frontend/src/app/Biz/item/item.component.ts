import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ItemService } from '../../service/bitem/item.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  message_info: any;
  list_item: Observable<any>;
  info_tem_edit: any;
  tem_cancel_activate: any;
  msm_cancel_activate: any;
  descripcion: any = '';
  constructor(private item: ItemService) { }

  ngOnInit() {
    $('.dropdown-toggle').dropdown();
    this.get_list_item();
  }
  get_list_item() {
    const o = {
      Buscar: this.descripcion
    };
    this.list_item = this.item.filtro_item(o);
  }
  new_item() {
    $('#additem').modal('show');
  }
  update_list(evento, type) {
    if (evento === true) {
      if (type === 'create') {
        this.message_info = 'Sea guardado correctamente los datos..!!';
        $('#mdlMessageSuccess').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Sea editado correctamente los datos..!!';
        $('#mdlMessageSuccess').modal('show');
      }
    } else {
      if (type === 'create') {
        this.message_info = 'Ha ocurrido un error al intentar agregar un item o la misma ya existe en el sistema..!!';
        $('#mdlMessageError').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Ha ocurrido un error al intentar editar un item o la misma ya existe en el sistema..!!';
        $('#mdlMessageError').modal('show');
      }
    }
    this.get_list_item();
  }
  edit_item(data: any) {
    this.info_tem_edit = data;
    $('#edititem').modal('show');
  }
}
