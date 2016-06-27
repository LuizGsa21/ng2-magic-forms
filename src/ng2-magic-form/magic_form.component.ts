import {Component, Input, OnInit, Output, EventEmitter} from "@angular/core";
import {FORM_DIRECTIVES} from "@angular/common";
import {FormService} from "./services/form.service";
import {MagicControlGroup} from "./models/magic_group";
import {IField} from "./templates/base";
import {MagicField} from "./magic_field.component";


@Component({
    selector: 'magicForm',
    exportAs: 'magicForm',
    providers: [
        FormService
    ],
    directives: [
        FORM_DIRECTIVES,
        MagicField
    ],
    template: `
    <form *ngIf="formOptions" [ngFormModel]="form" (ngSubmit)="onSubmit.emit(form)">
      <magicField *ngFor="let formOption of formOptions" [option]="formOption"></magicField>
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
export class MagicForm implements OnInit {

    form: MagicControlGroup;

    @Output('onSubmit')
    onSubmit: EventEmitter<MagicControlGroup> = new EventEmitter<MagicControlGroup>();

    _formOptions: IField[];

    constructor(private formService: FormService) {}

    ngOnInit() {
        this.formService.init();
        this.form = this.formService.getForm();
        console.log(this.form);
        this.form.valueChanges.subscribe((...args) => {
            // console.log('form changed', args);
        });
    }


    @Input('fields')
    set formOptions(fields: IField[]) {
        if (this._formOptions !== fields) {
            this._formOptions = fields;
        }
        // if (isPresent(fields)) {
        //     this.validate(fields);
        // }
    }

    get formOptions() {
        return this._formOptions;
    }

    get value() {
        return this.form.value;
    }

    private _debug(obj?:any) {
        return JSON.stringify(obj, null, 2)
    }

    get debugValues() {
        return this._debug(this.form.value);
    }
    
    get debugErrors() {
        // if (!this.form) return null;
        return Object.keys(this.form.controls)
            .map(this.formService.getControlErrors.bind(this.formService))
            .filter((value) => !!value && (value as any).length !== 0)
    }
}