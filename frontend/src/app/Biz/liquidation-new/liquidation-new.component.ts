import { Component, OnInit } from '@angular/core';
import { LiquidationNewService } from '../../service/bliquidation/liquidation-new.service';

declare var $: any;

@Component({
  selector: 'app-liquidation-new',
  templateUrl: './liquidation-new.component.html',
  styleUrls: ['./liquidation-new.component.css']
})
export class LiquidationNewComponent implements OnInit {
  message_info: any;
  list_liquidation = [];
  list_projects = [];

  constructor(private liquidation: LiquidationNewService ) { }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.list_projects.push({ idproject: '', projectname: '--Seleccione Proyecto--' });
    this.liquidation.getProjects().subscribe(
      (response) => {
        for (const u of response) {
          const o = {
            idproject: u.idproject,
            projectname: u.projectname
          };
          this.list_projects.push(o);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }

}
