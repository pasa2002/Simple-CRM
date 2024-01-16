/**
 * Represents the Customer Component.
 * This component handles the display and management of players,
 * including adding, editing, and deleting player information.
 */

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
   /** Array to store all player information. */
  allPlayers = [];
  /** Instance of the Players class for handling player data. */
  player:Players = new Players();
  /** ID of the player. */
  playerId = "";
  /** Indicates whether the current user is a guest. */
  isGuest: boolean;

    /**
   * Constructs the Customer Component.
   * @param dialog Service to handle Angular Material dialogs.
   * @param firestore Service to interact with Angular Firestore.
   * @param authService Service for authentication-related functionality.
   */
  constructor(private dialog:MatDialog,
    private firestore: AngularFirestore,
    private authService: AuthService){}

     /**
   * Opens the form for adding or editing a player.
   */
  openAddEditPlayerForm(){
    this.dialog.open(PlayerAddEditComponent)
  }

  ngAfterViewInit() {}
 /**
   * Initializes the component by subscribing to current user changes
   * and fetching player data from Firestore.
   */
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

  /**
   * Deletes a player from Firestore and updates the local list.
   * @param event The DOM event triggering the deletion.
   * @param player The player to be deleted.
   */
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
  /**
   * Prevents event propagation.
   * @param event The DOM event.
   */
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
