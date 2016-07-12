import {
    Input,
    HostBinding
} from '@angular/core';
import {BaseTemplate} from './base.template';
import {MagicControl} from '../core/magic_control';


export class BaseLayout extends BaseTemplate {

    @Input('field')
    field: MagicControl;

    @HostBinding('class')
    get className () { return this.field.layoutClassName; }
}