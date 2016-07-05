import {Component} from '@angular/core';
import {DefaultLayout} from './_layout';
import {BaseTemplate} from '../base.template';
import {FormControlDirective} from '@angular/forms';
import {AsyncOrValuePipe} from '../../pipes/async';

export interface SelectFieldOptions {
    defaultValue?: string;
    label?: string;
    description?: string;
    options: Array<{value:string, text:string}>
}

@Component({
    selector: 'selectDefaultTemplate',
    directives: [
        DefaultLayout,
        FormControlDirective
    ],
    pipes: [
        AsyncOrValuePipe
    ],
    template: `
    <div defaultLayout [field]="field">
         <label *ngIf="field.templateOptions.label | asyncOrValue" [attr.for]="field.id" class="control-label">{{ field.templateOptions.label | asyncOrValue}}</label>
         <select #f
            [formControl]="field.control" 
            [id]="field.id"
            (click)="field.onClick(f.value, $event)" 
            (blur)="field.onBlur(f.value, $event)" 
            (focus)="field.onFocus(f.value, $event)"
             class="form-control">
            <option *ngFor="let option of field.templateOptions.options | asyncOrValue" [value]="option.value">{{ option.text }}</option>
         </select>
    </div>
`
})
export class SelectDefaultTemplate extends BaseTemplate {
    constructor() {
        super();
    }
}