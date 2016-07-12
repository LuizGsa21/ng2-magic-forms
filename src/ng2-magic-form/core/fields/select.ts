import {Component} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {isBlank} from '../../util';
import {Field} from './field';


export interface SelectFieldOptions {
    options: Array<{value:string, text:string}>
}
@Component({
    selector: 'magicInput',
    directives: [REACTIVE_FORM_DIRECTIVES],
    template:`
 <select #f
    [formControl]="field.control" 
    [id]="field.id"
    (click)="field.onClick(f.value, $event)" 
    (blur)="field.onBlur(f.value, $event)" 
    (focus)="field.onFocus(f.value, $event)"
    [class]="field.templateOptions.className || ''">
    <option *ngFor="let option of field.templateOptions.options" [value]="option.value">{{ option.text }}</option>
 </select>
`
})
export class SelectField extends Field {
    checkTemplateOptions() {
        super.checkTemplateOptions();
        if (isBlank(this.field.templateOptions.options)) {
            this.throwError('templateOptions.options is required.');
        }
    }
}