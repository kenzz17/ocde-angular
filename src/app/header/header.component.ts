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
 
  constructor(public worker: WorkerService, public router: Router, public formService: FormService) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.formService.logout().subscribe(
      ()=>{
        this.formService.TOKEN = '';
        this.formService.USERNAME = '';
        this.router.navigate(['/login']);
      }
    )
  }

}
