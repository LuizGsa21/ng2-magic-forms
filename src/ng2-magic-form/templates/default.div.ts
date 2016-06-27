import {Component, ElementRef} from "@angular/core";
import {Field, IField} from "./base";
import {FormService} from "../services/form.service";

export interface DivDefaultOptions {
    html: string,
    className: string
}

export interface DivDefault extends IField {
    templateOptions: DivDefaultOptions;
}


@Component({
    selector: 'divDefaultTemplate',
    template: `<div [class]="templateOptions.className || ''"></div>`
})
export class DivDefaultTemplate extends Field<DivDefault, DivDefaultOptions> {

    get usesTransclusion() {
        return false;
    }

    constructor(private _elementRef: ElementRef, protected formService: FormService) {
        super(formService);
    }

    ngOnInit() {
        this.initOptions();
        this.innerHTML(this.templateOptions.html || '');
    }
    getDiv() {
        return this._elementRef.nativeElement.querySelector('div');
    }
    innerHTML(content: string) {
        this.getDiv().innerHTML = content;
    }
}