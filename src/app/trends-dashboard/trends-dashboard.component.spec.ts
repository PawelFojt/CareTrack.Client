import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendsDashboardComponent } from './trends-dashboard.component';

describe('TrendsDashboardComponent', () => {
  let component: TrendsDashboardComponent;
  let fixture: ComponentFixture<TrendsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrendsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
