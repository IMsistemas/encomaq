import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { ItemService } from '../../../service/bitem/item.service';
import { ItemcategoryService } from '../../../service/ncategoryitem/itemcategory.service';
import { UnittypeService } from '../../../service/nunittype/unittype.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {
  @Output() update_component_father = new EventEmitter<boolean>();
  lis_category = [];
  lis_unit = [];
  lis_price = [];
  fileToUpload: File = null;
  constructor(private item: ItemService, private category: ItemcategoryService, private unit: UnittypeService) { }

  ngOnInit() {
    this.list_category();
    this.list_unit();
  }
  list_category() {
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
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
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
    this.lis_price.push(data.price);
    data.price = '';
  }
  deleteRow(ident) {
    const pos = this.lis_price.indexOf(ident);
    this.lis_price.splice(pos, 1);
  }
  add_item(data) {
    data.list_price = this.lis_price;
    this.item.add_item(data, this.fileToUpload).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#additem').modal('hide');
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          $('#additem').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#additem').modal('hide');
        this.update_component_father.emit(false);
      });
  }
}
