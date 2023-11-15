import { AfterViewInit, Component , OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayerAddEditComponent } from '../player-add-edit/player-add-edit.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Players } from 'src/models/players.class';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { AuthService } from '../services/authentication.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

export class CustomerComponent implements AfterViewInit, OnInit {
  allPlayers = [];
  player:Players = new Players();
  playerId = "";
  isGuest: boolean;
  constructor(private dialog:MatDialog,
    private firestore: AngularFirestore,
    private authService: AuthService){}

  openAddEditPlayerForm(){
    this.dialog.open(PlayerAddEditComponent)
  }

  ngAfterViewInit() {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.isGuest = this.authService.getIsGuest();
    });

    this.firestore.collection('players')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allPlayers = changes;
      });
  }


  deleteUser(event: Event, player: any): void {
    if (!this.isGuest) {
      // Prevent event propagation
      event.stopPropagation();

      // Delete the user from Firestore
      this.firestore.collection('players').doc(player.customIdName).delete()
        .then(() => {
          // On successful deletion from Firestore, delete the user from the local list
          const index = this.allPlayers.indexOf(player);
          if (index > -1) {
            this.allPlayers.splice(index, 1);
          }
        })
        .catch(error => {
          console.error("Error deleting user: ", error);
        });
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
