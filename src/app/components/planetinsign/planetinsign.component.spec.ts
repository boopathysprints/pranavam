import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetinsignComponent } from './planetinsign.component';

describe('PlanetinsignComponent', () => {
  let component: PlanetinsignComponent;
  let fixture: ComponentFixture<PlanetinsignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetinsignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetinsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
