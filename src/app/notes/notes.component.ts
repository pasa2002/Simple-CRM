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
/**
 * Represents the Notes Component.
 * This component manages the display and interaction with notes.
 */
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  allNotes = [];
  isGuest: boolean;
  /**
   * Constructs the Notes Component.
   * @param dialog MatDialog service for opening dialogs.
   * @param notesService NotesService for managing notes.
   * @param firestore AngularFirestore for interacting with Firestore.
   * @param authService AuthService for user authentication.
   */
  constructor(
    private dialog: MatDialog,
    private notesService: NotesService,
    private firestore: AngularFirestore,
    private authService: AuthService // Add AuthService
  ) {}
  /**
   * Initializes the component and subscribes to user authentication changes.
   * Also fetches notes from Firestore.
   */
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
  /**
   * Opens the dialog for adding a new note.
   */
  openDialog(): void {
    if (!this.isGuest) {
      const dialogRef = this.dialog.open(NotesDialogComponent, {});
    }
  }
  /**
   * Opens the dialog for editing an existing note.
   * @param note The note to be edited.
   */
  openEdit(note: Note): void {
    if (!this.isGuest) {
      const dialogRef = this.dialog.open(EditDialogNotesComponent, {
        width: '250px',
        data: note
      });
    }
  }
  /**
   * Deletes a note.
   * @param event The click event.
   * @param note The note to be deleted.
   */
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
  /**
   * Stops event propagation.
   * @param event The click event.
   */
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
