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

}
