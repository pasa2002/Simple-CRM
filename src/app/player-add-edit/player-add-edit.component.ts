import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { PlayerService } from '../services/player.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Players } from 'src/models/players.class';
import { NbaServiceService } from '../services/nba-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'firebase/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Represents the Player Add/Edit Component for adding or editing player details.
 */
@Component({
  selector: 'app-player-add-edit',
  templateUrl: './player-add-edit.component.html',
  styleUrls: ['./player-add-edit.component.scss']
})
export class PlayerAddEditComponent implements OnInit {
  /** FormGroup for the player details form. */
  playerForm: FormGroup;

  /** Array of player levels. */
  playerLevel: string[] = ['Beginner', 'Intermediate', 'Professional'];

  /** Array of NBA teams. */
  teams: any[] = [];

  /** Instance of the Players class for storing player data. */
  players: Players = new Players();

  /** Array to store all players. */
  allplayers = [];

  /** Flag to indicate loading state. */
  loading = false;

  /**
   * Constructs the Player Add/Edit Component.
   * @param _dialog MatDialog for managing dialogs.
   * @param firestore AngularFirestore for Firestore operations.
   * @param nbaService NbaServiceService for NBA-related services.
   * @param formBuilder FormBuilder for creating the playerForm.
   * @param afAuth AngularFireAuth for authentication.
   * @param snackBar MatSnackBar for displaying notifications.
   * @param dialogRef MatDialogRef for managing the dialog.
   */
  constructor(
    private _dialog: MatDialog,
    private firestore: AngularFirestore,
    private nbaService: NbaServiceService,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PlayerAddEditComponent>
  ) {}

  /**
   * Initializes the component and sets up the playerForm and retrieves NBA teams.
   */
  ngOnInit(): void {
    this.playerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: [null, Validators.required],
      gender: ['', Validators.required],
      playerLevel: ['', Validators.required],
      oldTeam: ['', Validators.required],
      experience: [null, Validators.required],
      salary: [null, Validators.required],
      about: ['', Validators.required],
    });
    this.nbaService.getTeams().subscribe(data => {
      this.teams = data.data;
      console.log(this.teams);
    });
  }

  /**
   * Closes the dialog.
   */
  closeDialog() {
    this.dialogRef.close();
  }

  /**
   * Adds a new player.
   */
  addPlayers() {
    // Check if the form is valid
    if (this.playerForm.valid) {
      // Form is valid, proceed with saving the player

      // Convert the form value to Players object
      this.players = new Players(this.playerForm.value);

      // Add the player to the Firestore collection
      const playersObj = this.players.toJson();
      this.loading = true;
      this.firestore
        .collection('players')
        .add(playersObj)
        .then((result: any) => {
          this.loading = false;
          this.dialogRef.close();
        });
    } else {
      // Form is not valid, display an error using snackbar
      this.snackBar.open('Form is not valid. Please check the fields.', 'Close', {
        duration: 5000, // Adjust the duration as needed
      });
    }
  }

  /**
   * Formats a Date object into a string in MM/DD/YYYY format.
   * @param date The Date object to format.
   * @returns The formatted date string.
   */
  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 because months are 0-indexed
    const year = date.getFullYear();

    return `${month}/${day}/${year}`; // MM/DD/YYYY format
  }

  /**
   * Handles the change event of the date input field.
   * @param event The change event.
   */
  onDateChange(event: any): void {
    const formattedDate = this.formatDate(event.value);
  }
}
