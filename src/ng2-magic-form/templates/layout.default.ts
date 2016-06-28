import {Component} from "@angular/core";
import {BaseLayout} from "./layout.base";

@Component({
    selector: '[defaultLayout]',
    template: 
`<div *ngIf="!field.hidden" class="form-group" [class.has-error]="!field.control.valid && field.control.touched">
  <ng-content></ng-content>
  <div *ngIf="!field.control.valid && field.control.touched">
    <div *ngFor="let error of field.errors" class="help-block">{{ error.message }}</div>
  </div>
  <div *ngIf="field.templateOptions.description" class="description">{{ field.templateOptions.description }}</div>
</div>`
})
export class DefaultLayout extends BaseLayout {}