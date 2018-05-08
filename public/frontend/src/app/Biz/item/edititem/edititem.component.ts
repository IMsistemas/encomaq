import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../../../service/bitem/item.service';
import { ItemcategoryService } from '../../../service/ncategoryitem/itemcategory.service';
import { UnittypeService } from '../../../service/nunittype/unittype.service';
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
  lis_category = [];
  lis_unit = [];
  constructor(private item: ItemService, private category: ItemcategoryService, private unit: UnittypeService) { }

  ngOnInit() {
    this.list_category();
    this.list_unit();
  }
  list_category() {
    this.lis_category.push({ idcategoryitem: '', categoryitemname: '--Seleccione--' });
    this.category.get_categoryitem().subscribe(
      (response) => {
        for (const cat of response) {
          const o = {
            idcategoryitem: parseInt(cat.idcategoryitem),
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
  edit_item(data: any) {
    this.item.edit_item(data.iditem, data).subscribe(
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
}
