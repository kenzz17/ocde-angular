import { Component, OnInit } from '@angular/core';
import { PROJECTS, SAMPLE_PROJ, FILES, SAMPLE_FILE } from '../mock-data';
import { File } from '../File';
import { Router } from '@angular/router';
import { WorkerService } from '../worker.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormService } from '../form.service';

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

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Token " + this.formService.TOKEN
    })
  }
  scratch_files_list = [];//FILES.names; //make get request, it gives File[]
  projects_list = []//PROJECTS.projectlist; //get request gives just names of projects : string[]

  ngOnInit(): void {
    this.http.post<JSON>("http://52.187.32.163:8000/api/fileget/", {
      all: 'True', name: 'arbit'
    },
      this.httpOption).subscribe((data: any) => this.scratch_files_list = data.names);

    this.http.post<JSON>("http://52.187.32.163:8000/api/projectget/", {
      all: 'True', name: 'arbit'
    },
      this.httpOption).subscribe((data: any) => this.projects_list = data.projectlist);
  }

  gotoScratch(fileName: string) {
    this.worker.openFile_name = fileName;
    //make get by `fileName`
    this.http.post<JSON>("http://52.187.32.163:8000/api/fileget/", {
      all: 'False', name: fileName
    },
      this.httpOption).subscribe((data: any) => {
        this.worker.openFile_lang = data.lang;
        this.worker.openFile_body = data.body; //data ~ SAMPLE_FILE
      });
    this.worker.openFile_path = '';
    this.worker.workspace_isScratch = true;
    this.worker.workspace_structure = [];
    this.router.navigateByUrl('/editor');
  }
  gotoProj(projName: string) {
    //make get request to `projName` project
    //may get data like {'name':projName, 'files':[..an array of files (ProjFile[])..]}
    this.http.post<JSON>("http://52.187.32.163:8000/api/projectget/", {
      all: 'False', name: projName
    },
      this.httpOption).subscribe((data: any) => {
        this.worker.workspace_structure.length = 0;
        this.worker.workspace_structure.concat(data.data);
        this.worker.openFile_name = data.data[0].name;
        this.worker.openFile_lang = data.data[0].lang;
        this.worker.openFile_body = data.data[0].body;
        this.worker.openFile_path = data.data[0].path; //data ~ SAMPLE_PROJ
      });
    this.worker.workspace_name = projName;
    this.worker.workspace_isScratch = false;
    this.router.navigateByUrl('/editor');
  }

  new_file = '';
  is_add = false; is_Project = false;
  fin_add(): void {
    if (this.is_Project) {
      //upload new file
      //if success : this.projects_list.push(this.new_file);
    }
    else {
      //upload folder
      //if success : this.scratch_files_list.push(this.new_file)

      //lang: this.new_file.split('.').slice(-1)[0]
      //name: this.new_file
    }
    this.new_file = '';
    this.is_add = false;
  }

  constructor(
    public worker: WorkerService,
    public router: Router,
    public http: HttpClient,
    public formService: FormService
  ) { }

}
