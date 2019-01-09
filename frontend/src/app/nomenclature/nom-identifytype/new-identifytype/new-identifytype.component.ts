import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { NomidentifytyService } from '../../../service/identifytype/nomidentifyty.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-new-identifytype',
  templateUrl: './new-identifytype.component.html',
  styleUrls: ['./new-identifytype.component.css']
})
export class NewIdentifytypeComponent implements OnInit {
  @Output() update_component_father = new EventEmitter<boolean>();
  constructor(private identify: NomidentifytyService) { }

  ngOnInit() {
  }
  add_new_identifytype(data) {
    this.identify.add_identifytype(data).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_new_identifytype').modal('hide');
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          $('#mdl_new_identifytype').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdl_new_identifytype').modal('hide');
        this.update_component_father.emit(false);
      });
  }

}
