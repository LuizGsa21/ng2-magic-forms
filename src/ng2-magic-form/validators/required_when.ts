import {Validators, Control} from "@angular/common";
import {isPresent} from "../util";
import {ControlHelper} from "./shared";


export function required(...args) {
    let error = Validators.required.apply(this, args);
    if (isPresent(error)) {
        return {required: {message: 'This field is required.'}}
    }
    return null;
}

/**
 * Makes this Control required when its target has a truthy value.
 * This is useful for fields that are required only when a specific option is set.
 * @param controlName - name of the control to observe for changes
 */
export function requiredWhen (controlName: string) {
    var isValid = (self: Control, control: Control): boolean => {
        var isRequired = !!control.value;
        return (isRequired) ? !!self.value : true;
    };
    var getErrorMessage = (): {[key: string]: any} => {
        return {requiredWhen: {message: 'This field is required.'}};
    };
    return ControlHelper.observeControl(controlName, isValid, getErrorMessage);
}