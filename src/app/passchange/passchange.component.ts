import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { FormService } from '../form.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passchange',
  templateUrl: './passchange.component.html',
  styleUrls: ['./passchange.component.css']
})
export class PasschangeComponent implements OnInit {

  x = false;

  
  feedbackForm = new FormGroup({
    old_password: new FormControl('',Validators.required),
    new_password: new FormControl('',Validators.required)
  });

  public openBar(message: string) {
    this.msgBar.open(message, undefined, { duration: 3000, });
  }

  constructor(public formService: FormService, private msgBar: MatSnackBar, private route:Router) { }

  onSubmit(): void {
    if(this.feedbackForm.valid){
      this.formService.change(JSON.parse(JSON.stringify(this.feedbackForm.value))).subscribe(
        (res) => {
          var obj = JSON.parse(JSON.stringify(res));
          if(("message" in obj)==true){
            this.openBar(obj["message"]);
            this.x = false;
          }
        },(error)=>{
          var obj = JSON.parse(JSON.stringify(error));
          var mess = "";
          for(let x in obj["error"]){
            mess += obj["error"][x]+'\n';
          }
          this.openBar(mess.trim());
        }
      )
    }
  }

  ngOnInit(): void {
  }

  change(): void{
    this.x = true;
  }

  cancel(): void{
    this.x = false;
  }

}
