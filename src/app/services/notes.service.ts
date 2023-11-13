import { Injectable } from '@angular/core';
import { Note } from '../../models/notes.class';
import { AngularFirestore , AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  fireStoreCollection : AngularFirestoreCollection;

  constructor(private firestore:AngularFirestore) {
    this.fireStoreCollection = firestore.collection('todos'),
                                firestore.collection('description');
  }

  addTodo(title:string, description:string){
    this.fireStoreCollection.add({
      title,
      description,
    })
  }

  getNotes(): Observable<Note[]> {
    return this.firestore.collection('todos', ref => ref.limit(4))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as object;
          const customIdName = a.payload.doc.id;
          return new Note({ customIdName, ...data });
        }))
      );
  }

  getNotesCount(): Observable<number> {
    return this.firestore.collection('todos')
      .get()
      .pipe(
        map(querySnapshot => querySnapshot.size)
      );
  }



}
