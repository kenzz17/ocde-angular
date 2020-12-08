import { Component, OnInit } from '@angular/core';
import { Code } from '../Code';
import { CompilerService } from '../compiler.service';
import { Out } from '../Out';
import { WorkerService } from '../worker.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormService } from '../form.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  new_file = '';
  is_add = false;

  ngOnInit(): void {
  }


  currentUser: any;
  token= "";
  username= "";
  httpOption: any;

  constructor(
    private compileService: CompilerService,
    public worker: WorkerService,
    private msgBar: MatSnackBar,
    public formService: FormService,
    public http: HttpClient,
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser==null){
      localStorage.setItem('currentUser', JSON.stringify({ token: "", name: "" }));
    }
    else{
      this.token = this.currentUser.token;
      this.username = this.currentUser.name;     
      this.httpOption = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "Token " + this.token
        })
      }
    }
  }
  

  // editor variables
  stdin = '';
  able = false;
  inp: Code = { passwd: '314159kenzz17', lang: 'cpp', code: '', stdin: '' };
  out: Out = { stdout: '', stderr: '', error: '' };
  //set language for syntax highlighting here
  editorOptions1 = { theme: 'vs-dark', language: 'cpp' };
  editorOptions2 = { theme: 'vs-dark', language: 'python' };
  editorOptions3 = { theme: 'vs-dark', language: 'javascript' };

  public openBar(message: string) {
    this.msgBar.open(message, undefined, { duration: 3000, });
  }

  

  submit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.currentUser.token;
    this.username = this.currentUser.name;     
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Token " + this.token
      })
    }
    this.able = true;
    if(this.worker.workspace_isScratch){
      this.inp.lang = this.worker.openFile_lang;
      this.inp.code = this.worker.openFile_body;
      this.inp.stdin = this.stdin;
      this.compileService.compile_v1(this.inp)
        .subscribe(data => this.show(data));
    }
    else {
      this.compileService.compile_v3({
        name: this.worker.openFile_name,
        path: this.worker.openFile_path,
        stdin: this.stdin,
        lang: this.worker.openFile_lang,
        passwd: '314159kenzz17',
        helper: this.worker.workspace_structure
      }).subscribe(data => this.show(data))
    }
  }

  show(data: Out): void {
    this.out = data;
    this.able = false;
  }

  openInEditor(code: string, name: string, lang: string, path: string): void {
    this.worker.openFile_body = code;
    this.worker.openFile_name = name;
    this.worker.openFile_lang = lang;
    this.worker.openFile_path = path;
  }


  save(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.currentUser.token;
    this.username = this.currentUser.name;     
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Token " + this.token
      })
    }
    if (this.worker.workspace_isScratch) {
      this.http.post<JSON>("http://52.187.32.163:8000/api/files/", {
        name: this.worker.openFile_name, lang: this.worker.openFile_lang,
        body: this.worker.openFile_body
      }, this.httpOption).subscribe(
        (data: any) => this.openBar(data.message),
        (data: any) => this.openBar(data.error.error || 'Unable to save file')
      );
    }
    else {
      this.http.post<JSON>("http://52.187.32.163:8000/api/projects/", {
        name: this.worker.openFile_name, projectname: this.worker.workspace_name,
        relpath: this.worker.openFile_path, lang: this.worker.openFile_lang,
        body: this.worker.openFile_body
      }, this.httpOption).subscribe(
        (data: any) => {
          for (let i = 0; i < this.worker.workspace_structure.length; i++) {
            if (this.worker.workspace_structure[i].name == this.worker.openFile_name){
              this.worker.workspace_structure[i].body = this.worker.openFile_body;
              break;
            }
          }
          this.openBar(data.message);
        },
        (data: any) => this.openBar(data.error.message || 'Unable to save file')
      );
    }
  }

  del(name: string): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.currentUser.token;
    this.username = this.currentUser.name;     
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Token " + this.token
      })
    }
    this.http.post<JSON>(
      "http://52.187.32.163:8000/api/projectdelete/", {
      all: 'False', projectname: this.worker.workspace_name, filename: name
    },
      this.httpOption).subscribe(
        (data: any) => {
          this.worker.workspace_structure.forEach((ele, idx) => {
            if (ele.name == name) this.worker.workspace_structure.splice(idx, 1);
          })
          this.openBar(data.message);
        },
        () => this.openBar('Unable to delete file')
      )
  };
 
  fin_add(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.currentUser.token;
    this.username = this.currentUser.name;     
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Token " + this.token
      })
    }
    const store = this.new_file;
    for (let i = 0; i < this.worker.workspace_structure.length; i++) {
      if (this.worker.workspace_structure[i].name == store)
        return this.openBar('File with the same name already exits!');
    }
    this.http.post<JSON>("http://52.187.32.163:8000/api/projects/", {
      name: store.split('/').slice(-1)[0],
      projectname: this.worker.workspace_name,
      relpath: store.split('/').slice(0,-1).join('/'),
      lang: store.split('.').slice(-1)[0],
      body: store.split('.').slice(-1)[0] == 'cpp' ?
        '#include <iostream>\nusing namespace std;\n\nint main(){\n\t\n\treturn 0;\n}' : ''
    }, this.httpOption).subscribe(
      () => this.worker.workspace_structure.push(
        {
          name: store.split('/').slice(-1)[0],
          path: store.split('/').slice(0,-1).join('/'),
          lang: store.split('.').slice(-1)[0],
          body: store.split('.').slice(-1)[0] == 'cpp' ?
            '#include <iostream>\nusing namespace std;\n\nint main(){\n\t\n\treturn 0;\n}' : ''
        }
      ),
      (data: any) => this.openBar(data.error.message || 'Unable to create file')
    );
    this.new_file = '';
    this.is_add = false;
  }

  check(): boolean{
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.currentUser.token;
    this.username = this.currentUser.name;
    return this.token=='';
  }
}
