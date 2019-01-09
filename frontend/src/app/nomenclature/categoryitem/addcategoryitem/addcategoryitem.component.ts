import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { ItemcategoryService } from '../../../service/ncategoryitem/itemcategory.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-addcategoryitem',
  templateUrl: './addcategoryitem.component.html',
  styleUrls: ['./addcategoryitem.component.css']
})
export class AddcategoryitemComponent implements OnInit {
  @Output() update_component_father = new EventEmitter<boolean>();
  constructor(private category: ItemcategoryService) { }

  ngOnInit() {
  }
  add_categoryitem(data) {
    this.category.add_categoryitem(data).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#addcategoryitem').modal('hide');
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          $('#addcategoryitem').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#addcategoryitem').modal('hide');
        this.update_component_father.emit(false);
      });
  }
}
