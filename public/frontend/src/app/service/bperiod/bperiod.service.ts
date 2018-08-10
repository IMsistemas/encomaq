import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UrlApi } from '../url-api';

@Injectable({
  providedIn: 'root'
})
export class BperiodService {

  url_api = new UrlApi();
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/period/get');
  }

}
