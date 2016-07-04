import {Component} from '@angular/core';
import {DefaultLayout} from './_layout';
import {BaseTemplate} from '../base.template';
import {FormControlDirective} from '@angular/forms';

export interface TextareaDefaultOptions {
    defaultValue?: string;
    label?: string;
    placeholder?: string;
    className?: string;
    description?: string;
    cols: number;
    rows: number;
}

@Component({
    selector: 'textareaDefaultTemplate',
    directives: [
        DefaultLayout,
        FormControlDirective
    ],
    template: `
    <div defaultLayout [field]="field" [class]="field.options.templateOptions.className || ''">
         <label *ngIf="field.templateOptions.label" [attr.for]="field.options.key" class="control-label">{{ field.templateOptions.label }}</label>
         <textarea #f
           [formControl]="field.control"
           (click)="field.onClick(f.value, $event)" 
           (blur)="field.onBlur(f.value, $event)" 
           (focus)="field.onFocus(f.value, $event)"
           [id]="field.options.key"
           [placeholder]="field.templateOptions.placeholder || ''" 
           [cols]="field.templateOptions.cols" 
           [rows]="field.templateOptions.rows || '4'" 
           class="form-control"></textarea>
    </div>
`
})
export class TextareaDefaultTemplate extends BaseTemplate {}