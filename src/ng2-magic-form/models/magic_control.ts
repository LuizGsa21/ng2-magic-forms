import {Control} from "@angular/common";
import {ValidatorFn, AsyncValidatorFn} from "@angular/common/src/forms/directives/validators";
import {IOptionField} from "../magic_field.component";

export class MagicControl extends Control {
    
    constructor (public options: IOptionField, validator: ValidatorFn, asyncValidator?: AsyncValidatorFn) {
        super(options.defaultValue, validator, asyncValidator);
    }
}