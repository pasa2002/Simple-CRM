import { Component, Inject, OnInit } from '@angular/core';
import {Players} from 'src/models/players.class';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit{
  players: Players=new Players();
  playerId :string;
  loading=false;

  playerForm:FormGroup;
  playerLevel : string[] = [
    'Beginner',
    'Intermediate',
    'Professional'
  ]



  constructor(public dialogRef:MatDialogRef<EditPlayerComponent>,
    private fireStore:AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: Players
    ){
      if (data) {
        this.players = new Players(data);
        this.playerId = data.customIdName || '';
      } else {
        this.players = new Players();
        this.playerId = '';
      }
    };


    ngOnInit(): void {
      this.getPlayers();
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

  getPlayers(){
    this.fireStore.collection('players')
    .doc(this.players.customIdName)
    .set({
      firstName :this.players.firstName,
      lastName :this.players.lastName,
      email :this.players.email,
      date :this.players.date,
      gender :this.players.gender,
      playerLevel :this.players.playerLevel,
      oldTeam :this.players.oldTeam,
      experience :this.players.experience,
      salary :this.players.salary,
      about :this.players.about,
      customIdName :this.players.customIdName
    },{merge:true})
    .catch(error=>{
      console.error("error updatding Player ", error)
    })


  }

  updatePlayers(){
    this.loading=true;
    this.fireStore
    .collection('players')
    .doc(this.playerId)
    .update({
      firstName :this.players.firstName,
      lastName :this.players.lastName,
      email :this.players.email,
      date :this.players.date,
      gender :this.players.gender,
      playerLevel :this.players.playerLevel,
      oldTeam :this.players.oldTeam,
      experience :this.players.experience,
      salary :this.players.salary,
      about :this.players.about,
      customIdName :this.players.customIdName
    })
    .then(()=>{
      this.loading=false;
      this.dialogRef.close();
    })
  }

}
