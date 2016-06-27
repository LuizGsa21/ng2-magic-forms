import {Control} from "@angular/common";
import {ValidatorFn, AsyncValidatorFn} from "@angular/common/src/forms/directives/validators";
import {IField} from "../templates/base";
import {isFunction} from "../util";

export class MagicControl extends Control {

    constructor (public options: IField, validator: ValidatorFn, asyncValidator?: AsyncValidatorFn) {
        super(options.defaultValue, validator, asyncValidator);
    }

    get hidden() {
        let hidden = this.options.hidden;
        // console.log('hidden?', this.options.hidden);
        if (isFunction(hidden)) {
            return !!hidden(this, this.options);
        } else {
            return !!hidden;
        }
    }
}