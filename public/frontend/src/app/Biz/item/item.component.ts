import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ItemService } from '../../service/bitem/item.service';
import { ItemcategoryService } from '../../service/ncategoryitem/itemcategory.service';
import { UnittypeService } from '../../service/nunittype/unittype.service';
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
  idcategory: any = '';
  lis_category = [];
  lis_unit = [];
  idunittype: any = '';
  constructor(private item: ItemService, private category: ItemcategoryService, private unit: UnittypeService) { }

  ngOnInit() {
    $('.dropdown-toggle').dropdown();
    this.get_list_item();
    this.list_category();
    this.list_unit();
  }
  get_list_item() {
    const o = {
      Buscar: this.descripcion,
      idcategoryitem: this.idcategory,
      idunittype: this.idunittype
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
  cancel_activate(data: any) {
    this.tem_cancel_activate = data;
    $('#mdl_cancelactivate').modal('show');
  }
  ok_cancelactivate() {
    this.item.state_item(this.tem_cancel_activate.iditem).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_cancelactivate').modal('hide');
          this.message_info = 'Sea guardado correctamente los datos..!!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_item();
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
    this.item.delete_item(this.tem_cancel_activate.iditem).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_delete').modal('hide');
          this.message_info = 'Sea elimino correctamente los datos..!!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_item();
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
  list_category() {
    this.lis_category.push({ idcategoryitem: '', categoryitemname: '--Categoria--' });
    this.category.get_categoryitem().subscribe(
      (response) => {
        for (const cat of response) {
          const o = {
            idcategoryitem: cat.idcategoryitem,
            categoryitemname: cat.categoryitemname
          };
          this.lis_category.push(o);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }
  list_unit() {
    this.lis_unit.push({ idunittype: '', unittypename: '--Unidad--' });
    this.unit.get_unittype().subscribe(
      (response) => {
        for (const u of response) {
          const o = {
            idunittype: u.idunittype,
            unittypename: u.unittypename
          };
          this.lis_unit.push(o);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }
}
