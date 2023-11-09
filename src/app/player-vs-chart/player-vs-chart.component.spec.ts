import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerVsChartComponent } from './player-vs-chart.component';

describe('PlayerVsChartComponent', () => {
  let component: PlayerVsChartComponent;
  let fixture: ComponentFixture<PlayerVsChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerVsChartComponent]
    });
    fixture = TestBed.createComponent(PlayerVsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
