// import {Component, ElementRef} from "@angular/core";
// import {Field, IField, BaseTemplate} from "./base";
// import {FormService} from "../services/form.service";
// import {DivLayout} from "../layouts/empty.layout";
//
// export interface DivDefaultOptions {
//     html: string,
//     className: string
// }
//
// export interface DivDefault extends IField {
//     templateOptions: DivDefaultOptions;
// }
//
//
// @Component({
//     selector: 'divDefaultTemplate',
//     directives: [DivLayout],
//     template: `<div divLayout [field]="self"><div [class]="templateOptions.className || ''"></div></div>`
// })
// export class DivDefaultTemplate extends BaseTemplate {
//
//     constructor(private _elementRef: ElementRef, protected formService: FormService) {
//         super(formService);
//     }
//
//     ngOnInit() {
//         super.ngOnInit();
//         this.innerHTML(this.templateOptions.html || '');
//         // console.log('initialize', (this.control as any).hidden);
//         // console.log('initialize', (this.control as any).hidden);
//     }
//     getDiv() {
//         return this._elementRef.nativeElement.querySelector('div > div');
//     }
//     innerHTML(content: string) {
//         let div = this.getDiv();
//         if (div) {
//             div.innerHTML = content;
//         }
//     }
// }