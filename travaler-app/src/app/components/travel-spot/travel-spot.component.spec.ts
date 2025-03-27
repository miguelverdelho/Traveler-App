import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelSpotComponent } from './travel-spot.component';

describe('TravelSpotComponent', () => {
  let component: TravelSpotComponent;
  let fixture: ComponentFixture<TravelSpotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelSpotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TravelSpotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
