import {
    Component,
    Input,
    Output,
    EventEmitter,
    Self
} from '@angular/core';
import {
    MagicField,
    IOptionField
} from './magic_field.component';
import {
    FormGroup,
    REACTIVE_FORM_DIRECTIVES,
    FORM_DIRECTIVES
} from '@angular/forms';
import {Form} from './form.service';
import {
    debug,
    print,
    isBlank,
    isPresent
} from './util';


@Component({
    selector: 'magicForm',
    exportAs: 'magicForm',
    providers: [
        Form
    ],
    directives: [
        FORM_DIRECTIVES,
        REACTIVE_FORM_DIRECTIVES,
        MagicField
    ],
    template: `
    <form *ngIf="formOptions" [formGroup]="form" (ngSubmit)="onSubmit.emit(form)">
      <magicField *ngFor="let formOption of formOptions" [options]="formOption"></magicField>
      <ng-content></ng-content>
<pre>
Is form valid? {{ valid }}
Form values:
{{ debugValues }}

Form errors:
{{ debugErrors }}
</pre>
    </form>
`
})
export class MagicForm {

    @Input('fields')
    formOptions: IOptionField[];

    @Output('onSubmit')
    onSubmit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    constructor (@Self() public form: Form) {  }

    ngOnInit() {
        debug('Created MagicForm:', this);
        if (isBlank(this.formOptions)) {
            print('No form options specified!!');
        }
    }
    get valid () { return this.form.valid; }

    get value () { return this.form.value; }

    private _debug (obj?: any) { return JSON.stringify(obj, null, 2); }

    get debugValues () { return this._debug(this.form.value); }

    get debugErrors () {
        let errors = Object.keys(this.form.controls).map((controlName) => {
            return this.form.controls[controlName].errors
        }).filter(isPresent);
        return this._debug(errors);
    }
}