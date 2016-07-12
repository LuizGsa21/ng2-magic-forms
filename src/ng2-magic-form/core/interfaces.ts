import {MagicControl} from './magic_control';

export interface MagicValidatorFn {
    (magicControl: MagicControl): {[key: string]: any};
}
export interface MagicAsyncValidatorFn {
    (magicControl: MagicControl): {[key: string]: any};
}

export interface MagicFormOptions {
    prefix: string;
}

export interface MagicControlOptions {
    key: string; // must be unique within form
    type: string; // template type

    hostClassName?: string;
    templateClassName?: string;
    layoutClassName?: string;

    hidden?: boolean;
    defaultValue?: any;
    validators?: any[];
    asyncValidators?: any[];
    
    templateOptions?: any;
    
    children?: MagicControlOptions[];
    
    // events
    valueChanges?: any;
    statusChanges?: any;
    click?: any;
    blur?: any;
    focus?: any;
}
