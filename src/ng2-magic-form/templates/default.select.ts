// import {Control} from "@angular/common";
// import {Input, OnInit, Component, HostBinding} from "@angular/core";
// import {IField, Field} from "./base";
// import {DefaultLayout} from "../layouts/default.layout";
// import {FormService} from "../services/form.service";
//
// export interface SelectFieldOptions {
//     defaultValue?: string;
//     label?: string;
//     className?: string;
//     description?: string;
//     options: Array<{value:string, text:string}>
// }
//
// export interface SelectDefault extends IField {
//     templateOptions?: SelectFieldOptions;
// }
//
// @Component({
//     selector: 'selectDefaultTemplate',
//     directives: [
//         DefaultLayout
//     ],
//     template: `
//     <div defaultLayout [field]="self">
//          <label *ngIf="templateOptions.label" [attr.for]="option.key" class="control-label">{{ templateOptions.label }}</label>
//          <select [ngFormControl]="control" [id]="option.key" class="form-control">
//             <option *ngFor="let option of templateOptions.options" [value]="option.value">{{ option.text }}</option>
//          </select>
//     </div>
// `
// })
// export class SelectDefaultTemplate extends Field<SelectDefault, SelectFieldOptions> {
//
//     // @Host()
//
//     constructor(protected formService: FormService) {
//         super(formService);
//     }
// }