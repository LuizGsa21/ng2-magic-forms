
import {Control} from "@angular/common";
import {FormService} from "./services/form.service";


export class MagicHelper {
    static hideWhen(controlName: string) {
        return {
            is: function (value) {
                return (currentValue: any, option: any, control: Control, form: FormService) => {
                    return form.getControl(controlName).value === value;
                }
            }
        };
    }
}