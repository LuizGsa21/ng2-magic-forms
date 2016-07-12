import {
    Input,
    Injectable,
    Component,
    Output,
    EventEmitter
} from '@angular/core';
import {
    FormGroup,
    REACTIVE_FORM_DIRECTIVES,
    FORM_DIRECTIVES
} from '@angular/forms';
import {MagicControl} from './magic_control';
import {
    throwError,
    isEmpty
} from '../util';
import {MagicControlFactory} from './magic_view_facotry';
import {isBlank} from '@angular/forms/src/facade/lang';
/**
 * An instance is created for each form.
 *
 * @internal
 */
@Injectable()
export class MagicForm extends FormGroup {

    static counter = 1;
    prefix: string;

    magicControls: {
        [key: string]: MagicControl
    } = {};
    /** @internal */
    _magicControlTree: any[];

    constructor () {
        super({});
        // TODO: allow custom prefix
        this.prefix = `form${MagicForm.counter++}_`;
    }

    /**
     * Attaches an existing MagicControl to this form.
     */
    attachMagicControl (magic: MagicControl): void {
        magic._form = this;
        let options = magic.options;
        // Don't allow duplicate keys
        if (this.controls.hasOwnProperty(options.key)) {
            throwError(`'${options.key}' is a DUPLICATE KEY.`)
        }
        this.magicControls[options.key] = magic;
        this.addControl(options.key, magic.control);
    }

    removeControl(name: string): void {
        delete this.magicControls[name];
        super.removeControl(name);
    }

    getMagicControl (name: string) {
        return this.magicControls[name] || null;
    }
}

@Component({
    selector: 'form',
    directives: [
        FORM_DIRECTIVES,
        REACTIVE_FORM_DIRECTIVES,
        MagicControlFactory
    ],
    template:`
<magicField *ngFor="let field of form?._magicControlTree" [field]="field"></magicField>
<pre>{{ debugValues }}</pre>
`
})
export class MagicFormComponent {

    @Input('magicForm')
    form: MagicForm;

    @Output('onSubmit')
    onSubmit: EventEmitter<MagicForm> = new EventEmitter<MagicForm>();

    constructor () {}

    ngOnChanges() {
        this._checkFormPresent();
    }

    get debugValues () { return this._debug(this.form.value); }

    get debugErrors () {
        function transformFields(field: any) {
            return {
                key: field.key,
                hidden: field.hidden,
                isSelfHidden: field.isSelfHidden,
                value: field.value,
                valid: field.valid,
                errors: field.errors,
                'options.hidden': field.options.hidden,
                children: isEmpty(field._children) ? null : field._children.map(transformFields)
            }
        }
        return this._debug(this.form._magicControlTree.map(transformFields));
    }

    private _debug (obj?: any) { return JSON.stringify(obj, null, 2); }

    private _checkFormPresent() {
        if (isBlank(this.form)) {
            throwError(`magicForm binding is required. Example: <form [magicForm]="myForm"></form>`);
        }
    }
}