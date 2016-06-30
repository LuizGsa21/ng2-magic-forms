import {Injectable} from "@angular/core";
import {Validators, AbstractControl} from "@angular/common";
import {throwError, isBlank, isEmpty} from "../util";
import {MagicControlGroup} from "../models/magic_group";
import {MagicControl} from "../models/magic_control";
import {IOptionField} from "../magic_field.component";
import {IMagicError} from "../models/magic_error";

/**
 *
 */
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

    createControl (option: IOptionField): MagicControl {
        return this._form.createControl(option);
    }

    getErrors() {
        return this._form.errors;
    }
    
    getControlErrors(controlName: string): IMagicError[] {
        return this._form.getControlFormattedErrors(controlName);
    }

    getControl(controlName: string) {
        return this._form.controls[controlName];
    }
}