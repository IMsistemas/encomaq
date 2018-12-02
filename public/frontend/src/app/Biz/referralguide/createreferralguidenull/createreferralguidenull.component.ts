import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReferralguideService } from '../../../service/referralguide/referralguide.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-createreferralguidenull',
  templateUrl: './createreferralguidenull.component.html',
  styleUrls: ['./createreferralguidenull.component.css']
})
export class CreatereferralguidenullComponent implements OnInit {

  @Output() update_component_father = new EventEmitter<boolean>();
  establec = '001';
  ptoventa = '001';
  secuencial = '000000000';

  constructor(private referra: ReferralguideService) { }

  ngOnInit() {
  }

  add(data, frm) {

    this.referra.createReferralGuideNull(data).subscribe(
      (response) => {

        if (response.success === true) {

          $('#mdlCreateReferralNull').modal('hide');
          frm.reset();
          this.update_component_father.emit(true);

        } else if (response.error !== undefined) {

          // $('#addclient').modal('hide');
          this.update_component_father.emit(false);

        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        // $('#createreferralguide').modal('hide');
        frm.reset();
        this.update_component_father.emit(false);
      });

  }

}
