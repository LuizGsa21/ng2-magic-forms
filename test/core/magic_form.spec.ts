import {MagicForm} from '../../src/ng2-magic-form/core/magic_form';
import {FormGroup} from '@angular/forms';
import {MagicControl} from '../../src/ng2-magic-form/core/magic_control';

describe('MagicForm', () => {
    let form: MagicForm;

    beforeEach(() => {
        form = new MagicForm();
    });

    it('should extend FormGroup', () => {
        expect(form instanceof FormGroup).toBe(true);
    });

    it('should update counter when a new instance is created', () => {
        MagicForm.counter = 1;
        new MagicForm();
        expect(MagicForm.counter).toBe(2);
        new MagicForm();
        new MagicForm();
        expect(MagicForm.counter).toBe(4);
    });

    it('should set prefix using the current counter value', () => {
        MagicForm.counter = 1;
        let form = new MagicForm();
        expect(form.prefix).toBe('form1_');
    });

    describe('attachMagicControl', () => {
        it('should throw an error when providing a control with a duplicate key', () => {
            let control1 = new MagicControl({key: 'key1'} as any);
            let control2 = new MagicControl({key: 'key1'} as any);
            form.attachMagicControl(control1);
            expect(() => form.attachMagicControl(control2)).toThrowError(`'key1' is a DUPLICATE KEY.`);
        });
        it('should store magic control', () => {
            spyOn(form, 'addControl')
            let control1 = new MagicControl({key: 'key1'} as any);
            form.attachMagicControl(control1);
            expect(form.magicControls['key1']).toBe(control1);
            expect(form.addControl).toHaveBeenCalledWith('key1', control1.control);
        });
    });

    describe('removeControl', () => {
        it('should delete magic control', () => {
            form.magicControls['key1'] = new MagicControl({key: 'key1'} as any);
            form.removeControl('key1');
            expect(form.magicControls['key1']).toBeUndefined();
        });
    });

    describe('getMagicControl', () => {
        it('should return magic control by name', () => {
            let control = new MagicControl({key: 'key1'} as any);
            form.magicControls['key1'] = control;
            expect(form.getMagicControl('key1')).toBe(control);
        });
        it(`should return null when control doesn't exist`, () => {
            expect(form.getMagicControl('someRandomKey')).toBe(null);
        });
    });
});
