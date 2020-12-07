import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class FormService {

  public TOKEN: string;
  public USERNAME: string;

  constructor(private http: HttpClient) { }

  initVals(data: JSON): Observable<JSON> {
    return this.http.post<JSON>("http://52.187.32.163:8000/api/login/",data,httpOptions);
  }

  postVals(data: JSON): Observable<JSON> {
    return this.http.post<JSON>("http://52.187.32.163:8000/api/register/", data, httpOptions)
  }

  logout(): Observable<JSON>{
    var httpOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Token " + this.TOKEN
      })
    }
    return this.http.post<JSON>("http://52.187.32.163:8000/api/logout/",{},httpOption);
  }
}
