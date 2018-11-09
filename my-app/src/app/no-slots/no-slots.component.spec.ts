import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSlotsComponent } from './no-slots.component';

describe('NoSlotsComponent', () => {
  let component: NoSlotsComponent;
  let fixture: ComponentFixture<NoSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
