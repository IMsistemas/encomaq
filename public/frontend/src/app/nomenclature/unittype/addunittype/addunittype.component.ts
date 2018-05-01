import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { UnittypeService } from '../../../service/nunittype/unittype.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-addunittype',
  templateUrl: './addunittype.component.html',
  styleUrls: ['./addunittype.component.css']
})
export class AddunittypeComponent implements OnInit {
  @Output() update_component_father = new EventEmitter<boolean>();
  constructor(private unit: UnittypeService) { }

  ngOnInit() {
  }
  add_unittype(data) {
    this.unit.add_unittype(data).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#addunittype').modal('hide');
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          $('#addunittype').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#addunittype').modal('hide');
        this.update_component_father.emit(false);
      });
  }
}
