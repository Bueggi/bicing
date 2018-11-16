import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LessThanMinComponent } from './less-than-min.component';

describe('LessThanMinComponent', () => {
  let component: LessThanMinComponent;
  let fixture: ComponentFixture<LessThanMinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LessThanMinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessThanMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
