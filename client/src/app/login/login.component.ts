import { DataService } from './../Services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public submit = false
  
  public password: string 
  public cf_password: string 
  public showPassword: boolean;



 form: FormGroup = new FormGroup({});
  constructor(private router: Router, private fb: FormBuilder, private dataServices : DataService) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', 
      [Validators.required, Validators.minLength(8),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}')],],
    }, 
    {
  })
}
  
  ngOnInit(): void {
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
    else {
      console.log(this.form.value);
      this.dataServices.login(this.form.value).subscribe((res: any)=> 
      console.log("after_login",res))
    }
   
  }
}
