import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ng-canvas-painter',
  template: `
    <div id="container" class="content" >
	  <div class="row">
		  <div class="card" [ngStyle]="{'width': width + 'px'}">
			<div class="card-header">
			  <div class="row">
			  <div class="col-md-6 title"><strong>{{title}}</strong></div>
			  <div  class="col-md-3" style="text-align: right;">
        <button type="button" class="btn btn-secondary" (click)="refreshCanvas()">{{labelRefreshButton}} <i [ngClass]="iconRefreshButton"></i></button>
        </div>
        <div  class="col-md-3" style="text-align: right;">
				<button type="button" class="btn btn-secondary" (click)="guardarCanvas()">{{labelAcceptButton}} <i [ngClass]="iconAcceptButton"></i></button>
			  </div>
			  </div>
			</div>
			<div class="card-body">
			  <canvas id="canvasPainterView" [width]="width" [height]="height" *ngIf="!firma">
				<p>Unfortunately, your browser is currently unsupported by our web application. We are sorry for the
				  inconvenience. Please use one of the supported browsers listed below, or draw the image you want using an
				  offline tool.</p>
				<p>Supported browsers: <a href="http://www.opera.com/">Opera</a>, <a href="http://www.mozilla.com/">Firefox</a>,
				  <a href="http://www.apple.com/safari">Safari</a>, and <a href="http://www.konqueror.org/">Konqueror</a>.</p>
			  </canvas>
			  <img [src]="firma" *ngIf="firma" />
			</div>
		  </div>
		</div>
	</div>
  `,
  styleUrls: ['ng-canvas-painter.component.scss']
})
export class NgCanvasPainterComponent implements AfterViewInit {

  firma: any;

  @Input('title') title: string = "Firmar en el recuadro";
  @Input('width') width = 400;
  @Input('height') height = 300;
  @Input('color') color = "black";
  @Input('backgroundColor') backgroundColor = "white";
  @Input('iconAcceptButton') iconAcceptButton = "fa fa-check";
  @Input('labelAcceptButton') labelAcceptButton = "Aceptar";
  @Input('iconRefreshButton') iconRefreshButton = "fa fa-refresh";
  @Input('labelRefreshButton') labelRefreshButton = "Limpiar";

  @Output('onAccept') onAccept = new EventEmitter<string>();
  @Output('onAccept') onRefresh = new EventEmitter<void>();

  constructor() {
  }

  ngAfterViewInit() {
    setColor(this.color, this.backgroundColor);
    init();
  }

  refreshCanvas() {
    if (this.firma)
      this.firma = undefined;
    setTimeout(() => {
      canvasClear();
      init();
      this.onRefresh.emit();
    }, 500);
  }

  guardarCanvas() {
    this.firma = canvasToImg();
    this.onAccept.emit(this.firma);
  }

}

var canvas, context, tool, color, background;

function setColor(lineColor, backgroundColor) {
  color = lineColor;
  background = backgroundColor;
}

function init() {
  // Find the canvas element.
  console.log(color);
  canvas = document.getElementById('canvasPainterView');
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