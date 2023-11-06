import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDialogUserComponent } from './edit-dialog-user.component';

describe('EditDialogUserComponent', () => {
  let component: EditDialogUserComponent;
  let fixture: ComponentFixture<EditDialogUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDialogUserComponent]
    });
    fixture = TestBed.createComponent(EditDialogUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
