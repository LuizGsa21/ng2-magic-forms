// import {Component} from "@angular/core";
// import {IField, Field} from "./base";
// import {DefaultLayout} from "../layouts/default.layout";
// import {FormService} from "../services/form.service";
//
// export interface TextareaDefaultOptions {
//     defaultValue?: string,
//     label?: string,
//     placeholder?: string,
//     className?: string,
//     description?: string,
//     cols: number,
//     rows: number
// }
//
// export interface TextareaDefault extends IField {
//     templateOptions?: TextareaDefaultOptions;
// }
//
// @Component({
//     selector: 'textareaDefaultTemplate',
//     directives: [
//         DefaultLayout
//     ],
//     template: `
//     <div defaultLayout [field]="self">
//          <label *ngIf="templateOptions.label" [attr.for]="option.key" class="control-label">{{ templateOptions.label }}</label>
//          <textarea [ngFormControl]="control" [id]="option.key" [placeholder]="templateOptions.placeholder || ''" [cols]="templateOptions.cols" [rows]="templateOptions.rows || '4'" class="form-control"></textarea>
//     </div>
// `
// })
// export class TextareaDefaultTemplate extends Field<TextareaDefault, TextareaDefaultOptions> {
//
//     constructor(protected formService: FormService) {
//         super(formService);
//     }
// }