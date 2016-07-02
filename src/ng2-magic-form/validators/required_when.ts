import {FormControl} from '@angular/forms';
import {ControlHelper} from './shared';
import {isEmpty} from '../util';


/**
 * Makes this Control required when its target has a truthy value.
 * This is useful for fields that are required only when a specific option is set.
 * @param controlName - name of the control to observe for changes
 */
export function requiredWhen (controlName: string) {
    var isValid = (self: FormControl, control: FormControl): boolean => {
        var isRequired = control.value;
        if (isRequired == false) {
            return true;
        }
        return !isEmpty(self.value);

    };
    var getErrorMessage = (): {[key: string]: any} => {
        return {requiredWhen: {message: 'This field is required.'}};
    };
    return ControlHelper.observeControl(controlName, isValid, getErrorMessage);
}