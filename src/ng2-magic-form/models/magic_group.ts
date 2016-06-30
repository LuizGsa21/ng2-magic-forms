import {ControlGroup, AbstractControl, Validators} from "@angular/common";
import {throwError, isEmpty, isObject} from "../util";
import {MagicControl} from "./magic_control";
import {IOptionField} from "../magic_field.component";
import {IMagicError} from "./magic_error";

export interface ValidatorFn { (c: AbstractControl): {[key: string]: any}; }
export interface AsyncValidatorFn {
    (c: AbstractControl): any /*Promise<{[key: string]: any}>|Observable<{[key: string]: any}>*/;
}

export class MagicControlGroup extends ControlGroup {

    constructor(controls: {[key: string]: AbstractControl},
                optionals: {[key: string]: boolean} = null, validator: ValidatorFn = null,
                asyncValidator: AsyncValidatorFn = null) {
        super(controls, optionals, validator, asyncValidator);

    }

    /**
     * Creates a control using the provided IOptionField.
     * @param option
     * @returns {MagicControl}
     */
    createControl (option: IOptionField): MagicControl {
        let key = option.key;
        // Don't allow duplicate keys
        if (this._isDuplicateKey(key)) {
            throwError(`'${key}' is a DUPLICATE KEY.`)
        }
        let validators;
        if (option.validators) {
            validators = this._extendValidators(option.validators, option);
        }
        validators = this._normalizeValidators(validators);
        let control = new MagicControl(option, validators);
        this.addControl(option.key, control);
        return control;
    }

    get errors(): any[] {
        return Object.keys(this.controls)
            .map((controlName) => this.controls[controlName].errors)
            .filter(isObject);
    }

    getControlFormattedErrors(controlName: string): IMagicError[] {
        let control = this.controls[controlName];
        if (!control || control.valid) {
            return [];
        }
        let errors = control.errors;
        return Object.keys(errors).map((key) => {
            return {
                name: key,
                controlName: controlName,
                message: errors[key].message
            };
        })
    }


    /**
     * Wraps the validators providing access to the form and the option field.
     * @private
     */
    _extendValidators (validators: any[], option: IOptionField): Function[] {
        let form = this;
        return validators.map((validator) => {
            return function (control: AbstractControl) {
                return validator(control, option, form)
            }
        });
    }

    _normalizeValidators (validators: any[]): ValidatorFn {
        if (isEmpty(validators)) {
            return void 0;
        }
        return validators.length === 1 ? validators[0] : Validators.compose(validators);
    }

    _isDuplicateKey (key: string) {
        return this.controls.hasOwnProperty(key);
    }
}