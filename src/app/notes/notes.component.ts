import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotesDialogComponent } from '../notes-dialog/notes-dialog.component';
import { EditDialogNotesComponent } from '../edit-dialog-notes/edit-dialog-notes.component';
import { NotesService } from '../services/notes.service';
import { Note } from 'src/models/notes.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/authentication.service'; // Update with the correct path

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  allNotes = [];
  isGuest: boolean;

  constructor(
    private dialog: MatDialog,
    private notesService: NotesService,
    private firestore: AngularFirestore,
    private authService: AuthService // Add AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.isGuest = this.authService.getIsGuest();
    });

    this.firestore.collection('todos')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => {
        this.allNotes = changes;
      });
  }

  openDialog(): void {
    if (!this.isGuest) {
      const dialogRef = this.dialog.open(NotesDialogComponent, {});
    }
  }

  openEdit(note: Note): void {
    if (!this.isGuest) {
      const dialogRef = this.dialog.open(EditDialogNotesComponent, {
        width: '250px',
        data: note
      });
    }
  }

  deleteUser(event: Event, note: any): void {
    if (!this.isGuest) {
      event.stopPropagation();

      this.firestore.collection('todos').doc(note.customIdName).delete()
        .then(() => {
          const index = this.allNotes.indexOf(note);
          if (index > -1) {
            this.allNotes.splice(index, 1);
          }
        })
        .catch(error => {
          console.error("Error deleting notes: ", error);
        });
    }
  }

  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
