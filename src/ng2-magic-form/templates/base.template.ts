import {
    Input,
    HostBinding
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {
    MagicField,
    IOptionField
} from '../magic_field.component';


export class BaseTemplate {

    @Input('field')
    field: MagicField;

    constructor () {}

    @HostBinding('class')
    get className () { return this.field.options.templateClassName || ''; }
    get control (): FormControl { return this.field.control; }
    get templateOptions (): IOptionField { return this.field.templateOptions; }
    get options () { return this.field.options; }
}