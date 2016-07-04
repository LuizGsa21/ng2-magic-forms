import {
    isFunction,
    isEmpty,
    isBlank,
    debug,
    throwError,
    normalizeBool,
    isString
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
function normalizeValidators (validators: any[], magic: MagicControl): ValidatorFn {
    if (isEmpty(validators)) {
        return void 0;
    }
    validators = validators.map((validator) => {
        return function () {
            return validator(magic.control, magic);
        }
    });
    return validators.length === 1 ? validators[0] : Validators.compose(validators);
}

function normalizeOptions(magic: MagicControl, options: IOptionField) {
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
    options._validators = normalizeValidators(options.validators, magic);
    return options;
}

export class MagicControl extends Field {

    /** @internal */
    _parent: MagicControl;
    /** @internal */
    _children: MagicControl[] = [];

    /** @internal */
    _hidden: boolean = false;
    /** @internal */
    _isParentHidden = false;


    // exposed only for binding for DOM binding
    control: FormControl;

    options: IOptionField;
    // transformed errors used by templates
    _errors: any[];

    constructor(options: IOptionField, public form: Form) {
        super();
        this.options = normalizeOptions(this, options);
        this._hidden = this.options.hidden;
        debug('creating MagicControl', this.options.key, this);
        this.control = this.form.createControl(this);
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
        if (this.options.hidden !== this._hidden) {
            setTimeout(() => this.hidden = this.options.hidden);
        }
        return this._isParentHidden ? true : this._hidden;
    }

    public set hidden(value: boolean) {
        if (this._hidden !== value) {
            debug(this.key, 'UPDATED hidden value to', this.options.hidden);
            this.options.hidden = this._hidden = value;
            this.notifyChildren();
            this.includeOrExcludeSelf();
        }
    }

    includeOrExcludeSelf() {
        if (this._isParentHidden || this._hidden) {
            this.excludeSelf();
        } else {
            this.includeSelf();
        }
    }

    excludeSelf() {
        this.form.exclude(this.key)
    }

    includeSelf() {
        this.form.include(this.key)
    }

    get isSelfHidden() { return this._hidden; }

    updateValue(value: any) { this.control.updateValue(value, {onlySelf: false}) }
    get valid() { return this.control.valid }
    get value() { return this.control.value }
    get dirty() { return this.control.dirty }
    get valueChanges() { return this.control.valueChanges; }
    get statusChanges() { return this.control.statusChanges; }
    get pending() { return this.control.pending; }
    get errors() { return this._errors; }
    
    onClick (value: any, event: any) { return this._callEvent('onClick', value, event); }
    onBlur (value: any, event: any) { return this._callEvent('onBlur', value, event); }
    onFocus (value: any, event: any) { return this._callEvent('onFocus', value, event); }
    
    findMagicControl(name) {
        return this.form.magicControls[name] || null;
    }
    
    private _callEvent (eventName: string, value: any, event: any) {
        // debug(eventName, 'name', this.key, 'value', value, 'magic', this, 'event', event);
        debug(eventName, 'name', this.key);
        if (this.options[eventName]) {
            return this.options[eventName].call(this, value, this, this._getEventObject(event));
        }
        return void 0;
    }

    private _getEventObject(event: any) {
        return {
            event: event,
            form: this.form,
            controls: this.form.magicControls,
            ngControls: this.form.controls
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