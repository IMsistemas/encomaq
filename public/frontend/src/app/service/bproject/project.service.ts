import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UrlApi } from '../url-api';

@Injectable()
export class ProjectService {
  url_api = new UrlApi();
  constructor(private http: HttpClient) { }

  add_project(data: any): Observable<any> {
    return this.http.post(this.url_api.get_url_api() + 'api/Project', data);
  }
  edit_project(id: any, data: any): Observable<any> {
    return this.http.put(this.url_api.get_url_api() + 'api/Project/' + id, data);
  }
  delete_project(id: any): Observable<any> {
    return this.http.delete(this.url_api.get_url_api() + 'api/Project/' + id);
  }
  state_project(id: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Project/state/' + id);
  }
  filtro_project(page: any, filtro: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Project/filtro?page=' + page + '&filter=' + JSON.stringify(filtro));
  }
  filtro_projectexportarpdf(data): any {
    return this.url_api.get_url_api() + 'api/Project/exportarpdf/' + JSON.stringify(data);
  }
}
