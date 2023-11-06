import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
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

getPlayersWithEarnings() {
  return this.firestore.collection('players').valueChanges({ idField: 'id' })
    .pipe(
      map(players => players.map((player: any) => ({
        name: `${player.firstName} ${player.lastName}`,
        salary: player.salary
      })))
    );
}

}
