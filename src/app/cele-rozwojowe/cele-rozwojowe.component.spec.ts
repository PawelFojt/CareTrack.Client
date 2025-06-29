import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CeleRozwojoweComponent } from './cele-rozwojowe.component';

describe('CeleRozwojoweComponent', () => {
  let component: CeleRozwojoweComponent;
  let fixture: ComponentFixture<CeleRozwojoweComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CeleRozwojoweComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CeleRozwojoweComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
