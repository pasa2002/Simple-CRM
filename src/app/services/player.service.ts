import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Players } from 'src/models/players.class'

@Injectable({
  providedIn: 'root'
})
export class PlayerService {


fireStoreCollection : AngularFirestoreCollection;

constructor(private firestore:AngularFirestore){
  this.fireStoreCollection = firestore.collection('players')
}

addPlayers(firstName, lastName,email, date,gender,level,oldTeam,experience,salary){
  this.fireStoreCollection.add({
    firstName: firstName,
    lastName:lastName,
    email:email,
    date:date,
    gender:gender,
    level:level,
    oldTeam:oldTeam,
    experience:experience,
    salary:salary

  })
}

}
