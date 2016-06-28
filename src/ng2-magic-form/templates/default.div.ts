import {Component, ElementRef, OnInit} from "@angular/core";
import {FormService} from "../services/form.service";
import {BaseTemplate} from "./base";

export interface DivDefaultOptions {
    html: string,
    className: string
}


@Component({
    selector: 'divDefaultTemplate',
    template: `<div *ngIf="!field.hidden" [class]="field.templateOptions?.className || ''" [innerHTML]="field.option.templateOptions.html"></div>`
})
export class DivDefaultTemplate extends BaseTemplate {
    
}