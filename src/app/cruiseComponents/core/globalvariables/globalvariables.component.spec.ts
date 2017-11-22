import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalvariablesComponent } from './globalvariables.component';

describe('GlobalvariablesComponent', () => {
  let component: GlobalvariablesComponent;
  let fixture: ComponentFixture<GlobalvariablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalvariablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalvariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
