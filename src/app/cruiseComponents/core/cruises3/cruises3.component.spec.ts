import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cruises3Component } from './cruises3.component';

describe('Cruises3Component', () => {
  let component: Cruises3Component;
  let fixture: ComponentFixture<Cruises3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cruises3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cruises3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
