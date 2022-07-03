import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignashouseComponent } from './signashouse.component';

describe('SignashouseComponent', () => {
  let component: SignashouseComponent;
  let fixture: ComponentFixture<SignashouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignashouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignashouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
