import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProjectService } from '../../service/bproject/project.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  /*variables para paginar*/
  loading = false;
  total = 0;
  page = 1;
  limit = 20;
  from = 0;
  /*variables para paginar*/
  message_info: any;
  list_project = [];
  info_tem_edit: any;
  tem_cancel_activate: any;
  msm_cancel_activate: any;
  descripcion: any = '';
  constructor(private project: ProjectService) { }

  ngOnInit() {
    $('.modal').draggable();
    $('.dropdown-toggle').dropdown();
    this.get_list_project();
  }
  get_list_project() {
    const o = {
      Buscar: this.descripcion,
    };
    this.project.filtro_project(this.page, o).subscribe(
      (response) => {
        this.list_project = response.data;
        this.from = response.from;
        this.total = response.total;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      });
  }
  goToPage(n: number): void {
    this.page = n;
    this.get_list_project();
  }
  onNext(): void {
    this.page++;
    this.get_list_project();
  }
  onPrev(): void {
    this.page--;
    this.get_list_project();
  }
}
