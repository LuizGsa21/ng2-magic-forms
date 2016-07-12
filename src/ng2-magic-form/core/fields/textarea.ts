import {Component} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {
    throwError,
    isBlank
} from '../../util';
import {Field} from './field';


interface InputFieldOptions {
    type: string;
    placeholder?: string;
    className?: string;
}

@Component({
    selector: 'magicTextarea',
    directives: [REACTIVE_FORM_DIRECTIVES],
    template:`
 <textarea #f
   [formControl]="field.control"
   (click)="field.onClick(f.value, $event)" 
   (blur)="field.onBlur(f.value, $event)" 
   (focus)="field.onFocus(f.value, $event)"
   [id]="field.id"
   [placeholder]="field.templateOptions.placeholder || ''"
   [class]="field.templateOptions.className || ''"
   [cols]="field.templateOptions.cols" 
   [rows]="field.templateOptions.rows || '4'"
   ></textarea>
`
})
export class TextAreaField extends Field {
    checkTemplateOptions() {
        super.checkTemplateOptions();
        if (isBlank(this.field)) {
            throwError('TextAreaField: field is required');
        }
        if (isBlank(this.field.templateOptions)) {
            throwError('TextAreaField: templateOptions is required.');
        }
    }
}