import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NomidentifytyService } from '../../service/identifytype/nomidentifyty.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-nom-identifytype',
  templateUrl: './nom-identifytype.component.html',
  styleUrls: ['./nom-identifytype.component.css']
})
export class NomIdentifytypeComponent implements OnInit {
  list_identifytype: Observable<any>;
  constructor(private identify: NomidentifytyService) { }

  ngOnInit() {
    $('.dropdown-toggle').dropdown();
    this.get_list_identifytype();
  }
  get_list_identifytype() {
    this.list_identifytype = this.identify.get_identifytype();
  }
}
