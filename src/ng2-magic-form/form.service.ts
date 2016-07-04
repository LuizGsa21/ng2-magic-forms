import {Injectable} from '@angular/core';
import {
    FormGroup,
    FormControl
} from '@angular/forms';
import {throwError} from './util';
import {ValidatorFn} from './validators/shared';
import {MagicControl} from './magic_control';
import {
    Control,
    AbstractControl
} from '@angular/common';

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

    magicControls: {
        [key: string]: MagicControl
    } = {};
    
    constructor () { super({}); }

    /**
     * Creates a FormControl using the provided MagicControl.
     */
    createControl (magic: MagicControl): FormControl {
        let options = magic.options;
        // Don't allow duplicate keys
        if (this.controls.hasOwnProperty(options.key)) {
            throwError(`'${options.key}' is a DUPLICATE KEY.`)
        }
        let control = new FormControl(options.defaultValue);
        this.magicControls[options.key] = magic;
        this.addControl(options.key, control);
        return control;
    }

    /**
     * Remove a control from this group.
     */
    removeControl(name: string): void {
        delete this.magicControls[name];
        super.removeControl(name);
    }
}
