import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WarehouseService } from '../../../service/bwarehouse/warehouse.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-editwarehouse',
  templateUrl: './editwarehouse.component.html',
  styleUrls: ['./editwarehouse.component.css']
})
export class EditwarehouseComponent implements OnInit {
  @Input() tem_edit: any;
  @Output() update_component_father = new EventEmitter<boolean>();
  @Output() refresh_component_father = new EventEmitter<boolean>();
  constructor(private ware: WarehouseService) { }

  ngOnInit() {
  }
  edit_warehouse(data: any) {
    this.ware.edit_warehouse(data.idwarehouse, data).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#editwarehouse').modal('hide');
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          $('#editwarehouse').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#editwarehouse').modal('hide');
        this.update_component_father.emit(false);
      });
  }
  refresh() {
    this.refresh_component_father.emit(false);
  }
}
