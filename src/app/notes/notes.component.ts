import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotesDialogComponent } from '../notes-dialog/notes-dialog.component';
import { EditDialogNotesComponent } from '../edit-dialog-notes/edit-dialog-notes.component';
import { NotesService } from '../services/notes.service';
import { Note } from 'src/models/notes.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit{
  notes: Note[] = [];
  allNotes = [];

  constructor(private dialog: MatDialog,
    private notesService: NotesService,
    private firestore: AngularFirestore,
    ) {}



  ngOnInit(): void {
    this.firestore.collection('todos')
    .valueChanges({idField:'customIdName'})
    .subscribe((changes:any)=>{
      console.log('added', changes)
      this.allNotes = changes
    })
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(NotesDialogComponent, {
    });
  }

  openEdit(note: Note): void {
    const dialogRef = this.dialog.open(EditDialogNotesComponent, {
      width: '250px',
      data: note
    });
  }


  deleteUser(event: Event, note: any): void {
    // Prevent event propagation
    event.stopPropagation();

    // Delete the user from Firestore
    this.firestore.collection('todos').doc(note.customIdName).delete()
      .then(() => {
        // On successful deletion from Firestore, delete the user from the local list
        const index = this.allNotes.indexOf(note);
        if (index > -1) {
          this.allNotes.splice(index, 1);
        }
      })
      .catch(error => {
        console.error("Error deleting notes: ", error);
      });
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }




}
