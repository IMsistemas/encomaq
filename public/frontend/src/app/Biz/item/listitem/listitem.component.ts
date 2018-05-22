import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../../../service/bitem/item.service';
import { UrlApi } from '../../../service/url-api';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-listitem',
  templateUrl: './listitem.component.html',
  styleUrls: ['./listitem.component.css']
})
export class ListitemComponent implements OnInit {
  /*variables para paginar*/
  loading = false;
  total = 0;
  page = 1;
  limit = 0;
  from = 0;
  /*variables para paginar*/
  url_api = new UrlApi();
  url_basic: String = '';
  urlimage = './assets/image/no_image_available.jpg';
  list_item = [];
  descripcion = '';
  ididentifytype = '';
  @Input() cliente: any;
  @Output() itemglobal = new EventEmitter<any>();
  constructor(private item: ItemService) { }

  ngOnInit() {
    this.url_basic = this.url_api.get_url_api();
    this.get_list_item();
  }
  get_list_item() {
    const o = {
      Buscar: this.descripcion,
      idcategoryitem: '',
      idunittype: '',
      state: '1',
      column: 'itemname',
      order: 'ASC',
      num_page: 5
    };
    this.item.filtro_item(this.page, o).subscribe(
      (response) => {
        this.list_item = response.data;
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
    this.get_list_item();
  }
  onNext(): void {
    this.page++;
    this.get_list_item();
  }
  onPrev(): void {
    this.page--;
    this.get_list_item();
  }
  select_client(data) {
    // this.idcliente.emit(data);
    this.itemglobal.emit(data);
    console.log(data);
    $('.listitems').modal('hide');
  }
}
