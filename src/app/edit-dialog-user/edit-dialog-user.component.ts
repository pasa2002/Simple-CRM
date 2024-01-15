import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';
import { DialoagAddUserComponent } from '../dialoag-add-user/dialoag-add-user.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-edit-dialog-user',
  templateUrl: './edit-dialog-user.component.html',
  styleUrls: ['./edit-dialog-user.component.scss']
})
export class EditDialogUserComponent {
loading=false;
user:User;
userId:string;


constructor(public dialogRef:MatDialogRef<DialoagAddUserComponent>,
  private fireStore:AngularFirestore,){}


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
