import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxWimComponent } from './ngx-wim.component';

describe('NgxWimComponent', () => {
  let component: NgxWimComponent;
  let fixture: ComponentFixture<NgxWimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxWimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxWimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
