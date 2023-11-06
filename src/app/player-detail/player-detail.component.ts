import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PlayerAddEditComponent } from '../player-add-edit/player-add-edit.component';
import { PlayerService } from '../services/player.service';
import {Players} from 'src/models/players.class';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit{

  constructor(private route:ActivatedRoute,
    private fireStore:AngularFirestore,
    public dialog: MatDialog){};

    playerId = "";
    players: Players=new Players();

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.playerId  = paramMap.get('id');

      console.log(this.playerId);
      this.getPlayer();
    })
  }

  getPlayer(){
    this.fireStore
    .collection('players')
    .doc(this.playerId)
    .valueChanges()
    .subscribe((user:any)=>{
      this.players = new Players(user);
      this.formattedJoinedDate = this.formatFirestoreTimestamp(this.players.date);
      console.log(this.formattedJoinedDate)
      console.log('retirbves PLayer', this.players)
    })
  }

  editPlayerDetail(){
    const dialog = this.dialog.open(EditPlayerComponent, {
      data: {
        ...this.players.toJson(), // Spread the player data into the dialog's data
        customIdName: this.playerId // Ensure the playerId is passed as customIdName
      }
    });
  }


  formatFirestoreTimestamp(timestamp: any): string {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000); // Convert to milliseconds
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
    return '';
  }

  formattedJoinedDate: string = '';

  // Assuming you fetch the player's data in a method like this:
fetchPlayerData() {
  // ... your code to fetch the player's data
  this.formattedJoinedDate = this.formatFirestoreTimestamp(this.players.date);


}

}
