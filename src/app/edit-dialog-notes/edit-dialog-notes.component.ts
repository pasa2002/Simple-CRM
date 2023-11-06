import { Component, OnInit , Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotesDialogComponent } from '../notes-dialog/notes-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NotesService } from '../services/notes.service';
import { Note } from '../../models/notes.class';

@Component({
  selector: 'app-edit-dialog-notes',
  templateUrl: './edit-dialog-notes.component.html',
  styleUrls: ['./edit-dialog-notes.component.scss']
})
export class EditDialogNotesComponent implements OnInit{
  noteId='';
  note:Note=new Note();
  constructor(
    public dialogRef: MatDialogRef<NotesDialogComponent>,
    private fireStore: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public data: Note
  ) {
    this.note = data;
    this.noteId = data.customIdName;
  }


  ngOnInit():void{
    this.getNotes();
  }

  onNoClick(){
    this.dialogRef.close();
  }

  getNotes(){
    this.fireStore.collection('todos').doc(this.note.customIdName)
    .set({
        title: this.note.title,
        description: this.note.description
    }, { merge: true })
    .catch(error => {
        console.error("Error updating note: ", error);
    });

}


  updateNote(){
      this.fireStore.collection('todos').doc(this.note.customIdName)
      .update({
        title: this.note.title,
        description: this.note.description
      }).then(() => {
        this.dialogRef.close();
      }).catch(error => {
        console.error("Error updating note: ", error);
      });
    }


}
