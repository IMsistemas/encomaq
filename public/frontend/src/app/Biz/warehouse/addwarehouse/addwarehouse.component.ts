import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { WarehouseService } from '../../../service/bwarehouse/warehouse.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-addwarehouse',
  templateUrl: './addwarehouse.component.html',
  styleUrls: ['./addwarehouse.component.css']
})
export class AddwarehouseComponent implements OnInit {
  @Output() update_component_father = new EventEmitter<boolean>();
  constructor(private ware: WarehouseService) { }

  ngOnInit() {
  }
  add_warehouse(data) {
    this.ware.add_warehouse(data).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#addwarehouse').modal('hide');
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          $('#addwarehouse').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#addwarehouse').modal('hide');
        this.update_component_father.emit(false);
      });
  }
}
