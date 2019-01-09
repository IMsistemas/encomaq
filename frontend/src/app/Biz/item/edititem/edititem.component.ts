import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { ItemService } from '../../../service/bitem/item.service';
import { ItemcategoryService } from '../../../service/ncategoryitem/itemcategory.service';
import { UnittypeService } from '../../../service/nunittype/unittype.service';
import { UrlApi } from '../../../service/url-api';
import { ItempriceService } from '../../../service/bitemprice/itemprice.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-edititem',
  templateUrl: './edititem.component.html',
  styleUrls: ['./edititem.component.css']
})
export class EdititemComponent implements OnInit {
  @Input() tem_edit: any;
  @Output() update_component_father = new EventEmitter<boolean>();
  @Output() refresh_component_father = new EventEmitter<boolean>();
  lis_category = [];
  lis_unit = [];
  lis_price = [];
  urlapi = new UrlApi();
  url_basic: String = '';
  urlimage = './assets/image/no_image_available.jpg';
  auxcategory = false;
  fileToUpload: File = null;
  posDeletePrice = null;

  itempriceSave = null;
  message_info_itemprice = '';

  constructor(private item: ItemService, private category: ItemcategoryService,
                private unit: UnittypeService, private itemprice: ItempriceService) { }

  ngOnInit() {
    this.url_basic = this.urlapi.get_url_api();
    this.list_category();
    this.list_unit();
  }
  list_category() {
//  this.lis_category.push({ idcategoryitem: '', categoryitemname: '--Seleccione--' });
    this.lis_category.push({ idcategoryitem: '', categoryitemname: '--Seleccione--' });
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
    this.lis_unit.push({ idunittype: '', unittypename: '--Seleccione--' });
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
  createRow(data) {
    const o = {
      price: data.price
    };
    this.tem_edit.biz_itemprice.push(o);
    data.price = '';
  }
  confirmDeletePrice(ident) {

    console.log(ident);

    if (ident.iditemprice !== undefined) {
      this.itemprice.getItemPriceByID(ident.iditemprice).subscribe(
        (response) => {

          if (response.success === false) {
            this.posDeletePrice = this.tem_edit.biz_itemprice.indexOf(ident);
            $('#mdl_deletePriceItem').modal('show');
          } else {
            $('#mdlMessageInfoItemPrice').modal('show');
          }

        },
        (error) => {
          console.log('POST call in error", respons', error);
        });
    } else {
      this.posDeletePrice = this.tem_edit.biz_itemprice.indexOf(ident);
      $('#mdl_deletePriceItem').modal('show');
    }

  }
  deleteRowPrice() {
    if (this.posDeletePrice !== null) {
      this.tem_edit.biz_itemprice.splice(this.posDeletePrice, 1);
      $('#mdl_deletePriceItem').modal('hide');
    }
  }
  confirmSavePrice(item) {
    this.itemprice.getItemPriceByID(item.iditemprice).subscribe(
      (response) => {

        this.itempriceSave = item;

        if (response.success === false) {
          this.savePrice();
        } else {
          $('#mdl_confirmSaveItem').modal('show');
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }
  savePrice() {
    this.itemprice.edit_itemprice(this.itempriceSave.iditemprice, this.itempriceSave).subscribe(
      (response) => {

        $('#mdl_confirmSaveItem').modal('hide');

        if (response.success === true) {
          this.message_info_itemprice = 'Se ha actualizado el precio correctamente, asi como su dependencia.';
          $('#mdlMessageSuccessItemPrice').modal('show');
        } else {
          this.message_info_itemprice = 'Ha ocurrido un error al intentar editar el precio.';
          $('#mdlMessageErrorItemPrice').modal('show');
        }

      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }
  closeConfirmPrice() {
    $('#mdl_confirmSaveItem').modal('hide');
  }
  closeConfirmDeletePrice() {
    $('#mdl_deletePriceItem').modal('hide');
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  edit_item(data: any) {
    this.item.add_item(data, this.fileToUpload).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#edititem').modal('hide');
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          $('#edititem').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#edititem').modal('hide');
        this.update_component_father.emit(false);
      });
  }
  refresh() {
    this.refresh_component_father.emit(false);
  }
}
