import {required} from "./required";
import {lessThan} from "./less_than";
import {transformValidator, transformValidatorInvoke} from "./shared";


export class MagicValidators {
    static required = required;
    static requiredTransform = transformValidator(required);
    static lessThan = lessThan;
    static lessThanTransform = transformValidatorInvoke(lessThan);
}