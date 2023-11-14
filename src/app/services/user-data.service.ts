import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  async addData(someData: any, userId: string | null = null) {
    if (!userId) {
      console.error("User ID is required");
      return;
    }

    this.firestore.collection('users').doc(userId).collection('data').add(someData);
  }

  getUserData(userId: string): Observable<any[]> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .collection('data')
      .valueChanges();
  }

}
