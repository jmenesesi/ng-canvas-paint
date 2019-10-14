# NgCanvasPainter

Esta libreria fue generada con [Angular CLI](https://github.com/angular/angular-cli) version 8.2.9.

## Instalación

Ejecutar `npm i --save ng-canvas-paint` para instalar la dependencia en tu proyecto.

## Uso

Para hacer uso de la libreria debes importarla en tu `app.module.ts` como en el ejemplo:

```ts 
    import {NgCanvasPaintModule} from 'ng-canvas-paint';
    ...
    imports: [
        ...
        NgCanvasPaintModule
        ...
    ],
```

Una vez importado, para usarlo en tu componente, puedes usar el siguiente ejemplo: 

```html
    <ng-canvas-paint width="400" height="300" color="black" backgroundColor="transparent"
        (onAccept)="onAccept($event)" (onRefresh)="onRefresh()">
    </ng-canvas-paint>
```

## Github

Puedes consultar el código en el repositorio de [Github](https://github.com/jmenesesi/ng-canvas-paint).