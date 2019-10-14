import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgCanvasPaintComponent } from './ng-canvas-paint.component';

describe('NgCanvasPaintComponent', () => {
  let component: NgCanvasPaintComponent;
  let fixture: ComponentFixture<NgCanvasPaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgCanvasPaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgCanvasPaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
