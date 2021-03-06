import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReasontransferService } from '../../../service/ntranseferreason/reasontransfer.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-edittransferreason',
  templateUrl: './edittransferreason.component.html',
  styleUrls: ['./edittransferreason.component.css']
})
export class EdittransferreasonComponent implements OnInit {
  listTypeTransferReason = [];
  @Input() tem_edit: any;
  @Output() update_component_father = new EventEmitter<boolean>();
  @Output() refresh_component_father = new EventEmitter<boolean>();
  constructor(private transfer: ReasontransferService) { }

  ngOnInit() {
    this.getTypeTransferReason();
  }
  getTypeTransferReason() {
    this.transfer.getTypeTransferReason().subscribe(
      (response) => {
        this.listTypeTransferReason = [];
        for (let e of response) {
          let obj: Object = {
            idtypetransferreason: e.idtypetransferreason,
            nametypetransferreason: e.nametypetransferreason
          };
          this.listTypeTransferReason.push(obj);
        }

      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdlCreate').modal('hide');
        this.update_component_father.emit(false);
      });
  }
  edit_transferreason(data: any) {
    this.transfer.edit_transferreason(data.idtransferreason, data).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#edittransferreason').modal('hide');
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          $('#edittransferreason').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#edittransferreason').modal('hide');
        this.update_component_father.emit(false);
      });
  }
  refresh() {
    this.refresh_component_father.emit(false);
  }
}
