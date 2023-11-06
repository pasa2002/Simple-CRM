import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../services/authentication.service';
import { authState } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

    loginForm = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private authService: AuthService,
    private toast: HotToastService,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {

  }



  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }


  submit() {
    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      return;
    }

    this.authService
      .login(email, password)
      .pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Logging in...',
          error: ({ message }) => `There was an error: ${message} `,
        })
      )
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
  }

  loginAsGuest() {
    const guestEmail = 'guest@guest.de';
    const guestPassword = 'guest1';

    this.authService
        .login(guestEmail, guestPassword)
        .pipe(
          this.toast.observe({
            success: 'Logged in as a guest successfully',
            loading: 'Logging in as a guest...',
            error: ({ message }) => `There was an error: ${message} `,
          })
        )
        .subscribe(() => {
          this.router.navigate(['/dashboard']);
        });
  }

}
