import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UrlApi } from '../url-api';

@Injectable()
export class CarrierService {

  url_api = new UrlApi();
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/carrier/get');
  }

  create(data: any): Observable<any> {
    return this.http.post(this.url_api.get_url_api() + 'api/carrier', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(this.url_api.get_url_api() + 'api/carrier/' + id, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.url_api.get_url_api() + 'api/carrier/' + id);
  }

  updateState(id: any, data: any): Observable<any> {
    return this.http.put(this.url_api.get_url_api() + 'api/carrier/updateState/' + id, data);
  }

  filtro_carrier(page: any, filtro: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/carrier/filtro?page=' + page + '&filter=' + JSON.stringify(filtro));
  }
}
