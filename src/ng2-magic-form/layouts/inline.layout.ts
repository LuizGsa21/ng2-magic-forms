import {Component} from "@angular/core";
import {BaseLayout} from "./base.layout";

@Component({
    selector: '[inlineLayout]',
    template:
`<div *ngIf="!field?.option.hidden" class="col-xs-4">
  <ng-content select="[leftSide]"></ng-content>
</div>
<div *ngIf="!field?.option.hidden" class="col-xs-4">
  <div class="form-group" [class.has-error]="!field.control?.valid && field.control.touched">
    <ng-content select="[rightSide]"></ng-content>
    <span class="description">(ability to edit price is a permission)</span>
    <div *ngIf="!field?.control.valid && field?.control.touched">
      <div *ngFor="let error of field?.errors" class="help-block">{{ error.message }}</div>
    </div>
  </div>
</div>`
})
export class InlineLayout extends BaseLayout {}