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
  user: User = new User();
  loading=false;
  userForm: FormGroup;
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

  onNoClick(){
    this.dialogRef.close();
  }

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

