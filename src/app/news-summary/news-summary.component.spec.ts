import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsSummaryComponent } from './news-summary.component';

describe('NewsSummaryComponent', () => {
  let component: NewsSummaryComponent;
  let fixture: ComponentFixture<NewsSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsSummaryComponent]
    });
    fixture = TestBed.createComponent(NewsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
