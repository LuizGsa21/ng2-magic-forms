import {
    Input,
    HostBinding
} from '@angular/core';
import {MagicField} from '../magic_field.component';
import {BaseTemplate} from './base.template';


export class BaseLayout extends BaseTemplate {

    @Input('field')
    field: MagicField;

    @HostBinding('class')
    get className () { return this.field.options.layoutClassName || ''; }
}
