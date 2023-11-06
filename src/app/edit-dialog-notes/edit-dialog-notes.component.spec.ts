import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogNotesComponent } from './edit-dialog-notes.component';

describe('EditDialogNotesComponent', () => {
  let component: EditDialogNotesComponent;
  let fixture: ComponentFixture<EditDialogNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDialogNotesComponent]
    });
    fixture = TestBed.createComponent(EditDialogNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
