import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CruiserouteComponent } from './cruiseroute.component';

describe('CruiserouteComponent', () => {
  let component: CruiserouteComponent;
  let fixture: ComponentFixture<CruiserouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CruiserouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CruiserouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
