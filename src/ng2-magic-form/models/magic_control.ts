import {Control} from "@angular/common";
import {ValidatorFn, AsyncValidatorFn} from "@angular/common/src/forms/directives/validators";
import {IField} from "../magic_field.component";

export class MagicControl extends Control {
    
    magicParent: MagicControl;
    
    constructor (public options: IField, validator: ValidatorFn, asyncValidator?: AsyncValidatorFn) {
        super(options.defaultValue, validator, asyncValidator);
    }
}