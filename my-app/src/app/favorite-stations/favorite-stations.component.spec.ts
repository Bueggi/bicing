import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteStationsComponent } from './favorite-stations.component';

describe('FavoriteStationsComponent', () => {
  let component: FavoriteStationsComponent;
  let fixture: ComponentFixture<FavoriteStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
