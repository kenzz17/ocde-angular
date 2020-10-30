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
  title = 'ocde-angular';
  able = false;

  inp = { passwd: '314159kenzz17', lang: 'cpp', code: '', stdin: '' };
  out: Out;

  constructor(private compileService: CompilerService) { }


  submit(): void {
    this.able = true;
    this.inp.lang = this.selected;
    this.inp.code = (document.getElementById('code') as HTMLInputElement).value;
    this.inp.stdin = (document.getElementById('input') as HTMLInputElement).value;
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
