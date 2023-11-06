import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';
import { EditDialogUserComponent } from '../edit-dialog-user/edit-dialog-user.component';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{

  constructor(private route:ActivatedRoute,
              private fireStore:AngularFirestore,
              public dialog: MatDialog){};
  userId="";
  user:User=new User();

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap=>{
      this.userId = paramMap.get('id');

      console.log(this.userId)

      this.getUser();
    })
  }

  getUser(){
    this.fireStore
    .collection('users')
    .doc(this.userId)
    .valueChanges()
    .subscribe((user:any)=>{
      this.user = new User(user);
      console.log('retreibes User', this.user)
    })
  }

  editMenu(){
    const dialog = this.dialog.open(DialogEditAdressComponent);
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }

  editUserDetail(){
    const dialog=this.dialog.open(EditDialogUserComponent)
    dialog.componentInstance.user = new User(this.user.toJSON());
    dialog.componentInstance.userId = this.userId;
  }
}
