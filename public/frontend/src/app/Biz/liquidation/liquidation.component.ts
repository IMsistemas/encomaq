import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LiquidationService } from '../../service/bliquidation/liquidation.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-liquidation',
  templateUrl: './liquidation.component.html',
  styleUrls: ['./liquidation.component.css']
})
export class LiquidationComponent implements OnInit {
  message_info: any;
  list_liquidation = [];
  /*variables para paginar*/
  descripcion: any = '';
  state = '1';
  column = 'number';
  order = 'ASC';
  num_page = 5;
  loading = false;
  total = 0;
  page = 1;
  limit = 0;
  from = 0;
  /*variables para paginar*/
  constructor(private liquidation: LiquidationService) { }

  ngOnInit() {
    this.get_list_liquidation();
  }
  new_liquidation() {
    $('#addliquidation').modal('show');
  }
  get_list_liquidation() {
    const o = {
      Buscar: this.descripcion,
      state: this.state,
      column: this.column,
      order: this.order,
      num_page: this.num_page
    };
    this.liquidation.filtro_liquidation(this.page, o).subscribe(
      (response) => {
        this.list_liquidation = response.data;
        this.from = response.from;
        this.total = response.total;
        this.loading = false;
        console.log(this.list_liquidation);
      },
      (error) => {
        console.log(error);
      });
  }
  goToPage(n: number): void {
    this.page = n;
    this.get_list_liquidation();
  }
  onNext(): void {
    this.page++;
    this.get_list_liquidation();
  }
  onPrev(): void {
    this.page--;
    this.get_list_liquidation();
  }
  update_list(evento, type) {
    if (evento === true) {
      if (type === 'create') {
        this.message_info = 'Se ha guardado correctamente los datos!';
        $('#mdlMessageSuccess').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Se ha editado correctamente los datos!';
        $('#mdlMessageSuccess').modal('show');
      }
    } else {
      if (type === 'create') {
        this.message_info = 'Ha ocurrido un error al intentar agregar una liquidacion o la misma ya existe en el sistema!';
        $('#mdlMessageError').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Ha ocurrido un error al intentar editar una liquidacion o la misma ya existe en el sistema!';
        $('#mdlMessageError').modal('show');
      }
    }
    this.get_list_liquidation();
  }
}
