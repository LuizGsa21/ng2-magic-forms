import {ControlGroup, AbstractControl, Validators} from "@angular/common";
import {throwError, isEmpty} from "../util";
import {MagicControl} from "./magic_control";
import {IField} from "../magic_field.component";


export class MagicControlGroup extends ControlGroup {

    addField(field: IField) {
        let key = field.key;
        // Don't allow duplicate keys
        if (this._hasDuplicateKey(key)) {
            throwError(`'${key}' is a DUPLICATE KEY.`)
        }
        let validators;
        if (field.validators) {
            validators = field.validators.map((v) => this._extendValidator(v, field));
        }
        validators = this._extractValidators(validators);
        let control = new MagicControl(field, validators);
        this.addControl(field.key, control);
        return control;
    }

    addFields (fields: IField[]) {
        if (isEmpty(fields)) return;
        fields.forEach(this.addField.bind(this));
    }


    _extendValidator(validator: any, option: any) {
        let form = this;
        return function (control: AbstractControl) {
            return validator(control, option, form)
        }
    }

    _extractValidators(validators:any[]) {
        if (isEmpty(validators)) { return void 0; }
        return validators.length === 1 ? validators[0] : Validators.compose(validators);
    }

    _hasDuplicateKey(key: string) {
        return this.controls.hasOwnProperty(key);
    }

}