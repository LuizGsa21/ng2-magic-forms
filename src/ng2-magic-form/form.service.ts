import {Injectable} from '@angular/core';
import {
    FormGroup,
    FormControl
} from '@angular/forms';
import {throwError} from './util';
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

    constructor () {
        super({});
    }

    /**
     * Creates a control using the provided IOptionField.
     */
    createControl (key: string, defaultValue?: any, validators?: ValidatorFn): FormControl {
        // Don't allow duplicate keys
        if (this.controls.hasOwnProperty(key)) {
            throwError(`'${key}' is a DUPLICATE KEY.`)
        }
        let control = new FormControl(defaultValue, validators);
        this.addControl(key, control);
        return control;
    }
}
