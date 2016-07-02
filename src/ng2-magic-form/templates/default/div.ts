import {Component} from '@angular/core';
import {BaseTemplate} from '../base.template';

export interface DivDefaultOptions {
    html: string;
}

@Component({
    selector: 'divDefaultTemplate',
    template: `<div *ngIf="!field.hidden" [class]="field.options.layoutClassName || ''" [innerHTML]="field.templateOptions.html"></div>`
})
export class DivDefaultTemplate extends BaseTemplate {}