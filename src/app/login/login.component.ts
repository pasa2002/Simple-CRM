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

/**
 * Represents the Login Component.
 * This component provides functionality for user login.
 */
export class LoginComponent implements OnInit{
    isGuest:boolean;

      /** FormGroup for the login form. */
    loginForm = new FormGroup({
    email:new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })
  /**
   * Constructs the Login Component.
   * @param authService Service for user authentication.
   * @param toast Service for displaying toast notifications.
   * @param router Service for navigating between routes.
   * @param fb FormBuilder for creating reactive forms.
   * @param afAuth AngularFireAuth service for Firebase authentication.
   */
  constructor(
    private authService: AuthService,
    private toast: HotToastService,
    private router: Router,
    private fb: NonNullableFormBuilder,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.isGuest = !user;
    });
  }


 /**
   * Getter for the email form control.
   * @returns The email form control.
   */
  get email(){
    return this.loginForm.get('email');
  }
  /**
   * Getter for the password form control.
   * @returns The password form control.
   */
  get password(){
    return this.loginForm.get('password');
  }

  /**
   * Handles the form submission for user login.
   */
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
  /**
   * Logs in as a guest user.
   */
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
        // After successful login, get the user ID and navigate to the dashboard
        const userId = this.authService.getUserId();
        if (userId) {
          this.router.navigate(['/dashboard', userId]);
        }
      });
  }


}
