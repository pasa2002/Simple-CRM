import { Component, OnInit , Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotesDialogComponent } from '../notes-dialog/notes-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NotesService } from '../services/notes.service';
import { Note } from '../../models/notes.class';

/**
 * Represents the Edit Dialog for Notes Component.
 * This component provides functionality to edit and update a note.
 */

@Component({
  selector: 'app-edit-dialog-notes',
  templateUrl: './edit-dialog-notes.component.html',
  styleUrls: ['./edit-dialog-notes.component.scss']
})
export class EditDialogNotesComponent implements OnInit{
  noteId='';
  note:Note=new Note();

    /**
   * Constructs the Edit Dialog Notes Component.
   * @param dialogRef Reference to the dialog.
   * @param fireStore Service to interact with Angular Firestore.
   * @param data Data injected into the dialog, which is a Note object.
   */
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
  /**
   * Retrieves the note from Firestore.
   * This method updates the note's title and description.
   */
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
  /**
   * Updates the note in Firestore with new title and description.
   */

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
