import { DataService } from './../Services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router"
import { MessageService } from 'primeng/api';
import { MY_CONST } from 'constain';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  public submit = false
  
  public password: string 
  public showPassword: boolean;



 form: FormGroup = new FormGroup({});
  constructor(private router: Router, private fb: FormBuilder, private dataServices : DataService, private messageService: MessageService) {
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
    if (localStorage.getItem(MY_CONST.LOCAL_STORAGE_NAME)!= null) {
      this.router.navigateByUrl('/home')
    }
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
      this.dataServices.login(this.form.value).subscribe((res: any)=>  {
        console.log("after_login",res)
        if(res.Success) {
          localStorage.setItem(MY_CONST.LOCAL_STORAGE_NAME, res.Token)
          this.router.navigateByUrl('home')
        }else {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Incorrect Email or Password'});
        }
      })
    }
  }
      
  
}
