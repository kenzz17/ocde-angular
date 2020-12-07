import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { FormService } from '../form.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {

  feedbackForm = new FormGroup({
    username: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });


  onSubmit(): void {
    if(this.feedbackForm.valid){
      this.formService.postVals(JSON.parse(JSON.stringify(this.feedbackForm.value))).subscribe(
        (res) => {
          var obj = JSON.parse(JSON.stringify(res));
          if(("token" in obj)==true){
            this.formService.TOKEN = obj["token"];
            this.formService.USERNAME = obj["user"]["username"];
            this.openBar("Registration Successful");
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

  public openBar(message: string) {
    this.msgBar.open(message, undefined, { duration: 3000, });
  }

  constructor(private formService: FormService, private msgBar: MatSnackBar,private route:Router) { }

  ngOnInit(): void{
  }

  login(): void{
    this.route.navigate(['/login'])
  }

  guestlogin(): void{
    this.route.navigate(['/editor'])
  }

}
