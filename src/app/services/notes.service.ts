import { Injectable } from '@angular/core';
import { Note } from '../../models/notes.class';
import { AngularFirestore , AngularFirestoreCollection} from '@angular/fire/compat/firestore';

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

}
