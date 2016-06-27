import {Control} from "@angular/common";
import {Input, OnInit, Component, HostBinding} from "@angular/core";
import {IField, Field} from "./base";
import {DefaultLayout} from "../layouts/default.layout";
import {FormService} from "../services/form.service";

export interface RadioFieldOptions {
    defaultValue?: string;
    label?: string;
    className?: string;
    description?: string;
    radios: Array<{value:string, text:string}>
}

export interface RadioDefault extends IField {
    templateOptions?: RadioFieldOptions;
}

@Component({
    selector: 'radioDefaultTemplate',
    directives: [
        DefaultLayout
    ],
    template: `
    <div defaultLayout [field]="self">
        <label *ngFor="let radio of templateOptions.radios" class="radio-inline">
          <input type="radio" [name]="option.key" [value]="radio.value" (click)="updateControl(radio.value)" [checked]="radio.value == control.value">{{ radio.text || '' }}
        </label>
    </div>
`
})
export class RadioDefaultTemplate extends Field<RadioDefault, RadioFieldOptions> {

    constructor(protected formService: FormService) {
        super(formService);
    }

    ngOnInit() {
        super.ngOnInit();
        // we have to initialize the default value ourselves because we never bind to an element.
        // NOTE: not doing so will still work but `form.value` wont return the control's value when the form first renders
        this.updateControl(this.option.defaultValue)
    }

    // TODO: find out correct way to implement radio buttons in ng2.
}