import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BplaceService } from './../../../service/bplace/bplace.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {
  @Input() tem_edit_place: any;
  @Output() update_component_father = new EventEmitter<boolean>();
  constructor(private place: BplaceService) { }


  ngOnInit() {
    this.tem_edit_place = {
      placename: ''
    };
  }

  update(data: any) {
    this.place.update(data.idplace, data).subscribe(
      (response) => {
        if (response.success === true) {
          $('#mdlUpdate').modal('hide');
          this.update_component_father.emit(true);
        } else {
          $('#mdlUpdate').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdlUpdate').modal('hide');
        this.update_component_father.emit(false);
      });
  }

}
