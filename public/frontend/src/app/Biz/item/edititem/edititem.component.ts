import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { ItemService } from '../../../service/bitem/item.service';
import { ItemcategoryService } from '../../../service/ncategoryitem/itemcategory.service';
import { UnittypeService } from '../../../service/nunittype/unittype.service';
import { UrlApi } from '../../../service/url-api';
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
  urlapi = new UrlApi();
  url_basic: String = '';
  urlimage = './assets/image/no_image_available.jpg';
  auxcategory = false;
  fileToUpload: File = null;
  constructor(private item: ItemService, private category: ItemcategoryService, private unit: UnittypeService) { }

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
