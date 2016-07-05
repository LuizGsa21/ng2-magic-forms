import {Control} from '@angular/common';
import {MagicControl} from '../magic_control';


export function invalidValues (values: string[] = []): any {
    return (control: Control, magic: MagicControl) => {
        let value = control.value;
        let length = values.length;
        for (var i = 0; i < length; i++) {
            if (value === values[i])
                return {duplicate: {message: `${value} already exists`}};
        }
        return null;
    };
}