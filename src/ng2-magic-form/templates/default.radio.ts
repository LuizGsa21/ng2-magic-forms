import {Component} from "@angular/core";
import {DefaultLayout} from "./layout.default";
import {BaseTemplate} from "./base";

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
        DefaultLayout
    ],
    template: `
    <div defaultLayout [field]="field">
        <label *ngFor="let radio of field.templateOptions.radios" class="radio-inline">
          <input type="radio" [name]="field.option.key" [value]="radio.value" (click)="field.updateControl(radio.value)" [checked]="radio.value == field.control.value">{{ radio.text || '' }}
        </label>
    </div>
`
})
export class RadioDefaultTemplate extends BaseTemplate {

    ngOnInit() {
        // we have to initialize the default value ourselves because we never bind to an element.
        // NOTE: not doing so will still work but `form.value` wont return the control's value when the form first renders
        this.field.updateControl(this.field.option.defaultValue);
    }

    // TODO: find out correct way to implement radio buttons in ng2.
}