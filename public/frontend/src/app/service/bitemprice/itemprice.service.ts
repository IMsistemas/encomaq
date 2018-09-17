import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UrlApi } from '../url-api';

@Injectable({
  providedIn: 'root'
})
export class ItempriceService {

  url_api = new UrlApi();
  constructor(private http: HttpClient) { }
  get_itemprice(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/ItemPrice');
  }
  add_itemprice(data: any): Observable<any> {
    return this.http.post(this.url_api.get_url_api() + 'api/ItemPrice', data);
  }
  edit_itemprice(id: any, data: any): Observable<any> {
    return this.http.put(this.url_api.get_url_api() + 'api/ItemPrice/' + id, data);
  }
  delete_itemprice(id: any): Observable<any> {
    return this.http.delete(this.url_api.get_url_api() + 'api/ItemPrice/' + id);
  }
  state_itemprice(id: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/ItemPrice/state/' + id);
  }
  filtro_itemprice(page: any, filtro: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/ItemPrice/filtro?page=' + page + '&filter=' + JSON.stringify(filtro));
  }

  price_item(id: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/ItemPrice/priceForItem/' + id);
  }

}
