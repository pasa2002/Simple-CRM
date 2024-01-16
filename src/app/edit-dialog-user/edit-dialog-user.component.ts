import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialoagAddUserComponent } from '../dialoag-add-user/dialoag-add-user.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
/**
 * Represents the Edit Dialog for User Component.
 * This component provides functionality to edit and update user information.
 */
@Component({
  selector: 'app-edit-dialog-user',
  templateUrl: './edit-dialog-user.component.html',
  styleUrls: ['./edit-dialog-user.component.scss']
})
export class EditDialogUserComponent {
loading=false;
user:User;
userId:string;

  /**
   * Constructs the Edit Dialog User Component.
   * @param dialogRef Reference to the dialog.
   * @param fireStore Service to interact with Angular Firestore.
   */
constructor(public dialogRef:MatDialogRef<DialoagAddUserComponent>,
  private fireStore:AngularFirestore,){}

  /**
   * Saves the updated user information to Firestore and closes the dialog.
   */
saveUser(){
  this.loading= true;
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
