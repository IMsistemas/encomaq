import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { RoleService } from './../../../service/role/role.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Output() update_component_father = new EventEmitter<boolean>();
  constructor(private role: RoleService) { }

  ngOnInit() {
  }
  create(data) {
    this.role.create(data).subscribe(
      (response) => {
        if (response.success === true) {
          $('#mdlCreate').modal('hide');
          this.update_component_father.emit(true);
        } else {
          $('#mdlCreate').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdlCreate').modal('hide');
        this.update_component_father.emit(false);
      });
  }

}
