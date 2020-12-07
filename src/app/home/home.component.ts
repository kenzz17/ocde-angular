import { Component, OnInit } from '@angular/core';
import {PROJECTS, SAMPLE_PROJ, FILES} from '../mock-data';
import { File } from '../File';
import { Router } from '@angular/router';
import { WorkerService } from '../worker.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /*
    NOTE : ProjectFile != File
    NOTE : all requests for files (and new files/projects) to be done here only
    when a project is opened, its structure is maintained in the editor by
    workspace_structure, which is locally stored in the editor component as
    this.files
    (this.files and workspace_structure array can store File or ProjectFile or both)
    if scratch file is opened workspace_structure or this.files stores other 
    scratch files
  */
  scratch_files_list = FILES; //make get request, it gives File[]
  projects_list = PROJECTS; //get request gives just names of projects : string[]

  gotoScratch(file:File){
    this.worker.openFile_name = file.name;
    this.worker.openFile_lang = file.lang;
    this.worker.openFile_body = file.body;
    this.worker.workspace_isScratch = true;
    this.worker.workspace_structure = FILES; //simulated by FILES
    this.router.navigateByUrl('/editor');
  }
  gotoProj(projName:string){
    //make get request to `projName` project
    //may get data like {'name':projName, 'files':[..an array of files (ProjFile[])..]}
    this.worker.workspace_isScratch = false;
    this.worker.workspace_structure = SAMPLE_PROJ; //simulated by SAMPLE_PROJ
    this.worker.workspace_name = 'proj1';
    this.router.navigateByUrl('/editor');
  }

  new_file='';
  is_add=false; is_Project = false;
  fin_add(): void{
    if(this.is_Project)
      this.projects_list.push(this.new_file);
    else
      this.scratch_files_list.push({
        name: this.new_file.split('.').slice(0,-1).join('.'),
        body: '',
        lang: this.new_file.split('.').slice(-1)[0]
      })
    this.new_file = '';
    this.is_add = false;
  }

  constructor(public worker: WorkerService, public router: Router) { }

  ngOnInit(): void {
  }

}
