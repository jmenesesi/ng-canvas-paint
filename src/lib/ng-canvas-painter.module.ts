import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCanvasPainterComponent } from './ng-canvas-painter.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [NgCanvasPainterComponent],
  imports: [
    CommonModule
  ],
  exports: [NgCanvasPainterComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgCanvasPainterModule { }
