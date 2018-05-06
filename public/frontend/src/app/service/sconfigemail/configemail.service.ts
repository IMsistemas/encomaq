import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UrlApi } from '../url-api';

@Injectable()
export class ConfigemailService {
  url_api = new UrlApi();
  constructor(private http: HttpClient) { }
  get_configemail(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/ConfigEmail');
  }
  add_configemail(data: any): Observable<any> {
    return this.http.post(this.url_api.get_url_api() + 'api/ConfigEmail', data);
  }
  edit_configemail(id: any, data: any): Observable<any> {
    return this.http.put(this.url_api.get_url_api() + 'api/ConfigEmail/' + id, data);
  }
  delete_configemail(id: any): Observable<any> {
    return this.http.delete(this.url_api.get_url_api() + 'api/ConfigEmail/' + id);
  }
}
