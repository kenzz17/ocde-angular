import { Component, OnInit } from '@angular/core';
import { Code } from '../Code';
import { CompilerService } from '../compiler.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Out } from '../Out';
import { FILES } from '../mock-files';
import { File } from '../File';
import { from } from 'rxjs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  files = FILES;
  file_selected = 'untitled';
  new_file='';
  is_add=false;

  create = '';

  selected = 'cpp';
  stdin = '';
  title = 'ocde-angular';
  able = false;

  closeResult = '';

  inp: Code = { passwd: '314159kenzz17', lang: 'cpp', code: '', stdin: '' };
  out: Out;

  //set language for syntax highlighting here
  editorOptions1 = {theme: 'vs-dark', language: 'cpp'};
  editorOptions2 = {theme: 'vs-dark', language: 'python'};
  editorOptions3 = {theme: 'vs-dark', language: 'javascript'};
  
  // initial value of code --> should be different for different languages 
  code: string = '#include <iostream>\nusing namespace std;\n\nint main(){\n\t\n\treturn 0;\n}';
  new_code = '';

  constructor(private compileService: CompilerService, private modalService: NgbModal) { }


  submit(): void {
    this.able = true;
    this.inp.lang = this.selected;
    this.inp.code = this.code;
    this.inp.stdin = this.stdin;
    this.compileService.compile(this.inp)
      .subscribe(data => this.show(data));
  }

  /*open(content) {
    this.modalService.open(content, 
      {ariaLabelledBy: 'modal-basic-title'}).result.then((result)=>{ 
         this.closeResult = `Closed with: ${result}`;
         if(result=='open' && this.is_select) this.code=this.par_code;
         this.is_select = false;
       }, (reason) => { 
         this.closeResult =  
            `Dismissed ${this.getDismissReason(reason)}`; 
       });
  }*/

  /*private getDismissReason(reason: any): string { 
    this.is_select = false;
    if (reason === ModalDismissReasons.ESC) { 
      return 'by pressing ESC'; 
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) { 
      return 'by clicking on a backdrop'; 
    } else { 
      return `with: ${reason}`; 
    } 
  }*/

  show(data: Out): void {
    this.out = data;
    this.able = false;
  }

  getResult(): boolean {
    return !this.able
  }

  ngOnInit(): void {
  }

  s(code: string, name: string): void{
    this.code = code;
    this.file_selected = name;
    this.selected = name.split('.')[1]
  }

  save(): void {
    for (let index = 0; index < this.files.length; index++) {
      if(this.files[index].name==this.file_selected){
        this.files[index].code=this.code;
        return;
      }
    }
    this.create = 'save';
    this.is_add = true;
    this.new_code = this.code;
  }
  

  del(name: string): void{
    this.files = this.files.filter(function(file){
      return file.name!=name;
    });
    if(name==this.file_selected){
      this.file_selected='untitled';
    }
  }

  add(): void{
    this.create = 'add'
    this.is_add = true;
    this.new_code = '';
  }

  

  fin_add(): void{
    this.files.push({name: this.new_file, code: this.new_code});
    this.new_file = '';
    this.is_add = false;
  }
}
