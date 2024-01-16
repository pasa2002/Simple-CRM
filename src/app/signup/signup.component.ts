import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms'
import { AuthService } from '../services/authentication.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

/**
 * Custom validator function to check if passwords match.
 * @returns A validator function that checks if 'password' and 'confirmPassword' fields match.
 */
export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordDontMatch: true
      }
    }
    return null;
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // Initialize the sign-up form with form controls and validators
  signUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  }, { validators: passwordsMatchValidator() })

  constructor(
    private authService: AuthService,
    private toast: HotToastService,
    private router: Router
  ) { }

  ngOnInit(): void {}

  /**
   * Get the 'email' form control.
   * @returns The 'email' form control.
   */
  get email() {
    return this.signUpForm.get('email');
  }

  /**
   * Get the 'password' form control.
   * @returns The 'password' form control.
   */
  get password() {
    return this.signUpForm.get('password');
  }

  /**
   * Get the 'confirmPassword' form control.
   * @returns The 'confirmPassword' form control.
   */
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  /**
   * Get the 'name' form control.
   * @returns The 'name' form control.
   */
  get name() {
    return this.signUpForm.get('name');
  }

  /**
   * Submit the sign-up form.
   * If the form is valid, it signs up the user with the provided information.
   */
  submit() {
    if (!this.signUpForm.valid) {
      return;
    }
    const { name, email, password } = this.signUpForm.value;

    this.authService.signUp(email, password)
      .pipe(
        this.toast.observe({
          success: 'Congrats! You are all Signed up',
          loading: 'Signing in',
          error: ({ message }) => `${message}`
        })
      )
      .subscribe(() => {
        this.router.navigate(['/dashboard'])
      });
  }
}
