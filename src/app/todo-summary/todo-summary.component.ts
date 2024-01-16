import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Router } from '@angular/router';
import { Note } from 'src/models/notes.class';

/**
 * Component for displaying a summary of notes.
 */
@Component({
  selector: 'app-todo-summary',
  templateUrl: './todo-summary.component.html',
  styleUrls: ['./todo-summary.component.scss']
})
export class TodoSummaryComponent implements OnInit {

  /** Array to store the summary of notes. */
  notesSummary: Note[] = [];

  /**
   * Constructor for TodoSummaryComponent.
   * @param notesService - The service for managing notes.
   * @param router - The router for navigation.
   */
  constructor(
    private notesService: NotesService,
    private router: Router
  ) {}

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Fetches and sets the summary of notes.
   */
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

  /**
   * Navigates to the full notes page.
   */
  navigateToNotes(): void {
    this.router.navigate(['/notes']);
  }
}
