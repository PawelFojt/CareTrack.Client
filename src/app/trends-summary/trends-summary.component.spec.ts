import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendsSummaryComponent } from './trends-summary.component';

describe('TrendsSummaryComponent', () => {
  let component: TrendsSummaryComponent;
  let fixture: ComponentFixture<TrendsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendsSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrendsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
