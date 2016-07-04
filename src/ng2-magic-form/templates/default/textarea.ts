import {Component} from '@angular/core';
import {DefaultLayout} from './_layout';
import {BaseTemplate} from '../base.template';
import {FormControlDirective} from '@angular/forms';
import {AsyncOrValuePipe} from '../../pipes/async';

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
    pipes: [
        AsyncOrValuePipe
    ],
    template: `
    <div defaultLayout [field]="field" [class]="field.options.templateOptions.className || ''">
         <label [style.display]="(field.templateOptions.label | asyncOrValue) ? null : 'none'" [attr.for]="field.options.key" class="control-label">{{ field.templateOptions.label | asyncOrValue }}</label>
         <textarea #f
           [formControl]="field.control"
           (click)="field.onClick(f.value, $event)" 
           (blur)="field.onBlur(f.value, $event)" 
           (focus)="field.onFocus(f.value, $event)"
           [id]="field.options.key"
           [placeholder]="field.templateOptions.placeholder | asyncOrValue:''" 
           [cols]="field.templateOptions.cols" 
           [rows]="field.templateOptions.rows || '4'" 
           class="form-control"></textarea>
    </div>
`
})
export class TextareaDefaultTemplate extends BaseTemplate {
    constructor() {
        super();
    }
}