import { Component , OnInit} from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Router } from '@angular/router';
import { Note } from 'src/models/notes.class';

@Component({
  selector: 'app-todo-summary',
  templateUrl: './todo-summary.component.html',
  styleUrls: ['./todo-summary.component.scss']
})
export class TodoSummaryComponent  implements OnInit{

  notesSummary: Note[] = [];

  constructor(
    private notesService: NotesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.notesService.getNotes().subscribe(
      (notes: Note[]) => {
        this.notesSummary = notes;
      },
      (error) => {
        console.error("Error fetching notes: ", error);
      }
    );

  }

  navigateToNotes(): void {
    this.router.navigate(['/notes']);
  }
}
