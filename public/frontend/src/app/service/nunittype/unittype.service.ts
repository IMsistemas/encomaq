import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UrlApi } from '../url-api';

@Injectable()
export class UnittypeService {
  url_api = new UrlApi();
  constructor(private http: HttpClient) { }
  get_unittype(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/UnitType');
  }
  add_unittype(data: any): Observable<any> {
    return this.http.post(this.url_api.get_url_api() + 'api/UnitType', data);
  }
  edit_unittype(id: any, data: any): Observable<any> {
    return this.http.put(this.url_api.get_url_api() + 'api/UnitType/' + id, data);
  }
  delete_unittype(id: any): Observable<any> {
    return this.http.delete(this.url_api.get_url_api() + 'api/UnitType/' + id);
  }
  delete_okunittype(id: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/UnitType/delete/' + id);
  }
  get_unittype_active(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/UnitType/active');
  }

}
