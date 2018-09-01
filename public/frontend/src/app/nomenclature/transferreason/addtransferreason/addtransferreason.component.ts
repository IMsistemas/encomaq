import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { ReasontransferService } from '../../../service/ntranseferreason/reasontransfer.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-addtransferreason',
  templateUrl: './addtransferreason.component.html',
  styleUrls: ['./addtransferreason.component.css']
})
export class AddtransferreasonComponent implements OnInit {
  listTypeTransferReason = [];
  @Output() update_component_father = new EventEmitter<boolean>();
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
  add_transferreason(data) {
    this.transfer.add_transferreason(data).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#addtransferreason').modal('hide');
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          $('#addtransferreason').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#addtransferreason').modal('hide');
        this.update_component_father.emit(false);
      });
  }
}
