import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UrlApi } from '../url-api';

@Injectable()
export class ClienteService {
  url_api = new UrlApi();
  constructor(private http: HttpClient) { }
  get_client(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Client');
  }
  add_client(data: any): Observable<any> {
    return this.http.post(this.url_api.get_url_api() + 'api/Client', data);
  }
  edit_client(id: any, data: any): Observable<any> {
    return this.http.put(this.url_api.get_url_api() + 'api/Client/' + id, data);
  }
  delete_client(id: any): Observable<any> {
    return this.http.delete(this.url_api.get_url_api() + 'api/Client/' + id);
  }
  state_client(id: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Client/state/' + id);
  }
  filtro_client(page: any, filtro: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Client/filtro?page=' + page + '&filter=' + JSON.stringify(filtro));
  }
  filtro_clientexportarpdf(data: any): any {
    return this.url_api.get_url_api() + 'api/Client/exportarpdf/' + JSON.stringify(data);
  }

}
