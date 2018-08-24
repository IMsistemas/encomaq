import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ClienteService } from '../../../service/bclient/cliente.service';
import { ReferralguideService } from '../../../service/referralguide/referralguide.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-listclient',
  templateUrl: './listclient.component.html',
  styleUrls: ['./listclient.component.css']
})
export class ListclientComponent implements OnInit {
  /*variables para paginar*/
  loading = false;
  total = 0;
  page = 1;
  limit = 20;
  from = 0;
  num_page = 5;
  select_data: any = '';
  /*variables para paginar*/
  list_client = [];
  descripcion = '';
  ididentifytype = '';
  @Input() cliente: any;
  @Input() type: any;
  @Output() idcliente = new EventEmitter<any>();
  constructor(private client: ClienteService, private referralguide: ReferralguideService) { }

  ngOnInit() {
    this.get_list_client();
  }
  get_list_client() {

    console.log(this.type);
    const o = {
      Buscar: this.descripcion,
      ididentifytype: this.ididentifytype,
      state: '1',
      column: 'businessname',
      order: 'ASC',
      num_page: 5,
      type: this.type
    };

    this.client.filtro_client(this.page, o).subscribe(
      (response) => {
        this.list_client = response.data;
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
    this.get_list_client();
  }
  onNext(): void {
    this.page++;
    this.get_list_client();
  }
  onPrev(): void {
    this.page--;
    this.get_list_client();
  }

  select_client(data) {
    this.idcliente.emit(data);
    $('.listclient').modal('hide');
  }
}
