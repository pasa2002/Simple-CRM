import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachExperienceChartComponent } from './coach-experience-chart.component';

describe('CoachExperienceChartComponent', () => {
  let component: CoachExperienceChartComponent;
  let fixture: ComponentFixture<CoachExperienceChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoachExperienceChartComponent]
    });
    fixture = TestBed.createComponent(CoachExperienceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
