import {Input, Component, HostBinding} from "@angular/core";
import {IField, Field} from "./base";
import {FormService} from "../services/form.service";
import {InlineLayout} from "../layouts/inline.layout";


export interface InputGroupInlineOptions {
    type: string;
    defaultValue?: string;
    label?: string;
    placeholder?: string;
    description?: string;
    labelParentClass: string;
    fieldParentClass: string;
    leftAddon: string;
    rightAddon: string;
}

export interface InputGroupInline extends IField {
    templateOptions: InputGroupInlineOptions
}


@Component({
    selector: '[inputGroupInlineTemplate]',
    directives: [InlineLayout],
    template: `
    <div inlineLayout [field]="self">
      <label leftSide *ngIf="templateOptions.label" [attr.for]="option.key" class="control-label">{{ templateOptions.label }}</label>
      <div rightSide class="input-group">
        <div *ngIf="templateOptions.leftAddon" class="input-group-addon">{{ templateOptions.leftAddon }}</div>
        <input [ngFormControl]="control" [type]="templateOptions.type" [id]="option.key" [placeholder]="templateOptions.placeholder || ''" class="form-control">
        <div *ngIf="templateOptions.rightAddon" class="input-group-addon">{{ templateOptions.rightAddon }}</div>
      </div>
    </div>
`

})
export class InputGroupInlineTemplate extends Field<InputGroupInline, InputGroupInlineOptions> {
    constructor(protected formService: FormService) { super(formService); }
}