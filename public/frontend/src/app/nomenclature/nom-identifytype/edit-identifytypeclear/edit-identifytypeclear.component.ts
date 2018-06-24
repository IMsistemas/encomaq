import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NomidentifytyService } from '../../../service/identifytype/nomidentifyty.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-edit-identifytypeclear',
  templateUrl: './edit-identifytypeclear.component.html',
  styleUrls: ['./edit-identifytypeclear.component.css']
})
export class EditIdentifytypeclearComponent implements OnInit {
  @Input() tem_edit_identify: any;
  @Output() update_component_father = new EventEmitter<boolean>();
  @Output() refresh_component_father = new EventEmitter<boolean>();
  constructor(private identify: NomidentifytyService) { }

  ngOnInit() {
  }
  edit_identifytype(data: any) {
    this.identify.edit_identifytype(data.ididentifytype, data).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_edit_identifytype').modal('hide');
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          $('#mdl_edit_identifytype').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdl_edit_identifytype').modal('hide');
        this.update_component_father.emit(false);
      });
  }
  refresh() {
    this.refresh_component_father.emit(false);
  }
}
