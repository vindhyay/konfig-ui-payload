import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export class BaseService {
  constructor(protected http: HttpClient) {}
  public getData(url: string, params = {}, responseType: any = 'json'): Observable<any> {
    return this.http.get(url, { params, withCredentials: true, responseType });
  }
  public postData(
    url: string,
    payload?: any | null,
    params = {},
    responseType: any = 'json',
    reportProgress: boolean = false,
    headers = {}
  ): Observable<any> {
    return this.http.post(url, payload, { headers, params, responseType, reportProgress, withCredentials: true });
  }
  public putData(url: string, payload?: any | null, params = {}, responseType: any = 'json'): Observable<any> {
    return this.http.put(url, payload, { params, responseType, withCredentials: true });
  }
}
