import { Component } from '@angular/core';
import { Code } from './code';
import { CompilerService } from './compiler.service';
import { Out } from './Out';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  title = 'ocde-angular';

  inp = { passwd: '314159kenzz17', lang: 'cpp', code: '', stdin: '' };
  out: Out;

  constructor(private compileService: CompilerService){}


  submit() : void {

    this.inp.code=(document.getElementById('Cpp') as HTMLInputElement).value;
    this.compileService.compile(this.inp)
    .subscribe(data => this.out = data);
  }


}
