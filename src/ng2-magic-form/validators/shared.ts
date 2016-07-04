import {
    isBlank,
    isString,
    isFunction,
    throwError,
    debug
} from '../util';
import {
    FormControl,
    FormGroup,
    AbstractControl
} from '@angular/forms';

function getObjectContainingMessage(obj) {
    return obj[Object.keys(obj)[0]];
}

export interface ValidatorFn {
    (c: AbstractControl): {
        [key: string]: any;
    };
}

export function transformValidator(func: any) {
    return function (transformer: any) {
        return transformMessage(func, transformer);
    };
}

export function transformValidatorInvoke(func: any): any {
    return function (...args) {
        return transformMessage(func.apply(null, args), args[args.length - 1]);
    };
}


function getValidatorName(obj: any) {
    return Object.keys(obj)[0];
}

export function transformMessage(func: any, transformer: any) {
    return function (...args) {
        let error = func.apply(this, args);
        if (isBlank(error)) {
            return null;
        }
        let name = getValidatorName(error);
        debug('transformMessage() name:', name, 'error:', error);
        if (isFunction(transformer)) {
            let errorTransformed = transformer(error);
            // only update the message property when the user returns a string
            if (isString(errorTransformed)) {
                error[name].message = errorTransformed;
                return error;
            } else {
                return errorTransformed;
            }
        } else if (isString(transformer)) {
            error[name].message = transformer;
            return error;
        } else {
            // should never reach
            throwError('transformMessage WTF moment');
        }
    };
}


export class ControlHelper {
    static getFormGroup (control: FormControl): FormGroup {
        // sometimes root returns a FormControl, so we check by instance here.
        return (<FormGroup>control.root instanceof FormGroup) ? <FormGroup>control.root : null;
    }

    static getFormControlByName (controlGroup: FormGroup, name: string): FormControl {
        return (controlGroup.controls[name]) ? <FormControl>controlGroup.controls[name] : null;
    }

    static findFormControl (control: FormControl, controlName: string): FormControl {
        var controlGroup = ControlHelper.getFormGroup(control);
        if (!controlGroup) return null;
        return ControlHelper.getFormControlByName(controlGroup, controlName);
    }


    static observeControl (
        controlName: string,
        isValid: (self?: FormControl, control?: FormControl) => boolean,
        getErrorMessage: (self?: FormControl, control?: FormControl) => { [key: string]: any }
    ): ValidatorFn {
        var hasRegistered = false;
        return (self: FormControl): {[key: string]: any} => {
            var control = ControlHelper.findFormControl(self, controlName);
            if (!control) {
                return null;
            }
            if (!hasRegistered) { // only register once
                hasRegistered = true;
                // register for future changes
                control.valueChanges.subscribe(() => self.updateValueAndValidity({onlySelf: true, emitEvent: true}));
            }
            return isValid(self, control) ? null : getErrorMessage();
        }
    }

}

