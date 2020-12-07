import { Component, OnInit } from '@angular/core';
import { Code } from '../Code';
import { CompilerService } from '../compiler.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Out } from '../Out';
import { WorkerService } from '../worker.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  new_file='';
  is_add=false;
  new_code = '';
  create = '';

  // no subdirectories -- `path` ignored 
  // I guess the declaration has to be in ngOnInit 
  files = [];

  ngOnInit(): void {
    this.files = this.worker.workspace_structure;
  }

  // editor variables
  stdin = '';
  able = false;
  inp: Code = { passwd: '314159kenzz17', lang: 'cpp', code: '', stdin: '' };
  out: Out = {stdout: '', stderr: '', error: ''};
  //set language for syntax highlighting here
  editorOptions1 = {theme: 'vs-dark', language: 'cpp'};
  editorOptions2 = {theme: 'vs-dark', language: 'python'};
  editorOptions3 = {theme: 'vs-dark', language: 'javascript'};
  
  constructor(
    private compileService: CompilerService,
    private modalService: NgbModal,
    public worker: WorkerService
  ) { }

  submit(): void {
    this.able = true;
    this.inp.lang = this.worker.openFile_lang;
    this.inp.code = this.worker.openFile_body;
    this.inp.stdin = this.stdin;
    this.compileService.compile(this.inp)
      .subscribe(data => this.show(data));
  }

  show(data: Out): void {
    this.out = data;
    this.able = false;
  }

  s(code: string, name: string, lang: string, path: string): void{
    this.worker.openFile_body = code;
    this.worker.openFile_name = name;
    this.worker.openFile_lang = lang;
    this.worker.openFile_path = path;
  }

  save(): void {
    for (let index = 0; index < this.files.length; index++) {
      if(this.files[index].name==this.worker.openFile_name){
        this.files[index].body=this.worker.openFile_body;
        return;
      }
    }
    this.create = 'save';
    this.is_add = true;              
    this.new_code = this.worker.openFile_body;
  }
  
  del(name: string): void{
    this.files.forEach((ele,idx)=>{
      if(ele.name==name)this.files.splice(idx,1);
    })
    if(name==this.worker.openFile_name){
      this.worker.openFile_name='untitled';
    }
  }

  add(): void{
    this.create = 'add'
    this.is_add = true;
    this.new_code = '';
  }

  fin_add(): void{
    this.files.push({
      name: this.new_file,
      body: this.new_code,
      lang: this.new_file.split('.').slice(-1)[0]
    });
    this.new_file = '';
    this.is_add = false;
  }
}
