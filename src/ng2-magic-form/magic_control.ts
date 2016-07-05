import {
    isFunction,
    isEmpty,
    isBlank,
    debug,
    throwError
} from './util';
import {Field} from './field';
import {MagicForm} from './magic_form';
import {IOptionField} from './magic_view_factory';
import {
    FormControl,
    Validators
} from '@angular/forms';
import {ValidatorFn} from './validators/shared';
import {ChangeDetectorRef} from '@angular/core';


/**
 * Wraps the validators providing access to the form and the field options.
 * @private
 */
function normalizeValidators (validators: any[], magic: MagicControl, isAsync = false): ValidatorFn {
    if (isEmpty(validators)) {
        return void 0;
    }
    validators = validators.map((validator) => {
        return function () {
            return validator(magic.control, magic);
        }
    });
    if (validators.length === 1) {
        return validators[0];
    } else {
        return  isAsync ? Validators.composeAsync(validators) : Validators.compose(validators);
    }

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
    options._asyncValidators = normalizeValidators(options.asyncValidators, magic, true);
    return options;
}

/**
 * Magic control is the main field used in a template.
 */
export class MagicControl extends Field {

    /** @internal */
    _parent: MagicControl;
    /** @internal */
    _children: MagicControl[] = [];
    /** @internal */
    _hidden: boolean = false;
    /** @internal */
    _isParentHidden = false;

    /**
     * Set by MagicViewFactory
     */
    viewRef: ChangeDetectorRef;

    // exposed only for binding for DOM binding
    control: FormControl;
    id: string;

    // transformed errors used by templates
    _errors: any[] = [];

    constructor(public options: IOptionField, public form: MagicForm) {
        super();
        debug('creating MagicControl', this.options.key, this);
        this.id = this.form.prefix + this.options.key;
        this.options = normalizeOptions(this, options);
        // setting hidden status prior to creating the children is required
        // their parent status wont be properly set.
        this._hidden = this.options.hidden;
        // create control and automatically attach itself to the form.
        this.control = new FormControl(options.defaultValue);
        this.form.attachMagicControl(this);

        // create children recursively
        let children = this.options.children;
        if (!isEmpty(children)) {
            children.forEach((childOptions) => this.addChild(new MagicControl(childOptions, form)));
        }
        this.control.setValidators(this.options._validators);
        this.control.setAsyncValidators(this.options._asyncValidators);

        this.registerListeners();
        // wait until all controls are created before syncing errors
        setTimeout(() => this.syncErrors(), 0);
    }

    // re-export form options
    get key() { return this.options.key }
    get type() { return this.options.type }
    get hostClassName() { return this.options.hostClassName || '' }
    get layoutClassName() { return this.options.layoutClassName || ''}
    get templateClassName() { return this.options.templateClassName || ''}
    get defaultValue() { return this.options.defaultValue || ''}
    get templateOptions() { return this.options.templateOptions }

    // re-export FormControl properties
    updateValue(value: any) { this.control.updateValue(value, {onlySelf: false}) }
    get valid() { return this.control.valid }
    get value() { return this.control.value }
    get dirty() { return this.control.dirty }
    get valueChanges() { return this.control.valueChanges; }
    get statusChanges() { return this.control.statusChanges; }
    get pending() { return this.control.pending; }
    get errors() { return this._errors; }


    // apparently typescript doesn't support calling super on getters and setters
    // when generating ES5 code. So we move the getters/setters here for now.
    // see: https://github.com/Microsoft/TypeScript/issues/338
    public get hidden() {
        return this._isParentHidden ? true : this._hidden;
    }

    public set hidden(value: boolean) {
        if (this._hidden !== value) {
            debug(this.key, 'UPDATED hidden value to', this.options.hidden);
            this._hidden = value;
            this.notifyChildren();
            this.includeOrExcludeSelf();
            this.markForCheck();
        }
    }

    markForCheck() {
        this.viewRef.markForCheck();
    }

    excludeSelf() { this.form.exclude(this.key) }
    includeSelf() { this.form.include(this.key) }
    includeOrExcludeSelf() { (this._isParentHidden || this._hidden) ? this.excludeSelf() : this.includeSelf(); }

    /**
     * Returns true if this field is marked as `hidden`, ignoring any parents visibility status.
     * @returns {boolean}
     */
    get isSelfHidden() { return this._hidden; }

    getControl(name) { return this.form.getMagicControl(name); }

    onClick (value: any, event: any) { return this._callEvent('onClick', value, event); }
    onBlur (value: any, event: any) { return this._callEvent('onBlur', value, event); }
    onFocus (value: any, event: any) { return this._callEvent('onFocus', value, event); }

    private _callEvent (eventName: string, value: any, event?: any) {
        debug(eventName, 'name', this.key);
        if (this.options[eventName]) {
            if (event) {
                return this.options[eventName].call(this, value, this, this._getEventObject(event));
            }
            return this.options[eventName].call(this, value, this);
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
        if (this.control.status === 'VALID') {
            // Reset error array and keep same reference if array is empty
            return this._errors = (this._errors.length) ?  [] : this._errors;
        }
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
        this.control.valueChanges.subscribe((value) => {
            this._callEvent('onValueChanges', value)
        });
        this.control.statusChanges.subscribe((status) => {
            this.syncErrors();
            this._callEvent('onStatusChanges', status)
        });
    }
}