import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LordinhouseComponent } from './lordinhouse.component';

describe('LordinhouseComponent', () => {
  let component: LordinhouseComponent;
  let fixture: ComponentFixture<LordinhouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LordinhouseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LordinhouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
