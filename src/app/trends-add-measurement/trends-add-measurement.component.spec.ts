import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendsAddMeasurementComponent } from './trends-add-measurement.component';

describe('TrendsAddMeasurementComponent', () => {
  let component: TrendsAddMeasurementComponent;
  let fixture: ComponentFixture<TrendsAddMeasurementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendsAddMeasurementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrendsAddMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
