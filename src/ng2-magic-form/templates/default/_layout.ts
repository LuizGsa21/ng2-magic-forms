import {
    Component,
    Input
} from '@angular/core';
import {BaseLayout} from '../base.layout';
import {BaseTemplate} from '../base.template';
import {InputField} from '../../core/fields/input';
import {LabelField} from '../../core/fields/label';
import {MagicControl} from '../../core/magic_control';
import {
    REACTIVE_FORM_DIRECTIVES,
    FORM_DIRECTIVES
} from '@angular/forms';

@Component({
    selector: '[defaultLayout]',
    template: `
<div *ngIf="!field.hidden" class="form-group" [class.has-error]="!field.control.valid && field.control.touched">
  <ng-content></ng-content>
  <div *ngIf="!field.control.valid && field.control.touched">
    <div *ngFor="let error of field.errors" class="help-block">{{ error.message }}</div>
  </div>
  <div [style.display]="field.templateOptions.description ? null : 'none'" class="description">{{ field.templateOptions.description }}</div>
</div>`
})
export class DefaultLayout extends BaseLayout {

}

@Component({
    selector: 'inputDefaultTemplate',
    directives: [
        DefaultLayout,
        InputField,
        LabelField,
        FORM_DIRECTIVES,
        REACTIVE_FORM_DIRECTIVES
    ],
    template: `
    <div defaultLayout [field]="field">
     <label [magicLabel]="field"></label>
     <input [magicInput]="field" [formControl]="field.control">
    </div>
`
})
export class InputDefaultTemplate extends BaseTemplate {
    @Input('field')
    field: MagicControl;

    constructor() { super(); }
}