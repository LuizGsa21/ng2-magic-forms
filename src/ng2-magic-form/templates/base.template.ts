import {
    Input,
    HostBinding
} from '@angular/core';
import {MagicField} from '../magic_field.component';


export class BaseTemplate {

    @Input('field')
    field: MagicField;

    constructor () {}

    @HostBinding('class')
    get className () { return this.field.options.templateClassName || ''; }
    get control () { return this.field.control; }
    get templateOptions () { return this.field.templateOptions; }
    get options () { return this.field.options; }
}