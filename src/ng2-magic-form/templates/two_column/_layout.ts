import {Component} from '@angular/core';
import {BaseLayout} from '../base.layout';

export interface TwoColumnTemplate {
    leftSideClass?: string;
    rightSideClass?: string;
    description?: string;
}
/**
 * Uses `leftSide` and `rightSide` directive when inserting content.
 */
@Component({
    selector: '[twoColumnLayout]',
    template:
`<div *ngIf="!field.options.hidden" [class]="field.options.templateOptions.leftSideClass || ''">
  <ng-content select="[leftSide]"></ng-content>
</div>
<div *ngIf="!field.options.hidden" [class]="field.options.templateOptions.rightSideClass || ''">
  <div class="form-group" [class.has-error]="!field.control?.valid && field.control.touched">
    <ng-content select="[rightSide]"></ng-content>
    <span *ngIf="field.options.templateOptions.description" class="description">{{ field.options.templateOptions.description }}</span>
    <div *ngIf="!field.control.valid && field.control.touched">
      <div *ngFor="let error of field.errors" class="help-block">{{ error.message }}</div>
    </div>
  </div>
</div>`
})
export class InlineLayout extends BaseLayout {}