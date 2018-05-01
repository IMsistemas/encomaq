import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UrlApi } from '../url-api';

@Injectable()
export class LoginService {
  url_api = new UrlApi();
  constructor(private http: HttpClient) { }

  getSessionExist(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/login/getSessionExist');
  }

  verifyLogin(data: any): Observable<any> {    
    return this.http.post(this.url_api.get_url_api() + 'api/login', data);
  }

  logout(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/login/logout');
  }
}
