import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { UrlApi } from '../url-api';

@Injectable()
export class ReferralguideService {

  url_api = new UrlApi();
  constructor(private http: HttpClient) { }

  get(page: any, filter: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/referralguide/get?page=' + page + '&filter=' + JSON.stringify(filter));
  }

  create(data: any): Observable<any> {
    return this.http.post(this.url_api.get_url_api() + 'api/referralguide', data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(this.url_api.get_url_api() + 'api/referralguide/' + id, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(this.url_api.get_url_api() + 'api/referralguide/' + id);
  }

  updateState(id: any): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/referralguide/updateState/' + id);
  }

  filtro_referraexportarpdf(data): any {
    return this.url_api.get_url_api() + 'api/referralguide/exportarpdf/' + JSON.stringify(data);
  }

  listclient_referralguide(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/referralguide/listclient_referralguide');
  }
  referraexportarpdf(id: any): any {
    return this.url_api.get_url_api() + 'api/referralguide/exportarpdfid/' + id;
  }

  getGuideNumber(): Observable<any> {
    return this.http.get(this.url_api.get_url_api() + 'api/referralguide/getGuideNumber');
  }

  createReferralGuideNull(data: any): Observable<any> {
    return this.http.post(this.url_api.get_url_api() + 'api/referralguide/storeReferralGuideNull', data);
  }
}
