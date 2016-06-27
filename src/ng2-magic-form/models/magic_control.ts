import {Control} from "@angular/common";
import {ValidatorFn, AsyncValidatorFn} from "@angular/common/src/forms/directives/validators";
import {IField} from "../templates/base";

export class MagicControl extends Control {
    
    constructor (public field: IField, validator: ValidatorFn, asyncValidator?: AsyncValidatorFn) {
        super(field.defaultValue, validator, asyncValidator);
    }
}