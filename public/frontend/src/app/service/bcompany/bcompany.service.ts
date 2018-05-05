import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UrlApi } from '../url-api';

@Injectable()
export class BcompanyService {

  url_api = new UrlApi();
  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/company/get');
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(this.url_api.get_url_api() + 'api/company/' + id, data);
  }

  upload(file: File): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.url_api.get_url_api() + 'api/company/upload', formData);
  }

}
