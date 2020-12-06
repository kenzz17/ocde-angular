import { Injectable } from '@angular/core';
import { ProjectFile } from './ProjectFile';
import { File } from './File';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  public openFile_path:string = '';
  public openFile_name:string = 'untitled';
  public openFile_lang:string = 'cpp';
  public openFile_body:string = '#include <iostream>\nusing namespace std;\n\nint main(){\n\t\n\treturn 0;\n}';
  public workspace_isScratch:boolean = true;//false;
  public workspace_structure:ProjectFile[]|File[] = []; //SAMPLE_PROJ.files;
  public workspace_name:string = 'Untitled Workspace'; //SAMPLE_PROJ.name;

  constructor() { }
}
