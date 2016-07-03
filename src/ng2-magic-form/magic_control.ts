import {
    isFunction,
    isEmpty,
    isBlank,
    debug,
    throwError,
    normalizeBool
} from './util';
import {Field} from './field';
import {Form} from './form.service';
import {IOptionField} from './magic_field.component';
import {
    FormControl,
    Validators
} from '@angular/forms';
import {ValidatorFn} from './validators/shared';


/**
 * Wraps the validators providing access to the form and the field options.
 * @private
 */
function normalizeValidators (validators: any[], control: MagicControl): ValidatorFn {
    if (isEmpty(validators)) {
        return void 0;
    }
    validators = validators.map((validator) => {
        return function () {
            return validator(control.control, control);
        }
    });
    return validators.length === 1 ? validators[0] : Validators.compose(validators);
}

function normalizeOptions(control: MagicControl, options: IOptionField) {
    if (isBlank(options)) {
        throwError('field options not specified.')
    }
    if (isBlank(options.type)) {
        debug(`The field option 'type' is missing:`, options);
        throwError(`The field option 'type' is required...`);
    }
    if (options.type === 'container' && isEmpty(options.children)) {
        throwError(`The template type 'container' requires children fields`);
    }
    if (isBlank(options.key)) {
        debug(`The field option 'key' is missing:`, options);
        throwError(`The field option 'key' is required...`);
    }
    // normalize hidden property
    if (isFunction(options.hidden)) {
        options._hiddenFn = options.hidden;
    }
    options.hidden = !!options.hidden;
    // normalize validators
    options._validators = normalizeValidators(options.validators, control);
    return options;
}

export class MagicControl extends Field {

    /** @internal */
    _parent: MagicControl;
    /** @internal */
    _children: MagicControl[] = [];

    // exposed only for binding for DOM binding
    control: FormControl;

    options: IOptionField;
    // transformed errors used by templates
    _errors: any[];

    constructor(options: IOptionField, public form: Form) {
        super();
        this.options = normalizeOptions(this, options);
        debug('creating MagicControl', this.options.key, this);
        this.control = this.form.createControl(this.options.key, this.options.defaultValue);
        let children = this.options.children;
        if (!isEmpty(children)) {
            children.forEach((childOptions) => this.addChild(new MagicControl(childOptions, form)));
        }
        this.control.setValidators(this.options._validators);
        this.registerListeners();
        // wait until all controls are created before syncing errors
        setTimeout(() => this.syncErrors());
    }

    get key() { return this.options.key }
    get type() { return this.options.type }
    get hostClassName() { return this.options.hostClassName || '' }
    get layoutClassName() { return this.options.layoutClassName || ''}
    get templateClassName() { return this.options.templateClassName || ''}
    get defaultValue() { return this.options.defaultValue || ''}
    get templateOptions() { return this.options.templateOptions }

    // apparently typescript doesn't support calling super on getters and setters
    // when generating ES5 code. So we move the getters/setters here for now.
    // see: https://github.com/Microsoft/TypeScript/issues/338
    public get hidden() { 
        return this._isParentHidden ? true : this._hidden; 
    }
    public set hidden(value: boolean) {
        value = !!normalizeBool(value);
        if (this._hidden !== value) {
            this._hidden = value;
            this.notifyChildren();
        }
    }

    updateValue(value: any) { this.control.updateValue(value, {onlySelf: false}) }
    get valid() { return this.control.valid }
    get value() { return this.control.value }
    get dirty() { return this.control.dirty }
    get valueChanges() { return this.control.valueChanges; }
    get statusChanges() { return this.control.statusChanges; }
    get pending() { return this.control.pending; }
    get errors() { return this._errors; }
    
    onClick (event: any) { this._callEvent('onClick', event); }
    onBlur (event: any) { this._callEvent('onBlur', event); }
    onFocus (event: any) { this._callEvent('onFocus', event); }
    
    private _callEvent (eventName: string, value: any) {
        if (this.options[eventName]) {
            return this.options[eventName](value, this);
        }
    }

    syncErrors() {
        let errors = this.control.errors;
        debug('syncErrors() name', this.key, errors);
        if (isBlank(errors)) {
            return this._errors = [];
        }
        return this._errors = Object.keys(errors).map((key) => {
            return {
                name: key,
                message: errors[key].message
            };
        })
    }
    registerListeners() {
        this.control.valueChanges.subscribe(() => {
            debug('valueChanges controlName:', this.key);
            this.syncErrors();
        });
        this.control.statusChanges.subscribe(() => {
            debug('statusChanges controlName:', this.key);
        });
    }
}