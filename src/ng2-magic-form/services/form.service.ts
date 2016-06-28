import {Injectable} from "@angular/core";
import {Validators, AbstractControl} from "@angular/common";
import {throwError, isBlank} from "../util";
import {MagicControlGroup} from "../models/magic_group";
import {MagicControl} from "../models/magic_control";
import {IField} from "../magic_field.component";


@Injectable()
export class FormService {
    private _form: MagicControlGroup;

    constructor () {}

    init () {
        this._form = new MagicControlGroup({});
        (window as any).debugForm = this._form;
    }

    getForm () {
        return this._form;
    }

    createControl (option: IField) {
        let key = option.key;
        // Don't allow duplicate keys
        if (this._isDuplicateKey(key)) {
            throwError(`'${key}' is a DUPLICATE KEY.`)
        }
        let validators;
        if (option.validators) {
            validators = option.validators.map((v) => this._extendValidator(v, option));
        }
        validators = this._extractValidators(validators);
        let control = new MagicControl(option, validators);
        this._form.addControl(option.key, control);
        return control;
    }

    getControlErrors(controlName: string) {
        let control = this._form.controls[controlName];
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

    getControl(controlName: string) {
        return this._form.controls[controlName];
    }

    _extractValidators(validators:any[]) {
        if (isBlank(validators) || !validators.length) {
            return;
        }
        if (validators.length == 1) {
            return validators[0];
        } else {
            return Validators.compose(validators)
        }
    }

    _extendValidator(validator: any, option: any) {
        let form = this;
        return function (control: AbstractControl) {
            return validator(control, option, form)
        }
    }
    _isDuplicateKey(key: string) {
        return !!this._form.controls[key];
    }
}