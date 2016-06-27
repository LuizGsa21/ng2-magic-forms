import {isBlank, isString, isFunction, throwError} from "../util";
import {Control, ControlGroup, AbstractControl} from "@angular/common";
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
    static getControlGroup (control: Control): ControlGroup {
        // sometimes root returns a Control, so we check by instance here.
        return (<ControlGroup>control.root instanceof ControlGroup) ? <ControlGroup>control.root : null;
    }

    static getControlByName (controlGroup: ControlGroup, name: string): Control {
        return (controlGroup.controls[name]) ? <Control>controlGroup.controls[name] : null;
    }

    static findControl (control: Control, controlName: string): Control {
        var controlGroup = ControlHelper.getControlGroup(control);
        if (!controlGroup) return null;
        return ControlHelper.getControlByName(controlGroup, controlName);
    }


    static observeControl (
        controlName: string,
        isValid: (self?: Control, control?: Control) => boolean,
        getErrorMessage: (self?: Control, control?: Control) => { [key: string]: any }
    ): ValidatorFn {
        var hasRegistered = false;
        return (self: Control): {[key: string]: any} => {
            var control = ControlHelper.findControl(self, controlName);
            if (!control) {
                return null;
            }
            if (!hasRegistered) { // only register once
                hasRegistered = true;
                // register for future changes
                control.valueChanges.subscribe(() => self.updateValueAndValidity({onlySelf: false, emitEvent: true}));
            }
            return isValid(self, control) ? null : getErrorMessage();
        }
    }

}

