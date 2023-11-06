import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialoagAddUserComponent } from '../dialoag-add-user/dialoag-add-user.component';
import { User } from 'src/models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: User = new User();
  allUsers = [];

  constructor(public dialog: MatDialog, private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.firestore.collection('users')
    .valueChanges({idField:'customIdName'})
    .subscribe((changes:any)=>{
        console.log('received changes', changes)
        this.allUsers = changes;
    });
  }

  openDialog() {
    this.dialog.open(DialoagAddUserComponent);
  }

  deleteUser(event: Event, user: any): void {
    // Prevent event propagation
    event.stopPropagation();

    // Delete the user from Firestore
    this.firestore.collection('users').doc(user.customIdName).delete()
      .then(() => {
        // On successful deletion from Firestore, delete the user from the local list
        const index = this.allUsers.indexOf(user);
        if (index > -1) {
          this.allUsers.splice(index, 1);
        }
      })
      .catch(error => {
        console.error("Error deleting user: ", error);
      });
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
