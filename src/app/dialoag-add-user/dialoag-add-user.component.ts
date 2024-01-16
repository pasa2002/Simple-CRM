/**
 * Represents the Dialog to Add User Component.
 * This component manages the form and functionality to add a new user.
 */

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialoag-add-user',
  templateUrl: './dialoag-add-user.component.html',
  styleUrls: ['./dialoag-add-user.component.scss']
})
export class DialoagAddUserComponent implements OnInit{
  /** User model instance for form binding. */
  user: User = new User();
  /** Flag for indicating loading state. */
  loading=false;
  /** FormGroup to handle user input for new user data. */
  userForm: FormGroup;

    /**
   * Constructs the Dialog Add User Component.
   * @param firestore Service to interact with Angular Firestore.
   * @param dialogRef Reference to the dialog.
   * @param fb FormBuilder for form control creation and validation.
   */
  constructor(private firestore:AngularFirestore,
      public dialogRef:MatDialogRef<DialoagAddUserComponent>,
      private fb:FormBuilder
    ){
      this.userForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        investedAmount: [null, [Validators.required, Validators.min(0)]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', Validators.required],
        zipCode: ['', Validators.required],
        city: ['', Validators.required],
        notes:['',Validators.required]
      });
  }

  ngOnInit():void{

  }
/**
   * Closes the dialog without saving any changes.
   */
  onNoClick(){
    this.dialogRef.close();
  }
  /**
   * Saves the new user to Firestore and closes the dialog.
   * Performs form validation before submission.
   */
  saveUser(): void {
    if (this.userForm.valid) {
      this.loading = true;
      const userObj = { ...this.userForm.value }; // Clone the form value

      this.firestore
        .collection('users')
        .add(userObj)
        .then((result: any) => {
          this.loading = false;
          this.dialogRef.close();
        });
    } else {
      // Mark form controls as touched to show validation messages
      this.userForm.markAllAsTouched();
    }
  }
}

