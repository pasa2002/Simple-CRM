import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/models/notes.class';
import { NotesService } from '../services/notes.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.scss']
})

export class NotesDialogComponent implements OnInit {

  notes: any[] = [];
  /**
   * Constructs the Notes Dialog Component.
   * @param dialogRef MatDialogRef for managing the dialog.
   * @param notesService NotesService for managing notes.
   * @param snackBar MatSnackBar for displaying notifications.
   */
  constructor(
    public dialogRef: MatDialogRef<NotesDialogComponent>,
    private notesService: NotesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.notesService.fireStoreCollection.valueChanges()
      .subscribe(item => {
        this.notes = item;
      });
  }

  onNoClick() {
    this.dialogRef.close();
  }
 /**
   * Adds a new note.
   * @param titleInput The HTMLInputElement for the note title.
   * @param descriptionInput The HTMLInputElement or HTMLTextAreaElement for the note description.
   */
  addNotes(titleInput: HTMLInputElement, descriptionInput: HTMLInputElement | HTMLTextAreaElement) {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (title && description) {
      this.notesService.addTodo(title, description);
      this.dialogRef.close();
    } else {
      // Display a snackbar with an error message
      this.snackBar.open('Title and Description are required.', 'Close', {
        duration: 3000, // Duration in milliseconds
        panelClass: ['snackbar-error'] // Add a custom class for styling
      });
    }
  }

}
