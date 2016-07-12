import {
    Component,
    Input
} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {Field} from './field';


interface InputFieldOptions {
    type: string;
    placeholder?: string;
    className?: string;
}

@Component({
    selector: 'magicRadio',
    directives: [REACTIVE_FORM_DIRECTIVES],
    template:`
<input type="radio" 
    [name]="field.id" 
    [value]="radio.value"
    [class]="field.templateOptions.className || ''"
    (click)="onClick(radio, $event)" 
    (blur)="field.onBlur(radio, $event)" 
    (focus)="field.onFocus(radio, $event)" 
    [checked]="radio?.value === field.value">
`
})
export class RadioField extends Field {

    @Input('radio')
    radio: {value:string, text:string};

    ngOnInit() {
        super.ngOnInit();
        // we have to initialize the default value ourselves because we never bind to an element.
        // NOTE: not doing so will still work but `form.value` wont return the control's value when the form first renders
        this.field.updateValue(this.field.options.defaultValue);
    }
    onClick(radio: any, event: any) {
        // override click behavior since we have to update the value ourselves
        this.field.onClick(radio, event);
        if (!event.defaultPrevented) {
            this.field.updateValue(radio.value);
        }
    }
}