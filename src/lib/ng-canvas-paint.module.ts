import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgCanvasPaintComponent } from './ng-canvas-paint.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [NgCanvasPaintComponent],
  imports: [
    CommonModule
  ],
  exports: [NgCanvasPaintComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgCanvasPaintModule { }
