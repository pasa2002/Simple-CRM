import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialoag-add-user',
  templateUrl: './dialoag-add-user.component.html',
  styleUrls: ['./dialoag-add-user.component.scss']
})
export class DialoagAddUserComponent implements OnInit{
  user: User = new User();
  birthDate !: Date;
  loading=false;
  constructor(private firestore:AngularFirestore,
      public dialogRef:MatDialogRef<DialoagAddUserComponent>
    ){

  }

  ngOnInit():void{

  }

  onNoClick(){
    this.dialogRef.close();
  }

  saveUser(): void {
    // this.user.birthDate = this.birthDate.getTime(); // Keep it as a timestamp

    console.log('current user is', this.user);
    this.loading = true;
    const userObj = this.user.toJSON();

    this.firestore
      .collection('users')
      .add(userObj)
      .then((result: any) => {
        this.loading = false;
        console.log('adding user finished', result)
        this.dialogRef.close();
      });
}
formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 because months are 0-indexed
  const year = date.getFullYear();

  return `${month}/${day}/${year}`; // MM/DD/YYYY format
}


onDateChange(event: any): void {
  const formattedDate = this.formatDate(event.value);
  console.log('Selected Date:', formattedDate);

}

}
