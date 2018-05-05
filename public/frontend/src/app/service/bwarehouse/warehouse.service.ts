import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UrlApi } from '../url-api';

@Injectable()
export class WarehouseService {
  url_api = new UrlApi();
  constructor(private http: HttpClient) { }
  get_warehouse(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/WareHouse');
  }
  add_warehouse(data: any): Observable<any> {
    return this.http.post(this.url_api.get_url_api() + 'api/WareHouse', data);
  }
  edit_warehouse(id: any, data: any): Observable<any> {
    return this.http.put(this.url_api.get_url_api() + 'api/WareHouse/' + id, data);
  }
  delete_warehouse(id: any): Observable<any> {
    return this.http.delete(this.url_api.get_url_api() + 'api/WareHouse/' + id);
  }
  state_warehouse(id: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/WareHouse/state/' + id);
  }
}
