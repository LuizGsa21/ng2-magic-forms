// import {
//     Component,
//     Directive,
//     HostBinding
// } from '@angular/core';
// import {REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
// import {isBlank} from '../../util';
// import {Field} from './field';
//
//
// @Component({
//     selector: 'magicLabel',
//     directives: [REACTIVE_FORM_DIRECTIVES],
//     template:`
// <label 
// [style.display]="field.templateOptions.label ? null : 'none'"  
// [attr.for]="field.id" 
// [class]="field.templateOptions.labelClassName || ''">{{ field.templateOptions.label }}</label>
// `
// })
// @Directive({
//     selector: 'magicLabel',
// })
// export class LabelField extends Field {
//    
//     @HostBinding('attr.for')
//     get for() { return this.field.id }
//
//     @HostBinding('attr.for')
//     get for() { return this.field.id }
//
// }


import {
    Component,
    Directive,
    HostBinding,
    Input
} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {isBlank} from '../../util';
import {Field} from './field';
import {MagicControl} from '../magic_control';


@Directive({
    selector: '[magicLabel]',
})
export class LabelField  {
    @Input('magicLabel')
    field: MagicControl;
    @HostBinding('style.display')
    get hidden() { return this.field.templateOptions.label ? null : 'none'; }
    @HostBinding('innerHTML')
    get label() { return this.field.templateOptions.label || '' }
}