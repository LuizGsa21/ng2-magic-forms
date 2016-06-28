import {Component} from "@angular/core";
import {BaseLayout} from "./layout.base";

@Component({
    selector: '[divLayout]',
    template: `<div *ngIf="!field.hidden"><ng-content></ng-content></div>`
})
export class DivLayout extends BaseLayout {}