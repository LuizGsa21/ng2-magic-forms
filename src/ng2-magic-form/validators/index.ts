import {required} from "./required";
import {transformValidator} from "./shared";


export class MagicValidators {
    static required = required;
    static requiredTransform = transformValidator(required)
}