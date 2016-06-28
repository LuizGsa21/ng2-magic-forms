import {Input, Component, HostBinding} from "@angular/core";
import {FormService} from "../services/form.service";
import {InlineLayout} from "./layout.inline";
import {BaseTemplate} from "./base";


export interface InputGroupInlineOptions {
    type: string;
    defaultValue?: string;
    label?: string;
    placeholder?: string;
    description?: string;
    labelParentClass: string;
    fieldParentClass: string;
    leftSideClass: string;
    rightSideClass: string;
    leftAddon: string;
    rightAddon: string;
}


@Component({
    selector: '[inputGroupInlineTemplate]',
    directives: [InlineLayout],
    template: `
    <div inlineLayout [field]="field">
      <label leftSide *ngIf="field.templateOptions.label" [attr.for]="field.option.key" class="control-label">{{ field.templateOptions.label }}</label>
      <div rightSide class="input-group">
        <div *ngIf="field.templateOptions.leftAddon" class="input-group-addon">{{ field.templateOptions.leftAddon }}</div>
        <input [ngFormControl]="field.control" [type]="field.templateOptions.type" [id]="field.option.key" [placeholder]="field.templateOptions.placeholder || ''" class="form-control">
        <div *ngIf="field.templateOptions.rightAddon" class="input-group-addon">{{ field.templateOptions.rightAddon }}</div>
      </div>
    </div>
`

})
export class InputGroupInlineTemplate extends BaseTemplate {
    
}