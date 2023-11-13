import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { PlayerService } from '../services/player.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Players} from 'src/models/players.class';
import { NbaServiceService } from '../services/nba-service.service';

@Component({
  selector: 'app-player-add-edit',
  templateUrl: './player-add-edit.component.html',
  styleUrls: ['./player-add-edit.component.scss']
})
export class PlayerAddEditComponent implements OnInit{
  playerForm:FormGroup;
  playerLevel : string[] = [
    'Beginner',
    'Intermediate',
    'Professional'
  ]

  teams: any[] = [];
  players:Players = new Players();
  allplayers = [];
  loading=false;
  constructor(private  _dialog:MatDialog,
    private firestore: AngularFirestore,
    private nbaService: NbaServiceService,
    private formBuilder: FormBuilder,
    public dialogRef:MatDialogRef<PlayerAddEditComponent>){}

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
        console.log(this.teams)
      });
    }

    addPlayers() {
      console.log('Form Value:', this.playerForm.value);
      console.log('Form Valid:', this.playerForm.valid);

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
        // Form is not valid, display an error or take appropriate action
        console.log('Form is not valid. Please check the fields.');
      }
    }




  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 because months are 0-indexed
    const year = date.getFullYear();

    return `${month}/${day}/${year}`; // MM/DD/YYYY format
  }


  onDateChange(event: any): void {
    const formattedDate = this.formatDate(event.value);
    console.log('Selected Date:', formattedDate);

  }

  }

