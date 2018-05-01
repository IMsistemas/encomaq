import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UnittypeService } from '../../../service/nunittype/unittype.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-editunittype',
  templateUrl: './editunittype.component.html',
  styleUrls: ['./editunittype.component.css']
})
export class EditunittypeComponent implements OnInit {
  @Input() tem_edit: any;
  @Output() update_component_father = new EventEmitter<boolean>();
  constructor(private unit: UnittypeService) { }

  ngOnInit() {
  }
  edit_transferreason(data: any) {
    this.unit.edit_unittype(data.idunittype, data).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#editunittype').modal('hide');
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          $('#editunittype').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#editunittype').modal('hide');
        this.update_component_father.emit(false);
      });
  }
}
