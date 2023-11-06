import { Component } from '@angular/core';
import { User } from 'src/models/user.class';
import { DialoagAddUserComponent } from '../dialoag-add-user/dialoag-add-user.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-dialog-edit-adress',
  templateUrl: './dialog-edit-adress.component.html',
  styleUrls: ['./dialog-edit-adress.component.scss']
})
export class DialogEditAdressComponent {
  user:User;
  loading=false;
  userId: string;

  constructor(public dialogRef:MatDialogRef<DialoagAddUserComponent>,
    private fireStore:AngularFirestore,){}

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
