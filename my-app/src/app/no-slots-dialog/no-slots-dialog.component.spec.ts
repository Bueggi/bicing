import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSlotsDialogComponent } from './no-slots-dialog.component';

describe('NoSlotsDialogComponent', () => {
  let component: NoSlotsDialogComponent;
  let fixture: ComponentFixture<NoSlotsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoSlotsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoSlotsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
