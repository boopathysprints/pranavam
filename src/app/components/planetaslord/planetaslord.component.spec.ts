import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetaslordComponent } from './planetaslord.component';

describe('PlanetaslordComponent', () => {
  let component: PlanetaslordComponent;
  let fixture: ComponentFixture<PlanetaslordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetaslordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetaslordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
