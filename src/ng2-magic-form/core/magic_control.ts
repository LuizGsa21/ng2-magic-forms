import {
    FormControl,
    Validators
} from '@angular/forms';
import {
    MagicValidatorFn,
    MagicAsyncValidatorFn,
    MagicControlOptions
} from './interfaces';
import {
    isArray,
    isPresent,
    isBlank,
    debug
} from '../util';
import {MagicForm} from './magic_form';


export function coerceValidator (validator: MagicValidatorFn | MagicValidatorFn[]): any {
    return (isArray(validator)) ? Validators.compose(validator as any) : validator as any;
}

export function coerceAsyncValidator (asyncValidator: MagicAsyncValidatorFn | MagicAsyncValidatorFn[]): any {
    return (isArray(asyncValidator)) ? Validators.composeAsync(asyncValidator as any) : asyncValidator as any;
}

export function extendValidator (magicControl: MagicControl, validator: MagicValidatorFn) {
    return function () {
        return validator.call(magicControl, magicControl);
    };
}

abstract class AbstractMagicControl {
    /**
     * exposed only for binding with [formControl] 
     * @internal 
     */
    control: FormControl;
    
    constructor (value?: any, validator?: MagicValidatorFn | MagicValidatorFn[], asyncValidator?: MagicAsyncValidatorFn | MagicAsyncValidatorFn[]) {
        this.control = new FormControl(value, coerceValidator(validator), coerceAsyncValidator(asyncValidator));
        this.registerListeners();
    }

    abstract registerListeners (): void;


    updateValue(value: any, {onlySelf, emitEvent, emitModelToViewChange}: {
        onlySelf?: boolean,
        emitEvent?: boolean,
        emitModelToViewChange?: boolean
    } = {}): void {
        this.control.updateValue(value, {onlySelf, emitEvent, emitModelToViewChange});
    }

    get valid () { return this.control.valid }

    get value () { return this.control.value }

    get dirty () { return this.control.dirty }

    get valueChanges () { return this.control.valueChanges; }

    get statusChanges () { return this.control.statusChanges; }

    get pending () { return this.control.pending; }

    // get errors () { return this._control.errors; }

    get validator () { return this.control.validator; }

    get asyncValidator () { return this.control.asyncValidator; }
}

export class MagicControl extends AbstractMagicControl {
    /** @internal */
    _form: MagicForm;
    /** @internal */
    _parent: MagicControl;
    /** @internal */
    _children: MagicControl[];
    
    isSelfHidden: boolean;

    // transformed errors used by templates
    _errors: any[] = [];

    constructor (public options: MagicControlOptions, value?: any, validator?: MagicValidatorFn | MagicValidatorFn[], asyncValidator?: MagicAsyncValidatorFn | MagicAsyncValidatorFn[]) {
        super(value, validator, asyncValidator);
        this.isSelfHidden = (isPresent(this.options.hidden)) ? !!this.options.hidden : false;
    }

    get id() { return `${this._form.prefix}${this.key}` }
    get key() { return this.options.key }
    get type() { return this.options.type }
    get hostClassName() { return this.options.hostClassName || '' }
    get templateClassName() { return this.options.templateClassName || '' }
    get layoutClassName() { return this.options.layoutClassName || '' }
    get templateOptions() { return this.options.templateOptions }
    get errors () { return this._errors; }
    

    get hidden() {
        if (this.isSelfHidden) return true;
        if (isBlank(this._parent)) return false;
        return this._parent.hidden;
    }

    set hidden(value) {
        if (this.isSelfHidden !== value) {
            this.isSelfHidden = value;
            this.includeOrExclude();
        }
    }

    registerListeners() {
        this.control.valueChanges.subscribe((value) => {
            this._callEvent('valueChanges', value)
        });
        this.control.statusChanges.subscribe((status) => {
            this.syncErrors();
            this._callEvent('statusChanges', status)
        });
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

    includeOrExclude(options?:{onlySelf:boolean}) {
        // `onlySelf` defaults to `false`
        let onlySelf = (isPresent(options) && isPresent(options.onlySelf)) ? options.onlySelf : false;
        if (this.hidden) {
            this._form.exclude(this.options.key);
        } else {
            this._form.include(this.options.key);
        }
        if (!onlySelf && isPresent(this._children)) {
            this._children.forEach((control) => control.includeOrExclude(options));
        }
    }

    onClick (value: any, event: any) { return this._callEvent('onClick', value, event); }
    onBlur (value: any, event: any) { return this._callEvent('onBlur', value, event); }
    onFocus (value: any, event: any) { return this._callEvent('onFocus', value, event); }

    private _callEvent (eventName: string, value: any, event?: any) {
        debug(eventName, 'name', this.key);
        if (this.options[eventName]) {
            if (event) {
                return this.options[eventName].call(this, value, event, this);
            } else {
                return this.options[eventName].call(this, value, this);
            }
        }
        return void 0;
    }

    findControl(controlKey:string) {
        return this._form.getMagicControl(controlKey);
    }

    /** @internal */
    _dispose() {
        this._form = null;
        this._parent = null;
        if (isPresent(this._children)) {
            this._children.forEach((control) => control._dispose());
            this._children = null;
        }
    }
}