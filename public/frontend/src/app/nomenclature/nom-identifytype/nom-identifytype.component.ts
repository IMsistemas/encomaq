import { Component, OnInit } from '@angular/core';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-nom-identifytype',
  templateUrl: './nom-identifytype.component.html',
  styleUrls: ['./nom-identifytype.component.css']
})
export class NomIdentifytypeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.dropdown-toggle').dropdown();
  }

}
