import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmSummaryComponent } from './crm-summary.component';

describe('CrmSummaryComponent', () => {
  let component: CrmSummaryComponent;
  let fixture: ComponentFixture<CrmSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrmSummaryComponent]
    });
    fixture = TestBed.createComponent(CrmSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
