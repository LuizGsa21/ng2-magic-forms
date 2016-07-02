import {Component} from '@angular/core';
import {DefaultLayout} from './_layout';
import {BaseTemplate} from '../base.template';
import {FormControlDirective} from '@angular/forms';

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
    template: `
    <div defaultLayout [field]="field">
         <label *ngIf="field.templateOptions.label" [attr.for]="field.options.key" class="control-label">{{ field.templateOptions.label }}</label>
         <select [formControl]="field.control" [id]="field.options.key" class="form-control">
            <option *ngFor="let option of field.templateOptions.options" [value]="option.value">{{ option.text }}</option>
         </select>
    </div>
`
})
export class SelectDefaultTemplate extends BaseTemplate {}