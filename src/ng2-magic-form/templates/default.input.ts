import {Component} from "@angular/core";
import {IField} from "../magic_field.component";
import {BaseTemplate} from "./base";
import {DefaultLayout} from "./layout.default";


export interface InputDefaultOptions extends IField {
    type: string,
    defaultValue?: string,
    label?: string,
    placeholder?: string,
    className?: string,
    description?: string
}


@Component({
    selector: 'inputDefaultTemplate',
    exportAs: 'field',
    directives: [
        DefaultLayout
    ],
    template: `
    <div defaultLayout [field]="field">
     <label *ngIf="field.templateOptions.label" [attr.for]="field.option.key" class="control-label">{{ field.templateOptions.label }}</label>
     <input [ngFormControl]="field.control" [type]="field.templateOptions.type" [id]="field.option.key" [placeholder]="field.templateOptions.placeholder || ''" class="form-control">
    </div>
`
})
export class InputDefaultTemplate extends BaseTemplate {

}