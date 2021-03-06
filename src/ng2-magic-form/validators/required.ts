import {Validators} from '@angular/forms';
import {isPresent} from '../util';


export function required(...args) {
    let error = Validators.required.apply(this, args);
    if (isPresent(error)) {
        return {required: {message: 'This field is required.'}}
    }
    return null;
}