import {
    MagicControl,
    extendValidator,
    coerceValidator,
    coerceAsyncValidator
} from '../../src/ng2-magic-form/core/magic_control';
import {Observable} from 'rxjs/Rx';
import {MagicForm} from '../../src/ng2-magic-form/core/magic_form';


describe('coerceValidator', () => {
    it('should be a function', () => {
        expect(coerceValidator).toBeFunction();
    });
    it('should compose array of validators', () => {
        let called = 0;
        let validators = coerceValidator([() => called++, () => called++, () => called++] as any);
        expect(validators).toBeFunction();
        validators();
        // all functions in array should be called
        expect(called).toBe(3);
    });
    it('should return original function when argument is not an array', () => {
        let func = (() => void 0) as any;
        let validator = coerceValidator(func);
        expect(func).toBe(validator);
    });
});

describe('coerceAsyncValidator', () => {
    it('should be a function', () => {
        expect(coerceAsyncValidator).toBeFunction();
    });
    it('should compose array of validators', () => {
        let called = 0;
        let validators = coerceAsyncValidator([() => called++, () => called++, () => called++] as any);
        expect(validators).toBeFunction();
        validators();
        // all functions in array should be called
        expect(called).toBe(3);
    });
    it('should return original function when argument is not an array', () => {
        let func = (() => void 0) as any;
        expect(func).toBe(coerceAsyncValidator(func));
    });

});

describe('extendValidator', () => {
    let mControl: MagicControl;
    beforeEach(() => {
        mControl = new MagicControl({} as any, null);
    });
    it('should be a function', () => {
        expect(extendValidator).toBeFunction();
    });

    it('should return a function', () => {
        let validatorFn = (() => {}) as any;
        let func = extendValidator(mControl, validatorFn);
        expect(func).toBeFunction();
    });
    describe('the returned function', () => {
        it('should invoke the validator with the magic control as first argument', () => {
            let obj = {
                validatorFn: (() => {}) as any
            };
            spyOn(obj, 'validatorFn');
            let func = extendValidator(mControl, obj.validatorFn as any);
            func();
            expect(obj.validatorFn).toHaveBeenCalled();
            expect(obj.validatorFn).toHaveBeenCalledWith(mControl);
        });
    });
});

describe('MagicControl', () => {
    let mControl: MagicControl;
    let defaultValue = 'defaultValue1';
    let validatorFn = (magicControl: MagicControl): {[key: string]: any} => null;
    let asyncValidatorFn = (magicControl: MagicControl): {[key: string]: any} => Observable.create((obj) => null);

    beforeEach(() => {
        mControl = new MagicControl({key:'key1'} as any, defaultValue, validatorFn, asyncValidatorFn);
        mControl._form = new MagicForm();
    });

    it('should create control', () => {
        expect((mControl as any).control).toBeDefined();
    });

    it(`should re-export FormControl's API`, () => {
        let control = (mControl as any)._control = {
            valid: 1,
            value: 2,
            dirty: 3,
            valueChanges: 4,
            statusChanges: 5,
            pending: 6,
            validator: 7,
            asyncValidator: 8,
        };
        expect(mControl.valid).toBe(control.valid);
        expect(mControl.value).toBe(control.value);
        expect(mControl.dirty).toBe(control.dirty);
        expect(mControl.valueChanges).toBe(control.valueChanges);
        expect(mControl.statusChanges).toBe(control.statusChanges);
        expect(mControl.pending).toBe(control.pending);
        expect(mControl.validator).toBe(control.validator);
        expect(mControl.asyncValidator).toBe(control.asyncValidator);
    });

    describe('constructor', () => {
        it('should set default value', () => {
            expect(mControl.value).toBe(defaultValue);
        });
        it('should set validator', () => {
            expect(mControl.validator).toBe(validatorFn);
        });
        it('should set async validator', () => {
            expect(mControl.asyncValidator).toBe(asyncValidatorFn);
        });
        it('should set isSelfHidden status', () => {
            mControl = new MagicControl({hidden: false} as any);
            expect(mControl.isSelfHidden).toBe(false);
            
            mControl = new MagicControl({hidden: true} as any);
            expect(mControl.isSelfHidden).toBe(true);
            
            mControl = new MagicControl({} as any);
            expect(mControl.isSelfHidden).toBe(false);
        });

        it('should register listeners', () => {
            spyOn(MagicControl.prototype, 'registerListeners');
            mControl = new MagicControl({} as any);
        });
    });

    describe('registerListeners', () => {
        it('should exist', () => {
            expect(mControl.registerListeners).toBeFunction();
        });
        it('should subscribe to valueChanges event', () => {
            let control = (mControl as any).control;
            spyOn(control.valueChanges, 'subscribe');
            mControl.registerListeners();
            expect(control.valueChanges.subscribe).toHaveBeenCalled();
            expect(control.valueChanges.subscribe).toHaveBeenCalledTimes(1);
        });
        it('should subscribe to statusChanges event', () => {
            let control = (mControl as any).control;
            spyOn(control.statusChanges, 'subscribe');
            mControl.registerListeners();
            expect(control.statusChanges.subscribe).toHaveBeenCalled();
            expect(control.statusChanges.subscribe).toHaveBeenCalledTimes(1);
        });
    });
    
    describe('findControl', () => {
        it('should exist', () => {
            expect(mControl.findControl).toBeFunction();
        });
    });


    describe('includeOrExclude', () => {
        it('should exist', () => {
            expect(mControl.includeOrExclude).toBeFunction();
        });
        it('should exclude itself from form when hidden', () => {
            spyOn(mControl._form, 'exclude');
            mControl.isSelfHidden = true;
            mControl.includeOrExclude();
            expect(mControl._form.exclude).toHaveBeenCalledWith('key1');
        });
        it('should includeSelf when visible', () => {
            spyOn(mControl._form, 'include');
            mControl.isSelfHidden = false;
            mControl.includeOrExclude();
            expect(mControl._form.include).toHaveBeenCalledWith('key1');
        });
        it('should notify children when onlySelf is false', () => {
            let child = new MagicControl({hidden: false} as any);
            spyOn(child, 'includeOrExclude');
            mControl._children = [child];
            let options = {onlySelf: false};
            mControl.includeOrExclude(options);
            expect(child.includeOrExclude).toHaveBeenCalledWith(options);
        });

        it('should NOT notify children when onlySelf is true', () => {
            let child = new MagicControl({hidden: false} as any);
            spyOn(child, 'includeOrExclude');
            mControl._children = [child];
            mControl.includeOrExclude({onlySelf: true});
            expect(child.includeOrExclude).not.toHaveBeenCalled();
        });

    });

    describe('hidden', () => {
        it('should update isSelfHidden', () => {
            mControl.isSelfHidden = false;
            mControl.hidden = true;
            expect(mControl.isSelfHidden).toBe(true);
            mControl.hidden = false;
            expect(mControl.isSelfHidden).toBe(false);
        });
        it('should NOT call includeOrExclude when set to the same value', () => {
            spyOn(mControl, 'includeOrExclude');
            mControl.isSelfHidden = false;
            mControl.hidden = false;
            expect(mControl.includeOrExclude).not.toHaveBeenCalled();
        });

        it('should call includeOrExclude when value changes', () => {
            spyOn(mControl, 'includeOrExclude');
            mControl.isSelfHidden = true;
            mControl.hidden = false;
            expect(mControl.includeOrExclude).toHaveBeenCalled();
        });
    });
});
