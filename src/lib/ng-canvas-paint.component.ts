import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ng-canvas-paint',
  template: `
    <div id="container" class="main-container" [ngClass]="containerClass" >
      <div [ngClass]="headerClass">
        <p><strong>{{title}}</strong></p>
        <div class="buttons-container" *ngIf="positionButtons === 'top'">
          <button type="button" [ngClass]="cleanBtnClass" (click)="refreshCanvas()"><i [ngClass]="iconCleanButton"></i></button>
          <button type="button" [ngClass]="confirmBtnClass" (click)="guardarCanvas()"><i [ngClass]="iconAcceptButton"></i></button>
        </div>
      </div>
			<div id="container-painter" [ngClass]="painterContainerClass">
        <canvas id="canvasPainterView" class="canvas-painter" *ngIf="!value">
				<p>Unfortunately, your browser is currently unsupported by our web application. We are sorry for the
				  inconvenience. Please use one of the supported browsers listed below, or draw the image you want using an
				  offline tool.</p>
				<p>Supported browsers: <a href="http://www.opera.com/">Opera</a>, <a href="http://www.mozilla.com/">Firefox</a>,
				  <a href="http://www.apple.com/safari">Safari</a>, and <a href="http://www.konqueror.org/">Konqueror</a>.</p>
			  </canvas>
			  <img class="image-painter" [src]="value" *ngIf="value" />
      </div>
      <div class="buttons-container" *ngIf="positionButtons === 'bottom'">
        <button type="button" [ngClass]="cleanBtnClass" (click)="refreshCanvas()" title="Limpiar recuadro"><i [ngClass]="iconCleanButton"></i></button>
        <button type="button" [ngClass]="confirmBtnClass" (click)="guardarCanvas()" title="Confirmar firma"><i [ngClass]="iconAcceptButton"></i></button>
      </div>
	</div>
  `,
  styleUrls: ['ng-canvas-paint.component.scss']
})
export class NgCanvasPaintComponent implements OnInit, AfterViewInit {

  @Input('value') value: any = undefined;
  @Output('value') onValue:EventEmitter<any> = new EventEmitter<any>();
  @Input('containerClass') containerClass = '';
  @Input('headerClass') headerClass = 'options-container';
  @Input('painterContainerClass') painterContainerClass = 'ng-canvas-container';
  @Input('confirmBtnClass') confirmBtnClass = 'confirm-button';
  @Input('cleanBtnClass') cleanBtnClass = 'clean-button';
  @Input('title') title: string = "Firmar en el recuadro";
  @Input('color') color = "black";
  @Input('backgroundColor') backgroundColor = "white";
  @Input('iconAcceptButton') iconAcceptButton = "icon-check";//"fas fa-check";
  @Input('iconCleanButton') iconCleanButton = "icon-clean";//"fas fa-redo-alt";

  @Output('onAccept') onAccept = new EventEmitter<string>();
  @Output('onRefresh') onRefresh = new EventEmitter<void>();

  @Input('positionButtons')  positionButtons: string = "bottom" || "top";

  constructor() {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    setColor(this.color, this.backgroundColor);
    let time = setTimeout((_) => init(), 100);
  }

  refreshCanvas() {
    if (this.value)
      this.value = undefined;
    setTimeout(() => {
      canvasClear();
      init();
      this.onRefresh.emit();
    }, 500);
  }

  guardarCanvas() {
    this.value = canvasToImg();
    this.onAccept.emit(this.value);
  }

}

var containerCanvas, canvas, context, tool, color, background, autoSave;

function setColor(lineColor, backgroundColor) {
  color = lineColor;
  background = backgroundColor;
}

function init(saveAuto = true) {
  autoSave = saveAuto;
  // Find the canvas element.
  canvas = document.getElementById('canvasPainterView');
  containerCanvas = document.getElementById("container-painter");
  canvas.width = containerCanvas.offsetWidth;
  canvas.height = containerCanvas.offsetHeight;
  if (!canvas) {
    alert('Error: I cannot find the canvas element!');
    return;
  }

  if (!canvas.getContext) {
    alert('Error: no canvas.getContext!');
    return;
  }

  // Get the 2D canvas context.
  context = canvas.getContext('2d');
  if (!context) {
    alert('Error: failed to getContext!');
    return;
  }

  // Pencil tool instance.
  tool = new tool_pencil();

  // Attach the mousedown, mousemove and mouseup event listeners.
  canvas.addEventListener('mousedown', ev_canvas, false);
  canvas.addEventListener('mousemove', ev_canvas, false);
  canvas.addEventListener('mouseup', ev_canvas, false);
}

// This painting tool works like a drawing pencil which tracks the mouse 
// movements.
function tool_pencil() {
  var tool = this;
  this.started = false;
  context.fillStyle = background;
  context.strokeStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height);
  // This is called when you start holding down the mouse button.
  // This starts the pencil drawing.
  this.mousedown = function (ev) {
    context.beginPath();
    context.moveTo(ev._x, ev._y);
    tool.started = true;
  };

  // This function is called every time you move the mouse. Obviously, it only 
  // draws if the tool.started state is set to true (when you are holding down 
  // the mouse button).
  this.mousemove = function (ev) {
    if (tool.started) {
      context.lineTo(ev._x, ev._y);
      context.stroke();
    }
  };

  // This is called when you release the mouse button.
  this.mouseup = function (ev) {
    if (tool.started) {
      tool.mousemove(ev);
      tool.started = false;
      if(autoSave) {
        canvasToImg();
      }
    }
  };
}

// The general-purpose event handler. This function just determines the mouse 
// position relative to the canvas element.
function ev_canvas(ev) {
  if (ev.layerX || ev.layerX == 0) { // Firefox
    ev._x = ev.layerX;
    ev._y = ev.layerY;
  } else if (ev.offsetX || ev.offsetX == 0) { // Opera
    ev._x = ev.offsetX;
    ev._y = ev.offsetY;
  }

  // Call the event handler of the tool.
  var func = tool[ev.type];
  if (func) {
    func(ev);
  }
}

function canvasClear() {
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function canvasToImg() {
  //var canvas = document.getElementById("canvasPainterView");
  var ctx = canvas.getContext("2d");
  //draw a red box
  ctx.fillStyle = background;
  ctx.strokeStyle = color;
  ctx.fillRect(10, 10, 30, 30);

  return canvas.toDataURL();
}