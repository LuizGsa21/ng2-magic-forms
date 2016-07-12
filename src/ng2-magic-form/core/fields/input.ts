import {
    Component,
    HostBinding,
    Directive,
    Input,
    Optional,
    Self,
    Inject
} from '@angular/core';
import {
    REACTIVE_FORM_DIRECTIVES,
    FormControlDirective,
    FormControl
} from '@angular/forms';
import {isBlank} from '../../util';
import {Field} from './field';
import {MagicControl} from '../magic_control';


interface InputFieldOptions {
    type: string;
    placeholder?: string;
    className?: string;
}

@Directive({
    selector: '[magicInput]',
    host: {
        '(click)': 'field.onClick(field.value, $event)',
        '(blur)': 'field.onBlur(field.value, $event)',
        '(focus)': 'field.onFocus(field.value, $event)',
        '[type]': 'field.templateOptions.type',
        '[id]': 'field.id',
        '[class]': `field.templateOptions.className || ''`,
        '[placeholder]': "field.templateOptions.placeholder || ''",
    }
})
export class InputField extends Field {

    @Input('magicInput')
    field: MagicControl;

    constructor(@Self() @Inject(FormControlDirective) private _control: FormControl) {
        super();
    }

    checkTemplateOptions() {
        super.checkTemplateOptions();
        let type = this.field.templateOptions.type;
        if (isBlank(type)) {
            this.throwError('templateOptions.type is required.');
        }
        if (type === 'radio') {
            this.throwError(`type 'radio' is not supported with type 'input', please use 'radio' template instead.`);
        }
    }
}