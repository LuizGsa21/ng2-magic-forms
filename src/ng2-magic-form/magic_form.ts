import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {
    throwError,
    isBlank,
    isPresent
} from './util';
import {MagicControl} from './magic_control';

/**
 * An instance is created for each form.
 *
 * @internal
 */
@Injectable()
export class MagicForm extends FormGroup {

    static counter = 1;
    prefix: string;
    
    magicControls: {
        [key: string]: MagicControl
    } = {};
    
    constructor () {
        super({});
        // TODO: allow custom prefix
        this.prefix = `form${MagicForm.counter++}_`;
    }

    /**
     * Attaches an existing MagicControl to this form.
     */
    attachMagicControl (magic: MagicControl): void {
        let options = magic.options;
        // Don't allow duplicate keys
        if (this.controls.hasOwnProperty(options.key)) {
            throwError(`'${options.key}' is a DUPLICATE KEY.`)
        }
        this.magicControls[options.key] = magic;
        this.addControl(options.key, magic.control);
    }

    removeControl(name: string): void {
        delete this.magicControls[name];
        super.removeControl(name);
    }

    getMagicControl (name: string) {
        return this.magicControls[name] || null;
    }
}
