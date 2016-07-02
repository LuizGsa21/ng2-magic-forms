import {Injectable} from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators
} from '@angular/forms';
import {IOptionField} from './magic_field.component';
import {
    throwError,
    isEmpty
} from './util';
import {ValidatorFn} from './validators/shared';

/** 
 * An instance Form is created for each form.
 *
 * You should always create a control using this service. 
 * It extends angular's validators providing access to the form and the field options.
 *
 * @internal
 */
@Injectable()
export class Form extends FormGroup {

    constructor() {
        super({});
    }
    /**
     * Creates a control using the provided IOptionField.
     * @param options
     * @returns {FormControl}
     */
    createControl (options: IOptionField): FormControl {
        let key = options.key;
        // Don't allow duplicate keys
        if (this._isDuplicateKey(key)) {
            throwError(`'${key}' is a DUPLICATE KEY.`)
        }
        let validators;
        if (options.validators) {
            validators = this._extendValidators(options.validators, options);
        }
        validators = this._normalizeValidators(validators);
        let control = new FormControl(options.defaultValue, validators);
        this.addControl(options.key, control);
        return control;
    }

    getControlErrors(controlName: string) {
        let control = this.controls[controlName];
        if (!control || control.valid) {
            return [];
        }
        let errors = control.errors;
        return Object.keys(errors).map((key) => {
            return {
                name: key,
                message: errors[key].message
            };
        })
    }

    /**
     * Wraps the validators providing access to the form and the field options.
     * @private
     */
    private _extendValidators (validators: any[], options: IOptionField): Function[] {
        let form = this;
        return validators.map((validator) => {
            return function (control: FormControl) {
                return validator(control, options, form)
            }
        });
    }

    _normalizeValidators (validators: any[]): ValidatorFn {
        if (isEmpty(validators)) {
            return void 0;
        }
        return validators.length === 1 ? validators[0] : Validators.compose(validators);
    }

    private _isDuplicateKey (key: string) {
        return this.controls && this.controls.hasOwnProperty(key);
    }
}
