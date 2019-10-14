import { TestBed } from '@angular/core/testing';

import { NgCanvasPainterService } from './ng-canvas-painter.service';

describe('NgCanvasPainterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgCanvasPainterService = TestBed.get(NgCanvasPainterService);
    expect(service).toBeTruthy();
  });
});
