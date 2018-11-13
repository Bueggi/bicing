import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearestStationsComponent } from './nearest-stations.component';

describe('NearestStationsComponent', () => {
  let component: NearestStationsComponent;
  let fixture: ComponentFixture<NearestStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearestStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearestStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
