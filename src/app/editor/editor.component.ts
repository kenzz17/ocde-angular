import { Component, OnInit } from '@angular/core';
import { Code } from '../Code';
import { CompilerService } from '../compiler.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Out } from '../Out';
import { FILES } from '../mock-files';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  files = FILES;

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
  par_code: string = this.code;

  constructor(private compileService: CompilerService, private modalService: NgbModal) { }


  submit(): void {
    this.able = true;
    this.inp.lang = this.selected;
    this.inp.code = this.code;
    this.inp.stdin = this.stdin;
    this.compileService.compile(this.inp)
      .subscribe(data => this.show(data));
  }

  open(content) {
    this.modalService.open(content, 
      {ariaLabelledBy: 'modal-basic-title'}).result.then((result)=>{ 
         this.closeResult = `Closed with: ${result}`;
         if(result=='open') this.code=this.par_code;
         else this.par_code=this.code;
       }, (reason) => { 
         this.closeResult =  
            `Dismissed ${this.getDismissReason(reason)}`; 
       });
  }

  private getDismissReason(reason: any): string { 
    this.par_code=this.code;
    if (reason === ModalDismissReasons.ESC) { 
      return 'by pressing ESC'; 
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) { 
      return 'by clicking on a backdrop'; 
    } else { 
      return `with: ${reason}`; 
    } 
  } 

  show(data: Out): void {
    this.out = data;
    this.able = false;
  }

  getResult(): boolean {
    return !this.able
  }

  ngOnInit(): void {
  }

  s(code: string): void{
    this.par_code = code;
  }

}
