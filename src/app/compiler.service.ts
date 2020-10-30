import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Code } from './Code';
import { Out } from './Out';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class CompilerService {

  constructor(private http: HttpClient) { }

  private url = 'http://13.76.187.23:5000/v1'

  compile(code: Code): Observable<Out> {
    return this.http.post<Out>(this.url, code, httpOptions)
  }

}
