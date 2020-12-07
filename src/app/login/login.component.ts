import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { FormService } from '../form.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  feedbackForm = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });

  
  public openBar(message: string) {
    this.msgBar.open(message, undefined, { duration: 3000, });
  }


  constructor(private formService: FormService, private msgBar: MatSnackBar,private route:Router) { }

  onSubmit(): void {
    if(this.feedbackForm.valid){
      this.formService.initVals(JSON.parse(JSON.stringify(this.feedbackForm.value))).subscribe(
        (res) => {
          var obj = JSON.parse(JSON.stringify(res));
          if(("token" in obj)==true){
            this.formService.TOKEN = obj["token"];
            this.feedbackForm.get
            this.formService.USERNAME = this.feedbackForm.get("username").value;
            this.openBar("Login Successful");
            this.route.navigate(['/editor'])
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

  
  signup(): void{
    this.route.navigate(['/reg'])
  }

  guestlogin(): void{
    this.route.navigate(['/editor'])
  }


}
