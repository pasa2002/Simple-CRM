import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { DialoagAddUserComponent } from '../dialoag-add-user/dialoag-add-user.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';

/**
 * Represents the Dialog for Editing User Address.
 * This component provides functionality to edit and update the address of a user.
 */
@Component({
  selector: 'app-dialog-edit-adress',
  templateUrl: './dialog-edit-adress.component.html',
  styleUrls: ['./dialog-edit-adress.component.scss']
})
export class DialogEditAdressComponent {
    /** User instance for form binding and data handling. */
  user:User;
  loading=false;
  userId: string;
  /**
   * Constructs the Dialog Edit Address Component.
   * @param dialogRef Reference to the dialog.
   * @param fireStore Service to interact with Angular Firestore.
   */
  constructor(public dialogRef:MatDialogRef<DialoagAddUserComponent>,
    private fireStore:AngularFirestore,){}

      /**
   * Saves the updated user information to Firestore and closes the dialog.
   * This method updates the user's address information.
   */
  saveUser(){
    this.loading = true;
    this.fireStore
    .collection('users')
    .doc(this.userId)
    .update(this.user.toJSON())
    .then(()=>{
      this.loading=false;
      this.dialogRef.close();
    })

  }
}
