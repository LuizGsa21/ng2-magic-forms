import {Control} from "@angular/common";
import {Input, OnInit, Component, HostBinding} from "@angular/core";
import {IField, Field} from "./base";
import {FormService} from "../services/form.service";
import {DefaultLayout} from "../layouts/default.layout";


export interface InputDefaultOptions extends IField {
    type: string,
    defaultValue?: string,
    label?: string,
    placeholder?: string,
    className?: string,
    description?: string
}

export interface InputDefault extends IField {
    templateOptions: InputDefaultOptions
}


@Component({
    selector: 'inputDefaultTemplate',
    exportAs: 'field',
    directives: [
        DefaultLayout
    ],
    template: `
    <div defaultLayout [field]="self">
     <label *ngIf="templateOptions.label" [attr.for]="option.key" class="control-label">{{ templateOptions.label }}</label>
     <input [ngFormControl]="control" [type]="templateOptions.type" [id]="option.key" [placeholder]="templateOptions.placeholder || ''" class="form-control">
    </div>
`
})
export class InputDefaultTemplate extends Field<InputDefault, InputDefaultOptions> {

    constructor(protected formService: FormService) {
        super(formService);
        var annotations = Reflect.getOwnMetadata('annotations', InputDefaultTemplate);
        console.log('annotations', annotations);
    }

}