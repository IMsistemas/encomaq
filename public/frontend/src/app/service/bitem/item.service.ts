import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UrlApi } from '../url-api';

@Injectable()
export class ItemService {
  url_api = new UrlApi();
  constructor(private http: HttpClient) { }
  get_item(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Item');
  }
  add_item(data: any): Observable<any> {
    return this.http.post(this.url_api.get_url_api() + 'api/Item', data);
  }
  edit_item(id: any, data: any): Observable<any> {
    return this.http.put(this.url_api.get_url_api() + 'api/Item/' + id, data);
  }
  delete_item(id: any): Observable<any> {
    return this.http.delete(this.url_api.get_url_api() + 'api/Item/' + id);
  }
  state_item(id: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Item/state/' + id);
  }
  filtro_item(filtro: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Item/filtro/' + JSON.stringify(filtro));
  }

}
