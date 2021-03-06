import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UrlApi } from '../url-api';

@Injectable()
export class RoleService {

  url_api = new UrlApi();
  constructor(private http: HttpClient) { }

  getListRole(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/role/getListRole');
  }

  getPermission(id: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/role/getPermission/' + id);
  }

  getActiveRole(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/role/getActiveRole');
  }

  create(data: any): Observable<any> {
    return this.http.post(this.url_api.get_url_api() + 'api/role', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(this.url_api.get_url_api() + 'api/role/' + id, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.url_api.get_url_api() + 'api/role/' + id);
  }
  permission_role(data: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/role/save_permissionrole/' + JSON.stringify(data));
  }
}
