import { Component, OnInit } from '@angular/core';
import { PROJECTS, SAMPLE_PROJ, FILES, SAMPLE_FILE } from '../mock-data';
import { File } from '../File';
import { Router } from '@angular/router';
import { WorkerService } from '../worker.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormService } from '../form.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  currentUser: any;
  token= "";
  username= "";
  httpOption: any;
  constructor(
    public worker: WorkerService,
    public router: Router,
    public http: HttpClient,
    public formService: FormService,
    private msgBar: MatSnackBar
  ) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.currentUser==null){
      localStorage.setItem('currentUser', JSON.stringify({ token: "", name: "" }));
    }
    else{
      this.token = this.currentUser.token;
      this.username = this.currentUser.name;
      this.httpOption = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "Token " + this.token
        })
     }
    }
  }

  scratch_files_list = []; //FILES.names; //make get request, it gives File[]
  projects_list = []; //PROJECTS.projectlist; //get request gives just names of projects : string[]

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.currentUser.token;
    this.username = this.currentUser.name;     
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Token " + this.token
      })
    }
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
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.currentUser.token;
    this.username = this.currentUser.name;     
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Token " + this.token
      })
    }
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
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.currentUser.token;
    this.username = this.currentUser.name;     
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Token " + this.token
      })
    }
    //make get request to `projName` project
    //may get data like {'name':projName, 'files':[..an array of files (ProjFile[])..]}
    this.http.post<JSON>("http://52.187.32.163:8000/api/projectget/", {
      all: 'False', name: projName
    },
      this.httpOption).subscribe((data: any) => {
        this.worker.workspace_structure.splice(0, this.worker.workspace_structure.length, ...data.data)
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
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.currentUser.token;
    this.username = this.currentUser.name;     
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Token " + this.token
      })
    }
    const store = this.new_file;
    if (this.is_Project) {
      //upload new folder
      //if success : this.projects_list.push(this.new_file);
      if(this.projects_list.includes(store)) return this.openBar('Project with the same name already exits!');
      this.http.post<JSON>("http://52.187.32.163:8000/api/projects/", {
        name: 'main.cpp', projectname: store, relpath: '', lang: 'cpp',
        body: '#include <iostream>\nusing namespace std;\n\nint main(){\n\t\n\treturn 0;\n}'
      }, this.httpOption).subscribe(
        () => this.projects_list.push(store),
        (data: any) => this.openBar(data.error.message || 'Unable to create new project')
      );
    }
    else {
      //upload file
      //if success : this.scratch_files_list.push(this.new_file)
      if(this.scratch_files_list.includes(store)) return this.openBar('File with the same name already exits!');
      this.http.post<JSON>("http://52.187.32.163:8000/api/files/", {
        name: store,
        lang: store.split('.').slice(-1)[0],
        body: store.split('.').slice(-1)[0] == 'cpp' ?
          '#include <iostream>\nusing namespace std;\n\nint main(){\n\t\n\treturn 0;\n}' : ''
      }, this.httpOption).subscribe(
        () => this.scratch_files_list.push(store),
        (data: any) => this.openBar(data.error.error || 'Unable to create new file')
      );
    }
    this.new_file = '';
    this.is_add = false;
  }

  delFullProj(projName: string) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.currentUser.token;
    this.username = this.currentUser.name;     
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Token " + this.token
      })
    }
    this.http.post<JSON>(
      "http://52.187.32.163:8000/api/projectdelete/", {
      all: 'True', projectname: projName, filename: 'arbit'
    },
      this.httpOption).subscribe(
        (data:any) => {
          this.projects_list.forEach((ele, idx) => {
            if (ele == projName) {
              if(projName==this.worker.workspace_name){
                this.worker.openFile_body = '#include <iostream>\nusing namespace std;\n\nint main(){\n\t\n\treturn 0;\n}';
                this.worker.openFile_lang = 'cpp';
                this.worker.openFile_name = 'untitled.cpp'
                this.worker.openFile_path = '';
                this.worker.workspace_structure.splice(0,this.worker.workspace_structure.length);
                this.worker.workspace_isScratch = true;
                this.worker.workspace_name = '';
              }
              this.projects_list.splice(idx, 1);
            }
          })
          this.openBar(data.message);
        },
        () => this.openBar('Unable to delete file')
      )
  }

  delScratch(fileName: string) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = this.currentUser.token;
    this.username = this.currentUser.name;     
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Token " + this.token
      })
    }
    this.http.post<JSON>(
      "http://52.187.32.163:8000/api/filedelete/", {
      all: 'False', name: fileName
    },
      this.httpOption).subscribe(
        (data:any) => {
          this.scratch_files_list.forEach((ele, idx) => {
            if (ele == fileName){
              if(fileName==this.worker.openFile_name && this.worker.workspace_isScratch){
                this.worker.openFile_body = '#include <iostream>\nusing namespace std;\n\nint main(){\n\t\n\treturn 0;\n}';
                this.worker.openFile_lang = 'cpp';
                this.worker.openFile_name = 'untitled.cpp'
                this.worker.openFile_path = '';
                this.worker.workspace_structure.splice(0,this.worker.workspace_structure.length);
                this.worker.workspace_isScratch = true;
                this.worker.workspace_name = '';
              }
              this.scratch_files_list.splice(idx, 1)
            }
          })
          this.openBar(data.message);
        },
        () => this.openBar('Unable to delete file')
      )
  }

  public openBar(message: string) {
    this.msgBar.open(message, undefined, { duration: 3000, });
  }

  

}
