import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadbulkComponent } from './uploadbulk.component';

describe('UploadbulkComponent', () => {
  let component: UploadbulkComponent;
  let fixture: ComponentFixture<UploadbulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadbulkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadbulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
