import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { authState, Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential, User } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isGuest: boolean = true;

  currentUser$: Observable<User | null> = authState(this.auth);

  constructor(private auth: Auth,private firestore: AngularFirestore,) {
    authState(this.auth).subscribe((user) => {
      this.isGuest = user ? false : true;
    });
  }

  signUp(email: string, password: string): Observable<UserCredential> {
    return from(createUserWithEmailAndPassword(this.auth, email, password));
  }

  login(email: string, password: string): Observable<any> {
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  getIsGuest(): boolean {
    return this.isGuest;
  }

  getUserId(): string | null {
    const user = this.auth.currentUser;
    return user ? user.uid : null;
  }

  async addData(someData: any, userId: string | null = null) {
    if (!userId) {
      console.error("User not authenticated");
      return;
    }

    this.firestore.collection('users').doc(userId).collection('data').add(someData);
  }
}
