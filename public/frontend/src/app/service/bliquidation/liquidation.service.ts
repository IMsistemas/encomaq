import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UrlApi } from '../url-api';


@Injectable()
export class LiquidationService {
  url_api = new UrlApi();
  constructor(private http: HttpClient) { }
  getliquidationtActive(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Liquidation/getLiquidationActive');
  }
  add_liquidation(data: any): Observable<any> {
    return this.http.post(this.url_api.get_url_api() + 'api/Liquidation', data);
  }
  edit_liquidation(id: any, data: any): Observable<any> {
    return this.http.put(this.url_api.get_url_api() + 'api/Liquidation/' + id, data);
  }
  delete_liquidation(id: any): Observable<any> {
    return this.http.delete(this.url_api.get_url_api() + 'api/Liquidation/' + id);
  }
  state_liquidation(id: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Liquidation/state/' + id);
  }
  filtro_liquidation(page: any, filtro: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Liquidation/filtro?page=' + page + '&filter=' + JSON.stringify(filtro));
  }
  filtro_liquidationexportarpdf(data): any {
    return this.url_api.get_url_api() + 'api/Liquidation/exportarpdf/' + JSON.stringify(data);
  }
  liquidationexportarpdf(id: any): any {
    return this.url_api.get_url_api() + 'api/Liquidation/exportarpdfid/' + id;
  }
  exportPDF(data: any): Observable<any> {
    return this.http.post(this.url_api.get_url_api() + 'api/Liquidation/exportPDF', data);
  }
  createPDF(data): any {
    return this.url_api.get_url_api() + 'api/Liquidation/createPDF/' + JSON.stringify(data);
  }
}
