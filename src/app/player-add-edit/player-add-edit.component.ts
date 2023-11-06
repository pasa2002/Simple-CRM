import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlayerService } from '../services/player.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Players} from 'src/models/players.class';

@Component({
  selector: 'app-player-add-edit',
  templateUrl: './player-add-edit.component.html',
  styleUrls: ['./player-add-edit.component.scss']
})
export class PlayerAddEditComponent {
  playerForm:FormGroup;
  playerLevel : string[] = [
    'Beginner',
    'Intermediate',
    'Professional'
  ]



  players:Players = new Players();
  allplayers = [];
  loading=false;
  constructor(private  _dialog:MatDialog,
    private firestore: AngularFirestore,
    public dialogRef:MatDialogRef<PlayerAddEditComponent>){}

  addPlayers(){
    const playersObj = this.players.toJson();
    this.loading = true;
    this.firestore
    .collection('players')
    .add(playersObj)
    .then((result:any)=>{
      this.loading = false;
      this.dialogRef.close();
    })

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

