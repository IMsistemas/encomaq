import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UrlApi } from '../url-api';
@Injectable()
export class ItemcategoryService {
  url_api = new UrlApi();
  constructor(private http: HttpClient) { }
  get_categoryitem(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/CategoryItem');
  }
  add_categoryitem(data: any): Observable<any> {
    return this.http.post(this.url_api.get_url_api() + 'api/CategoryItem', data);
  }
  edit_categoryitem(id: any, data: any): Observable<any> {
    return this.http.put(this.url_api.get_url_api() + 'api/CategoryItem/' + id, data);
  }
  delete_categoryitem(id: any): Observable<any> {
    return this.http.delete(this.url_api.get_url_api() + 'api/CategoryItem/' + id);
  }
  delete_okcategoryitem(id: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/CategoryItem/delete/' + id);
  }
  get_categoryitem_active(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/CategoryItem/active');
  }

}
