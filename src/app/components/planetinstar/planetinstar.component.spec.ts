import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetinstarComponent } from './planetinstar.component';

describe('PlanetinstarComponent', () => {
  let component: PlanetinstarComponent;
  let fixture: ComponentFixture<PlanetinstarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetinstarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetinstarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
