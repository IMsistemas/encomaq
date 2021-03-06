import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ItemService } from '../../service/bitem/item.service';
import { ItemcategoryService } from '../../service/ncategoryitem/itemcategory.service';
import { UnittypeService } from '../../service/nunittype/unittype.service';
import { UrlApi } from '../../service/url-api';
import { BcompanyService } from '../../service/bcompany/bcompany.service';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  message_info: any;
  list_item = [];
  list_all_item = [];
  info_tem_edit: any;
  tem_cancel_activate: any;
  msm_cancel_activate: any;
  descripcion: any = '';
  idcategory: any = '';
  lis_category = [];
  lis_unit = [];
  idunittype: any = '';
  state = '1';
  column = 'itemname';
  order = 'ASC';
  num_page = 5;
  /*variables para paginar*/
  loading = false;
  total = 0;
  page = 1;
  limit = 0;
  from = 0;
  /*variables para paginar*/
  url_api = new UrlApi();
  url_basic: String = '';
  urlimage = './assets/image/no_image_available.jpg';
  select_data: any = '';
  companyData = {

    idcompany: 0,
    businessname: '',
    tradename: '',
    identify: '',
    phone: '',
    address: '',
    email: '',
    urlweb: ''

  };
  constructor(private item: ItemService, private category: ItemcategoryService,
                private unit: UnittypeService, private company: BcompanyService) { }

  ngOnInit() {
    this.url_basic = this.url_api.get_url_api();
    $('.modal').draggable();
    $('.dropdown-toggle').dropdown();
    this.get_list_item();
    this.list_category();
    this.list_unit();
    this.getCompany();
  }

  getCompany() {
    this.company.get().subscribe(
      (response) => {

        if (response.length !== 0) {

          this.companyData = response[0];

        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }

  get_list_item() {
    const o = {
      Buscar: this.descripcion,
      idcategoryitem: this.idcategory,
      idunittype: this.idunittype,
      state: this.state,
      column: this.column,
      order: this.order,
      num_page: this.num_page
    };
    this.item.filtro_item(this.page, o).subscribe(
      (response) => {
        this.list_item = response.data;
        this.from = response.from;
        this.total = response.total;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      });
  }
  new_item() {
    $('#additem').modal('show');
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
        this.message_info = 'Ha ocurrido un error al intentar agregar un item o el mismo ya existe en el sistema..!!';
        $('#mdlMessageError').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Ha ocurrido un error al intentar editar un item o el mismo ya existe en el sistema..!!';
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
          this.message_info = 'Se ha guardado correctamente los datos!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_item();
        } else if (response.error !== undefined) {
          $('#mdl_cancelactivate').modal('hide');
          this.message_info = 'Error al anular los datos!';
          $('#mdlMessageError').modal('show');
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        this.message_info = 'Error al anular los datos!';
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
          this.message_info = 'Se elimino correctamente los datos!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_item();
        } else if (response.error !== undefined) {
          $('#mdl_delete').modal('hide');
          this.message_info = 'Error al eliminar los datos!';
          $('#mdlMessageError').modal('show');
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        this.message_info = 'Error al eliminar los datos!';
        $('#mdlMessageError').modal('show');
        $('#mdl_delete').modal('hide');
      });
  }
  list_category() {
    this.lis_category.push({ idcategoryitem: '', categoryitemname: '-- Categoría --' });
    this.category.get_categoryitem_active().subscribe(
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
    this.lis_unit.push({ idunittype: '', unittypename: '-- Unidad --' });
    this.unit.get_unittype_active().subscribe(
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
  load(data: any) {
    this.select_data = data;
    $('#mdlinfo').modal('show');
  }
  goToPage(n: number): void {
    this.page = n;
    this.get_list_item();
  }
  onNext(): void {
    this.page++;
    this.get_list_item();
  }
  onPrev(): void {
    this.page--;
    this.get_list_item();
  }
  pdf() {
    const o = {
      Buscar: this.descripcion,
      idcategoryitem: this.idcategory,
      idunittype: this.idunittype,
      state: this.state,
      column: this.column,
      order: this.order,
    };
    const accion = this.item.filtro_itemexportarpdf(o);
    $('#printtitle').html('Lista de items');
    $('#print').modal('show');
    $('#printbody').html("<object width='100%' height='600' data='" + accion + "'></object>");
  }
  excel() {

    const o = {
      Buscar: this.descripcion,
      idcategoryitem: this.idcategory,
      idunittype: this.idunittype,
      state: null,
      column: this.column,
      order: this.order,
      num_page: '1000000000'
    };
    this.item.filtro_item(this.page, o).subscribe(
      (response) => {
        this.list_all_item = response.data;
        this.from = response.from;
        this.total = response.total;
        this.loading = false;
        console.log(this.list_all_item);
        setTimeout(function() {
          $('#list_all_items').table2excel({
            exclude: '.noExl',
            filename: 'Lista de Items'
          }); }, 4000);
      },
      (error) => {
        console.log(error);
      });

  }
  refresfather(data: any) {
    this.get_list_item();
  }
}
