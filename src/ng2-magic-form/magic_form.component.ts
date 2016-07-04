import {
    Component,
    Input,
    Output,
    EventEmitter,
    Self
} from '@angular/core';
import {
    MagicViewFactory,
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
    isPresent,
    isEmpty
} from './util';
import {MagicControl} from './magic_control';


@Component({
    selector: 'magicForm',
    exportAs: 'magicForm',
    providers: [
        Form
    ],
    directives: [
        FORM_DIRECTIVES,
        REACTIVE_FORM_DIRECTIVES,
        MagicViewFactory
    ],
    template: `
    <form *ngIf="formOptions" [formGroup]="form" (ngSubmit)="onSubmit.emit(form)">
      <magicField *ngFor="let field of fields" [field]="field"></magicField>
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

    @Input('options')
    formOptions: IOptionField[];
    fields: MagicControl[] = [];

    @Output('onSubmit')
    onSubmit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    constructor (@Self() public form: Form) {  }

    ngOnInit() {
        debug('Created MagicForm:', this);
        if (isBlank(this.formOptions)) {
            print('No form options specified!!');
        }
        this.fields = this.createFields(this.formOptions);
        (window as any).debugForm = this.form;
    }

    createFields(formOptions: IOptionField[]): MagicControl[] {
        return formOptions.map((options) => new MagicControl(options, this.form));
    }

    get valid () { return this.form.valid; }

    get value () { return this.form.value; }

    private _debug (obj?: any) { return JSON.stringify(obj, null, 2); }

    get debugValues () { return this._debug(this.form.value); }

    get debugErrors () {
        function transformFields(field: any) {
            return {
                key: field.key,
                hidden: field.hidden,
                _hidden: field._hidden,
                isSelfHidden: field.isSelfHidden,
                value: field.value,
                valid: field.valid,
                errors: field.errors,
                'options.hidden': field.options.hidden,
                children: isEmpty(field._children) ? null : field._children.map(transformFields)
            }
        }
        return this._debug(this.fields.map(transformFields));
    }

}