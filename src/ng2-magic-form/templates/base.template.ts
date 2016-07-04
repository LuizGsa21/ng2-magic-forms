import {
    Input,
    HostBinding
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {IOptionField} from '../magic_field.component';
import {MagicControl} from '../magic_control';


export class BaseTemplate {

    @Input('field')
    field: MagicControl;

    @HostBinding('class')
    get className () { return this.field.templateClassName; }
    get control (): FormControl { return this.field.control; }
    get templateOptions (): IOptionField { return this.field.templateOptions; }
    get options () { return this.field.options; }

    ngOnInit() {
        this.normalizeOptions();
    }

    /**
     * Normalize template options
     */
    normalizeOptions() {
        let options = this.field.templateOptions;
        ['label', 'placeholder', 'description']
            .forEach((propName) => options[propName] = options[propName] || '');
    }
}