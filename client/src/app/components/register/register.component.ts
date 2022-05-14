import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

// import custom validator  class
import { CustomValidators } from '../../providers/CustomValidators';
import { DataService } from '../../Services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]

})
export class RegisterComponent {

  public submit = false
  

  public password: string 
  public cf_password: string 
  public showPassword: boolean;


  form: FormGroup = new FormGroup({});

  
  constructor(private fb: FormBuilder, private dataServices : DataService, private messageService: MessageService, private router : Router) {
  
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
    } else {
      console.log(this.form.value);
      this.dataServices.register(this.form.value).subscribe((res: any)=> {
        console.log("after_register",res)
        if(res.Success){
          this.messageService.add({severity:'success', summary: 'Success', detail: 'Register Successfully'});
          setTimeout(() => {
            this.router.navigate(['/login'])
          },2000)
        }else {
          this.messageService.add({severity:'error', summary: 'Error', detail: 'Register Failed'});
        }
      })

    }
    
    
  }

   
}
