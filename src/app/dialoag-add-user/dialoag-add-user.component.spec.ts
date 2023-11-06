import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoagAddUserComponent } from './dialoag-add-user.component';

describe('DialoagAddUserComponent', () => {
  let component: DialoagAddUserComponent;
  let fixture: ComponentFixture<DialoagAddUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialoagAddUserComponent]
    });
    fixture = TestBed.createComponent(DialoagAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
