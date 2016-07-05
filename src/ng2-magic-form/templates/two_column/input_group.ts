import {Component} from '@angular/core';
import {BaseTemplate} from '../base.template';
import {
    InlineLayout,
    TwoColumnTemplate
} from './_layout';
import {FormControlDirective} from '@angular/forms';


export interface InputGroupTwoColumnTemplate extends TwoColumnTemplate {
    label?: string;
    placeholder?: string;
    description?: string;
    leftAddon?: string;
    rightAddon?: string;
    leftSideClass?: string;
    rightSideClass?: string;
}


@Component({
    selector: '[inputGroupInlineTemplate]',
    directives: [
        InlineLayout,
        FormControlDirective
    ],
    template: `
    <div twoColumnLayout [field]="field">
      <label leftSide *ngIf="field.templateOptions.label" [attr.for]="field.id" class="control-label">{{ field.templateOptions.label }}</label>
      <div rightSide class="input-group">
        <div *ngIf="field.templateOptions.leftAddon" class="input-group-addon">{{ field.templateOptions.leftAddon }}</div>
        <input #f
            [formControl]="field.control" 
            [type]="field.templateOptions.type" 
            [id]="field.id" 
            (click)="field.onClick(f.value, $event)" 
            (blur)="field.onBlur(f.value, $event)" 
            (focus)="field.onFocus(f.value, $event)"
            [placeholder]="field.templateOptions.placeholder || ''" class="form-control">
        <div *ngIf="field.templateOptions.rightAddon" class="input-group-addon">{{ field.templateOptions.rightAddon }}</div>
      </div>
    </div>
`

})
export class InputGroupInlineTemplate extends BaseTemplate {
    constructor() {
        super();
    }
}