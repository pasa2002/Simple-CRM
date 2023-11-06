import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms'
import { AuthService } from '../services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

export function passwordsMatchValidator():ValidatorFn{
  return (control:AbstractControl):ValidationErrors | null =>{
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;


    if (password && confirmPassword && password !== confirmPassword){
      return{
        passwordDontMatch:true
      }
    }
    return null
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email:new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword:new FormControl('', Validators.required)

  },{validators:passwordsMatchValidator()})

  constructor(    private authService: AuthService,
    private toast: HotToastService,
    private  router:Router){}
  ngOnInit(): void {

  }
  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get name() {
    return this.signUpForm.get('name');
  }

  submit(){
    if(!this.signUpForm.valid){
      return;
    }
    const{name,email,password}=this.signUpForm.value;

    this.authService.signUp(email,password,)
    .pipe(
      this.toast.observe({
        success:'Congrats! You are all Signed up',
        loading:'Signing in',
        error:({message})=>`${message}`
      })
    ).subscribe(()=>{
      this.router.navigate(['/dashboard'])
    })

  }
}
