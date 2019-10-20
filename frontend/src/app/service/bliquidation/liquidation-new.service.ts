import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UrlApi } from '../url-api';

@Injectable({
  providedIn: 'root'
})
export class LiquidationNewService {

  url_api = new UrlApi();
  constructor(private http: HttpClient) { }

  get(filter: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/liquidation-new?filter=' + JSON.stringify(filter));
  }
  post(data: any): Observable<any> {
    return this.http.post(this.url_api.get_url_api() + 'api/liquidation-new', data);
  }
  put(id: any, data: any): Observable<any> {
    return this.http.put(this.url_api.get_url_api() + 'api/liquidation-new/' + id, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(this.url_api.get_url_api() + 'api/liquidation-new/' + id);
  }

  getProjects(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/liquidation-new/getProjects');
  }
}
