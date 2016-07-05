import {Component} from '@angular/core';
import {BaseTemplate} from '../base.template';
import {DefaultLayout} from './_layout';
import {FormControlDirective} from '@angular/forms';
import {AsyncOrValuePipe} from '../../pipes/async';


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
    pipes: [
        AsyncOrValuePipe
    ],
    template: `
    <div defaultLayout [field]="field">
     <label [style.display]="(field.templateOptions.label | asyncOrValue) ? null : 'none'" [attr.for]="field.id" class="control-label">{{ field.templateOptions.label | asyncOrValue }}</label>
     <input #f
        [formControl]="field.control"
        (click)="field.onClick(f.value, $event)" 
        (blur)="field.onBlur(f.value, $event)" 
        (focus)="field.onFocus(f.value, $event)" 
        [type]="field.templateOptions.type" 
        [id]="field.id" 
        [placeholder]="field.templateOptions.placeholder | asyncOrValue" class="form-control">
    </div>
`
})
export class InputDefaultTemplate extends BaseTemplate {
    constructor() {
        super();
    }
}