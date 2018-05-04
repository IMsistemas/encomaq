import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UrlApi } from '../url-api';

@Injectable()
export class NomidentifytyService {
  url_api = new UrlApi();
  constructor(private http: HttpClient) { }
  get_identifytype(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Identifytype');
  }
  add_identifytype(data: any): Observable<any> {
    return this.http.post(this.url_api.get_url_api() + 'api/Identifytype', data);
  }
  edit_identifytype(id: any, data: any): Observable<any> {
    return this.http.put(this.url_api.get_url_api() + 'api/Identifytype/' + id, data);
  }
  delete_identifytype(id: any): Observable<any> {
    return this.http.delete(this.url_api.get_url_api() + 'api/Identifytype/' + id);
  }
  delete_okidentifytype(id: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Identifytype/delete/' + id);
  }
}
