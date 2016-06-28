import {Component} from "@angular/core";
import {BaseLayout} from "./layout.base";

/**
 * Uses `leftSide` and `rightSide` directive when inserting content.
 */
@Component({
    selector: '[inlineLayout]',
    template:
`<div *ngIf="!field.option.hidden" [class]="field.option.templateOptions.leftSideClass || ''">
  <ng-content select="[leftSide]"></ng-content>
</div>
<div *ngIf="!field.option.hidden" [class]="field.option.templateOptions.rightSideClass || ''">
  <div class="form-group" [class.has-error]="!field.control?.valid && field.control.touched">
    <ng-content select="[rightSide]"></ng-content>
    <span *ngIf="field.option.templateOptions.description" class="description">{{ field.option.templateOptions.description }}</span>
    <div *ngIf="!field.control.valid && field.control.touched">
      <div *ngFor="let error of field.errors" class="help-block">{{ error.message }}</div>
    </div>
  </div>
</div>`
})
export class InlineLayout extends BaseLayout {}