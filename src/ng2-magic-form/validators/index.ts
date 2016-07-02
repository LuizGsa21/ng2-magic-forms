import {required} from './required';
import {lessThan} from './less_than';
import {greaterThan} from './greater_than';
import {requiredWhen} from './required_when';
import {
    transformValidator,
    transformValidatorInvoke
} from './shared';


export class MagicValidators {

    static required = required;
    static requiredTransform = transformValidator(required);
    
    static requiredWhen = transformValidatorInvoke(requiredWhen);

    static lessThan = lessThan;
    static lessThanTransform = transformValidatorInvoke(lessThan);

    static greaterThan = transformValidatorInvoke(greaterThan);
    static greaterThanTransform = transformValidatorInvoke(greaterThan);
}