import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ItemcategoryService } from '../../service/ncategoryitem/itemcategory.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-categoryitem',
  templateUrl: './categoryitem.component.html',
  styleUrls: ['./categoryitem.component.css']
})
export class CategoryitemComponent implements OnInit {
  message_info: any;
  list_categoryitem: Observable<any>;
  info_tem_edit: any;
  tem_cancel_activate: any;
  msm_cancel_activate: any;
  constructor(private category: ItemcategoryService) { }

  ngOnInit() {
    $('.modal').draggable();
    $('.dropdown-toggle').dropdown();
    this.get_list_categoryitem();
  }
  get_list_categoryitem() {
    this.list_categoryitem = this.category.get_categoryitem();
  }
  new_categoryitem() {
    $('#addcategoryitem').modal('show');
  }
  update_list(evento, type) {
    if (evento === true) {
      if (type === 'create') {
        this.message_info = 'Se ha guardado correctamente los datos!';
        $('#mdlMessageSuccess').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Se ha editado correctamente los datos!';
        $('#mdlMessageSuccess').modal('show');
      }
    } else {
      if (type === 'create') {
        this.message_info = 'Ha ocurrido un error al itentar agregar una categoria o la misma ya existe en el sistema!';
        $('#mdlMessageError').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Ha ocurrido un error al itentar editar una categoria o la misma ya existe en el sistema!';
        $('#mdlMessageError').modal('show');
      }
    }
    this.get_list_categoryitem();
  }
  edit_categoryitem(data: any) {
    this.info_tem_edit = data;
    $('#editcategoryitem').modal('show');
  }
  cancel_activate(data: any) {
    this.tem_cancel_activate = data;
    if (data.state === 1) {
      this.msm_cancel_activate = 'Esta seguro de anular la categoria ' + data.categoryitemname + '?';
    } else {
      this.msm_cancel_activate = 'Esta seguro de activar la categoria ' + data.categoryitemname + '?';
    }
    $('#mdl_cancelactivate').modal('show');
  }
  ok_cancelactivate() {
    this.category.delete_categoryitem(this.tem_cancel_activate.idcategoryitem).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_cancelactivate').modal('hide');
          this.message_info = 'Se ha guardado correctamente los datos..!!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_categoryitem();
        } else if (response.error !== undefined) {
          $('#mdl_cancelactivate').modal('hide');
          this.message_info = 'Error al anular los datos..!!';
          $('#mdlMessageError').modal('show');
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        this.message_info = 'Error al anular los datos..!!';
        $('#mdlMessageError').modal('show');
        $('#mdl_cancelactivate').modal('hide');
      });
  }
  delete(data: any) {
    this.tem_cancel_activate = data;
    $('#mdl_delete').modal('show');
  }
  ok_delete() {
    this.category.delete_okcategoryitem(this.tem_cancel_activate.idcategoryitem).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_delete').modal('hide');
          this.message_info = 'Se ha eliminado correctamente los datos..!!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_categoryitem();
        } else if (response.error !== undefined) {
          $('#mdl_delete').modal('hide');
          this.message_info = 'Error al eliminar los datos..!!';
          $('#mdlMessageError').modal('show');
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        this.message_info = 'Error al eliminar los datos..!!';
        $('#mdlMessageError').modal('show');
        $('#mdl_delete').modal('hide');
      });
  }
  refresfather(data: any) {
    this.get_list_categoryitem();
  }
}
