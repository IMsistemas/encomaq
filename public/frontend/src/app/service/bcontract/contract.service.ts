import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UrlApi } from '../url-api';

@Injectable()
export class ContractService {
  url_api = new UrlApi();
  constructor(private http: HttpClient) { }
  getContractActive(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Contract/getContractActive');
  }
  getLastNoContract(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Contract/getLastNoContract');
  }
  add_contract(data: any): Observable<any> {
    return this.http.post(this.url_api.get_url_api() + 'api/Contract', data);
  }
  edit_contract(id: any, data: any): Observable<any> {
    return this.http.put(this.url_api.get_url_api() + 'api/Contract/' + id, data);
  }
  delete_contract(id: any): Observable<any> {
    return this.http.delete(this.url_api.get_url_api() + 'api/Contract/' + id);
  }
  state_contract(id: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Contract/state/' + id);
  }
  filtro_contract(page: any, filtro: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Contract/filtro?page=' + page + '&filter=' + JSON.stringify(filtro));
  }
  filtro_contractexportarpdf(data): any {
    return this.url_api.get_url_api() + 'api/Contract/exportarpdf/' + JSON.stringify(data);
  }
  contractexportarpdf(id: any): any {
    return this.url_api.get_url_api() + 'api/Contract/exportarpdfid/' + id;
  }
  getPFByContract(id: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Contract/getPFByContract/' + id);
  }
  resumenContract(filtro: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/Contract/resumenContract?filter=' + JSON.stringify(filtro));
  }
}
