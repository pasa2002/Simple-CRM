import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PlayerAddEditComponent } from '../player-add-edit/player-add-edit.component';
import { PlayerService } from '../services/player.service';
import {Players} from 'src/models/players.class';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit{

  constructor(private route:ActivatedRoute,
    private fireStore:AngularFirestore,
    public dialog: MatDialog,
    private playerService: PlayerService,
    private cdr: ChangeDetectorRef,){};

    playerId = "";
    players: Players=new Players();
    public lineChartData: ChartData<'line'>;
    public lineChartOptions: ChartOptions = {
      responsive: true,
    };
    public dataSource = new MatTableDataSource<number>([]);
    public displayedColumns: string[] = ['date', 'points', 'actions'];


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.playerId  = paramMap.get('id');

      console.log(this.playerId);
      this.getPlayer();
    })
    this.fetchScoresForChart();
    this.loadScores();
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
  this.formattedJoinedDate = this.formatFirestoreTimestamp(this.players.date);
}

// Add this inside your PlayerDetailComponent class

newScore = { date: null, score: null };

addScore() {
  if (this.newScore.date && this.newScore.score) {
    const scoreWithFirestoreDate = {
      score: this.newScore.score,
      date: firebase.firestore.Timestamp.fromDate(new Date(this.newScore.date)) // Convert the date to a Firestore timestamp
    };

    this.playerService.addPlayerScore(this.playerId, scoreWithFirestoreDate)
      .then(() => {
        console.log('Score added successfully');
        // You might want to fetch the updated scores here to update the chart
        this.fetchScoresForChart();
      })
      .catch(error => {
        console.error('Error adding score: ', error);
      });
  }
  this.fetchScoresForChart();
}

fetchScoresForChart(): void {
  this.playerService.getPlayerScores(this.playerId).subscribe(scores => {
    // Assuming 'scores' is an array of objects with 'date' and 'score' properties
    this.lineChartData = {
      datasets: [
        {
          data: scores.map(s => s.score),
          label: 'Player Score',
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.3)',
        }
      ],
      labels: scores.map(s => new Date(s.date.seconds * 1000).toLocaleDateString()),
    };
  });
}

loadScores(): void {
  this.playerService.getPlayerScores(this.playerId).subscribe(scores => {
    this.dataSource.data = scores.map(score => {
      let date;
      try {
        // Check if 'toDate' function exists before calling it
        date = score.date && typeof score.date.toDate === 'function' ? score.date.toDate() : new Date(score.date);
      } catch (error) {
        console.error('Error converting date:', error);
        // Handle the error appropriately, maybe set a default date or leave it undefined
        date = new Date(); // or whatever fallback is appropriate
      }
      return {
        ...score,
        date: date,
        points: score.score
      };
    });
  });
  this.cdr.detectChanges();
}



editingElement: any = null;

saveScore(playerId: string, scoreId: string) {
  if (!scoreId) {
    console.error('No scoreId provided for player:', playerId);
    return;
  }

  const updatedScoreData = {
    date: this.editingElement.date,
    score: this.editingElement.score, // Make sure 'points' matches the Firestore field
  };


  this.playerService.updatePlayerScore(playerId, scoreId, updatedScoreData)
    .then(() => {
      console.log('Score updated successfully');
      this.editingElement = null; // Reset the editing state
      this.loadScores(); // Reload the scores to reflect the update
      this.cdr.detectChanges(); // Trigger change detection
    })
    .catch(error => {
      console.error('Error updating score:', error);
    });
}


// Method to set the element as currently being edited
editScore(element: any) {
  this.editingElement = element;
}



deleteScore(scoreId: string): void {
  if (!scoreId) {
    console.error('No scoreId provided for deletion');
    return;
  }

  this.playerService.deletePlayerScore(this.playerId, scoreId)
    .then(() => {
      console.log('Score deleted successfully');

      this.loadScores();

      this.fetchScoresForChart();

      this.cdr.detectChanges();
    })
    .catch(error => {
      console.error('Error deleting score:', error);
    });
}


}
