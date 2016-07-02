import {Component} from '@angular/core';
import {DefaultLayout} from './_layout';
import {BaseTemplate} from '../base.template';
import {FormControlDirective} from '@angular/forms';

export interface RadioFieldOptions {
    defaultValue?: string;
    label?: string;
    className?: string;
    description?: string;
    radios: Array<{value:string, text:string}>
}

@Component({
    selector: 'radioDefaultTemplate',
    directives: [
        DefaultLayout,
        FormControlDirective
    ],
    template: `
    <div defaultLayout [field]="field">
        <label *ngFor="let radio of field.templateOptions.radios" class="radio-inline">
          <input type="radio" [name]="field.options.key" [value]="radio.value" (click)="field.updateValue(radio.value)" [checked]="radio.value == field.value">{{ radio.text || '' }}
        </label>
    </div>
`
})
export class RadioDefaultTemplate extends BaseTemplate {

    ngOnInit() {
        // we have to initialize the default value ourselves because we never bind to an element.
        // NOTE: not doing so will still work but `form.value` wont return the control's value when the form first renders
        this.field.updateValue(this.field.options.defaultValue);
    }

    // TODO: find out correct way to implement radio buttons in ng2.
}