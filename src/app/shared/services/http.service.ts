import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private httpOptions;

  constructor(
    private http: HttpClient,
  ) { }

   setHeader(): void {
    this.httpOptions = {
      header: {
        headers: new HttpHeaders({
          Accept : 'application/json'
        })
      }
    };
  }
  get(apiEndPoint: string): Observable<object> {
    // this.setHeader();
    return this.http
      .get(environment.baseUrl + apiEndPoint);
  }

  // Post API

  post(apiEndPoint: string, payload): Observable<object> {
    this.setHeader();
    return this.http
      .post(environment.baseUrl + apiEndPoint, payload, this.httpOptions.header);
  }

  // Put API

  put(apiEndPoint: string, payload): Observable<object> {
    // this.setHeader();
    return this.http
      .put(environment.baseUrl + apiEndPoint, payload);
  }


  // Delete API

  delete(apiEndPoint: string): Observable<object> {
    // this.setHeader();
    return this.http
      .delete(environment.baseUrl + apiEndPoint);
  }


}




