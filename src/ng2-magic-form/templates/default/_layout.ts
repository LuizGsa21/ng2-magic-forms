import {Component} from '@angular/core';
import {BaseLayout} from '../base.layout';
import {AsyncOrValuePipe} from '../../pipes/async';

@Component({
    selector: '[defaultLayout]',
    pipes: [
        AsyncOrValuePipe
    ],
    template: `
<div *ngIf="!field.hidden" class="form-group" [class.has-error]="!field.control.valid && field.control.touched">
  <ng-content></ng-content>
  <div *ngIf="!field.control.valid && field.control.touched">
    <div *ngFor="let error of field.errors" class="help-block">{{ error.message }}</div>
  </div>
  <div [style.display]="(field.templateOptions.description | asyncOrValue) ? null : 'none'" class="description">{{ field.templateOptions.description | asyncOrValue }}</div>
</div>`
})
export class DefaultLayout extends BaseLayout {}