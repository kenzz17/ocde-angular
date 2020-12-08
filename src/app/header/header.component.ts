import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkerService } from '../worker.service';
import { FormService } from '../form.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: any;
  token= "";
  username= "";
 
  constructor(public worker: WorkerService, public router: Router, public formService: FormService) {
      
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser==null){
      localStorage.setItem('currentUser', JSON.stringify({ token: "", name: "" }));
    }
    else{
      this.token = this.currentUser.token;
      this.username = this.currentUser.name;
    }
   }

  ngOnInit(): void {
  }


  logout(): void{
    this.formService.logout(this.token).subscribe(
      ()=>{
        localStorage.setItem('currentUser', JSON.stringify({ token: '', name: '' }));
        //this.formService.TOKEN = '';
        //this.formService.USERNAME = '';
        this.worker.openFile_body = '#include <iostream>\nusing namespace std;\n\nint main(){\n\t\n\treturn 0;\n}';
        this.worker.openFile_lang = 'cpp';
        this.worker.openFile_name = 'untitled.cpp'
        this.worker.openFile_path = '';
        this.worker.workspace_structure.splice(0,this.worker.workspace_structure.length);
        this.worker.workspace_isScratch = true;
        this.worker.workspace_name = '';
        this.router.navigate(['/login']);
      }
    )
  }

  change(){
    this.router.navigate(['/passchange']);
  }

}
