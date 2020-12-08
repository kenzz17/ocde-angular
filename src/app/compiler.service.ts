import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Code } from './Code';
import { Out } from './Out';
import { ProjectFile } from './ProjectFile';

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

  private url_v1 = 'http://13.76.187.23:5000/v1';
  private url_v2 = 'http://13.76.187.23:5000/v2';

  public compile_v1(code: Code): Observable<Out> {
    return this.http.post<Out>(this.url_v1, code, httpOptions)
  }

  public compile_v2(req:{
    code: string, lang:string, passwd:string, stdin:string,helper:ProjectFile[]
  }): Observable<Out> 
  {
    return this.http.post<Out>(this.url_v2, req, httpOptions)
  }

}
