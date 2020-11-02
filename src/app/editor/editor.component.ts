import { Component, OnInit } from '@angular/core';
import { Code } from '../Code';
import { CompilerService } from '../compiler.service';
import { Out } from '../Out';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  selected = 'cpp';
  stdin = '';
  title = 'ocde-angular';
  able = false;

  inp: Code = { passwd: '314159kenzz17', lang: 'cpp', code: '', stdin: '' };
  out: Out;

  //set language for syntax highlighting here
  editorOptions = {theme: 'vs-dark', language: 'cpp'};
  
  // initial value of code --> should be different for different languages 
  code: string = '#include <iostream>\nusing namespace std;\n\nint main(){\n\t\n\treturn 0;\n}';

  constructor(private compileService: CompilerService) { }


  submit(): void {
    this.able = true;
    this.inp.lang = this.selected;
    this.inp.code = this.code;
    this.inp.stdin = this.stdin;
    this.compileService.compile(this.inp)
      .subscribe(data => this.show(data));
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

}
