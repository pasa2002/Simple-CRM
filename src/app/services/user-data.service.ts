import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {}

  async addData(someData: any) {
    const userId = (await this.afAuth.currentUser)?.uid;

    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    this.firestore.collection('users').doc(userId).collection('data').add(someData);
  }
}
