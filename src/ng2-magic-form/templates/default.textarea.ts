import {Component} from "@angular/core";
import {FormService} from "../services/form.service";
import {IOptionField} from "../magic_field.component";
import {DefaultLayout} from "./layout.default";
import {BaseTemplate} from "./base";

export interface TextareaDefaultOptions {
    defaultValue?: string,
    label?: string,
    placeholder?: string,
    className?: string,
    description?: string,
    cols: number,
    rows: number
}

@Component({
    selector: 'textareaDefaultTemplate',
    directives: [
        DefaultLayout
    ],
    template: `
    <div defaultLayout [field]="field" [class]="field.option.templateOptions.className || ''">
         <label *ngIf="field.templateOptions.label" [attr.for]="field.option.key" class="control-label">{{ field.templateOptions.label }}</label>
         <textarea [ngFormControl]="field.control" [id]="field.option.key" [placeholder]="field.templateOptions.placeholder || ''" [cols]="field.templateOptions.cols" [rows]="field.templateOptions.rows || '4'" class="form-control"></textarea>
    </div>
`
})
export class TextareaDefaultTemplate extends BaseTemplate {}