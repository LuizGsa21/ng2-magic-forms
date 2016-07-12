import {MagicForm} from './magic_form';
import {Injectable} from '@angular/core';
import {MagicControlOptions} from './interfaces';
import {
    isBlank,
    throwError,
    debug,
    isEmpty
} from '../util';
import {MagicControl} from './magic_control';
import {isArray} from 'util';


function validateOptions(options: MagicControlOptions) {
    if (isBlank(options)) {
        throwError('field options not specified.')
    }
    if (isBlank(options.key)) {
        debug(`The field option 'key' is missing:`, options);
        throwError(`The field option 'key' is required...`);
    }
    if (isBlank(options.type)) {
        debug(`The field option 'type' is missing:`, options);
        throwError(`The field option 'type' is required...`);
    }
    if (options.type === 'container') {
        if (isEmpty(options.children)) {
            throwError(`The template type 'container' requires children fields`);
        }
    } else if (!isEmpty(options.children)) {
        throwError(`Only a 'container' type may have children fields`);
    }
    return options;
}

/**
 * Creates a magic form object from a user-specified configuration.
 */
@Injectable()
export class MagicFormBuilder {
    
    group(controlsConfig: MagicControlOptions[]): MagicForm {
        let form = new MagicForm();
        if (!isArray(controlsConfig)) {
            throwError('controlsConfig must be an array');
        }
        form._magicControlTree = controlsConfig.map(function createControl(options) {
            validateOptions(options);
            let control = new MagicControl(options, options.defaultValue, options.validators, options.asyncValidators);
            form.attachMagicControl(control);
            if (!isEmpty(options.children)) {
                control._children = options.children.map((options) => {
                    let child = createControl(options);
                    child._parent = control;
                    child.includeOrExclude({onlySelf:true});
                    return child;
                });
            }
            return control;
        });
        return form;
    }
}


