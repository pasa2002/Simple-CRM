import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerEarningChartComponent } from './player-earning-chart.component';

describe('PlayerEarningChartComponent', () => {
  let component: PlayerEarningChartComponent;
  let fixture: ComponentFixture<PlayerEarningChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerEarningChartComponent]
    });
    fixture = TestBed.createComponent(PlayerEarningChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
