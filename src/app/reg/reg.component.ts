import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { FormService } from '../form.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit {
  feedbackForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    feedback: new FormControl(null),
    comment: new FormControl('')
  });

  viewRes: boolean = false;

  onSubmit(): void {
    this.formService.postVals(this.feedbackForm.value).subscribe(
      () => {
        this.feedbackForm.reset({
          name: '', email: '', feedback: null, comment: ''
        });
        this.openBar('✅ Successfully submitted response')
      },
      (res) => {
        let str: string = '❌ Unable to submit. Error in';
        for (let x in res.error) str += ' ' + x + ',';
        this.openBar(str.slice(undefined, -1) + '.');
      }
    )
  }


  constructor(private formService: FormService, private msgBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formService.initVals().subscribe((data) => {
      this.feedbackForm.setValue(data)
    })
  }

}
