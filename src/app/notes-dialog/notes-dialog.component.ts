import { Component, Inject , OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/models/notes.class';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.scss']
})


export class NotesDialogComponent implements OnInit{

  notes:any[]=[];

  constructor(
    public dialogRef: MatDialogRef<NotesDialogComponent>,
    private notesService:NotesService
  ) {}

ngOnInit(): void {
    this.notesService.fireStoreCollection.valueChanges()
    .subscribe(item=>{
      this.notes = item;
    })
}

onNoClick(){
    this.dialogRef.close();
  }



  addNotes(titleInput: HTMLInputElement, descriptionInput: HTMLInputElement | HTMLTextAreaElement) {
    this.notesService.addTodo(titleInput.value, descriptionInput.value);

    this.dialogRef.close();


}
}
