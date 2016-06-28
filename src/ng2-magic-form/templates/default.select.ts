import {Component} from "@angular/core";
import {DefaultLayout} from "./layout.default";
import {BaseTemplate} from "./base";

export interface SelectFieldOptions {
    defaultValue?: string;
    label?: string;
    className?: string;
    description?: string;
    options: Array<{value:string, text:string}>
}

@Component({
    selector: 'selectDefaultTemplate',
    directives: [
        DefaultLayout
    ],
    template: `
    <div defaultLayout [field]="field">
         <label *ngIf="field.templateOptions.label" [attr.for]="field.option.key" class="control-label">{{ field.templateOptions.label }}</label>
         <select [ngFormControl]="field.control" [id]="field.option.key" class="form-control">
            <option *ngFor="let option of field.templateOptions.options" [value]="option.value">{{ option.text }}</option>
         </select>
    </div>
`
})
export class SelectDefaultTemplate extends BaseTemplate {}