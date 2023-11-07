import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore , AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
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
        salary: player.salary,
        experience:player.experience
      })))
    );
}

  // Method to add a player's score
  addPlayerScore(playerId: string, scoreData: any): Promise<any> {
    return this.firestore.collection('players').doc(playerId).collection('scores').add(scoreData);
  }

  // Method to get all scores for a specific player
  getPlayerScores(playerId: string): Observable<any[]> {
    return this.firestore.collection('players').doc(playerId).collection('scores').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

// Method to update a player's score
// Simplified update method without fetching the document first
updatePlayerScore(playerId: string, scoreId: string, scoreData: any): Promise<void> {
  const scoreDocRef = this.firestore.collection('players').doc(playerId).collection('scores').doc(scoreId);
  return scoreDocRef.update(scoreData);
}


  // Method to delete a player's score
  deletePlayerScore(playerId: string, scoreId: string): Promise<void> {
    return this.firestore.collection('players').doc(playerId).collection('scores').doc(scoreId).delete();
  }

}
