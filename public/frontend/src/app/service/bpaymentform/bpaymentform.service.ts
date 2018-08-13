import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UrlApi } from '../url-api';

@Injectable({
  providedIn: 'root'
})
export class BpaymentformService {
  url_api = new UrlApi();
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/paymentform/get');
  }

  create(data: any): Observable<any> {
    return this.http.post(this.url_api.get_url_api() + 'api/paymentform', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(this.url_api.get_url_api() + 'api/paymentform/' + id, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.url_api.get_url_api() + 'api/paymentform/' + id);
  }
}
