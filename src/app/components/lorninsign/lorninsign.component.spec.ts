import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LorninsignComponent } from './lorninsign.component';

describe('LorninsignComponent', () => {
  let component: LorninsignComponent;
  let fixture: ComponentFixture<LorninsignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LorninsignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LorninsignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
