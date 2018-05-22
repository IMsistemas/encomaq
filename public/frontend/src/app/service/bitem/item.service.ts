import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UrlApi } from '../url-api';

@Injectable()
export class ItemService {
  url_api = new UrlApi();
  constructor(private http: HttpClient) { }
  get_item(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Item');
  }
  add_item(data: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('Data', JSON.stringify(data));
    return this.http.post(this.url_api.get_url_api() + 'api/Item', formData);
  }
  edit_item(id: any, data: any, file: File): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
      })
    };
    const datos = new FormData();
    datos.append('file', file);
    datos.append('Data', JSON.stringify(data));
    return this.http.put(this.url_api.get_url_api() + 'api/Item/' + id, datos, httpOptions);
  }
  delete_item(id: any): Observable<any> {
    return this.http.delete(this.url_api.get_url_api() + 'api/Item/' + id);
  }
  state_item(id: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Item/state/' + id);
  }
  filtro_item(page: any, filtro: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Item/filtro?page=' + page + '&filter=' + JSON.stringify(filtro));
  }

}
