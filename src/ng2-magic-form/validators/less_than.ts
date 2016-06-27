import {Control} from "@angular/common";
import {ValidatorFn, ControlHelper} from "./shared";


/**
 * Makes this Control valid when its value is less than its target.
 * If either values are empty or is not a number, then it will assume its valid.
 *
 * @param controlName - name of the control to observe for changes
 */
export function lessThan (controlName: string): ValidatorFn {
    var selfValue: number;
    var otherValue: number;
    var isValid = (self: Control, control: Control): boolean => {
        selfValue = parseFloat(self.value);
        otherValue = parseFloat(control.value);
        if (isNaN(selfValue) || isNaN(otherValue)) {
            return true;
        } else {
            return selfValue < otherValue;
        }
    };
    var getErrorMessage = (): {[key: string]: any} => {
        return {lessThan: {value: selfValue, mustBeLessThan: otherValue, name: controlName}};
    };
    return ControlHelper.observeControl(controlName, isValid, getErrorMessage);
}