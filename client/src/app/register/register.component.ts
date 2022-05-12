import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import custom validator  class
import { CustomValidators } from '../providers/CustomValidators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],

})
export class RegisterComponent {

  public submit = false
  

  public password: string 
  public cf_password: string 
  public showPassword: boolean;


  form: FormGroup = new FormGroup({});

  
  constructor(private fb: FormBuilder) {
  
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', 
      [Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')
    ]],
      confirm_password: ['', [Validators.required]]
    }, 
    {
     validator: CustomValidators.mustMatch('password', 'confirm_password')
  })
  }
  
  get f(){
    return this.form.controls;
  }
   
  onSubmit(){
    this.submit = true

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
  }

   
}
