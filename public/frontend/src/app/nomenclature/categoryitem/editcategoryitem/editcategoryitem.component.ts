import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ItemcategoryService } from '../../../service/ncategoryitem/itemcategory.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-editcategoryitem',
  templateUrl: './editcategoryitem.component.html',
  styleUrls: ['./editcategoryitem.component.css']
})
export class EditcategoryitemComponent implements OnInit {
  @Input() tem_edit: any;
  @Output() update_component_father = new EventEmitter<boolean>();
  constructor(private category: ItemcategoryService) { }

  ngOnInit() {
  }
  edit_cateoryitem(data: any) {
    this.category.edit_categoryitem(data.idcategoryitem, data).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#editcategoryitem').modal('hide');
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          $('#editcategoryitem').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#editcategoryitem').modal('hide');
        this.update_component_father.emit(false);
      });
  }
}
