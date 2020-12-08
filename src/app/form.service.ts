import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class FormService {
  

  constructor(private http: HttpClient, private router: Router) { }

  initVals(data: JSON): Observable<JSON> {
    return this.http.post<JSON>("http://52.187.32.163:8000/api/login/",data,httpOptions);
  }

  postVals(data: JSON): Observable<JSON> {
    return this.http.post<JSON>("http://52.187.32.163:8000/api/register/", data, httpOptions)
  }

  logout(token: String): Observable<JSON>{
    var httpOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Token " + token
      })
    }
    return this.http.post<JSON>("http://52.187.32.163:8000/api/logout/",{},httpOption);
  }

  change(data: JSON, token: String): Observable<JSON>{
    var httpOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Token " + token
      })
    }
    return this.http.post<JSON>("http://52.187.32.163:8000/api/paschange/",data,httpOption);
  }
}
