import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetinhouseComponent } from './planetinhouse.component';

describe('PlanetinhouseComponent', () => {
  let component: PlanetinhouseComponent;
  let fixture: ComponentFixture<PlanetinhouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetinhouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetinhouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
