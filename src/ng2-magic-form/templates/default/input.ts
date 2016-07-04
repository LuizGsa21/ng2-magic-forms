import {Component} from '@angular/core';
import {BaseTemplate} from '../base.template';
import {DefaultLayout} from './_layout';
import {FormControlDirective} from '@angular/forms';


export interface InputDefaultOptions {
    type: string,
    defaultValue?: string,
    label?: string,
    placeholder?: string,
    className?: string,
    description?: string
}


@Component({
    selector: 'inputDefaultTemplate',
    directives: [
        DefaultLayout,
        FormControlDirective
    ],
    template: `
    <div defaultLayout [field]="field">
     <label *ngIf="field.templateOptions.label" [attr.for]="field.options.key" class="control-label">{{ field.templateOptions.label }}</label>
     test
     <input #f
        [formControl]="field.control"
        (click)="field.onClick(f.value, $event)" 
        (blur)="field.onBlur(f.value, $event)" 
        (focus)="field.onFocus(f.value, $event)" 
        [type]="field.templateOptions.type" 
        [id]="field.options.key" 
        [placeholder]="field.templateOptions.placeholder || ''" class="form-control">
    </div>
`
})
export class InputDefaultTemplate extends BaseTemplate {
}