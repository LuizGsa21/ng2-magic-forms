import {Field} from '../src/ng2-magic-form/field';

describe('Field', () => {

    let field: Field;
    beforeEach(() => {
        field = new Field();
    });

    describe('when initialized', () => {
        it('should contain an empty list of children', () => {
            expect(field._children).toBeEmptyArray();
        });
        it('should not have a parent', () => {
            expect(field._parent).toBeUndefined();
            expect(field._isParentHidden).toBeUndefined();
        });
        it('should not be hidden', () => {
            expect(field._hidden).toBeFalse();
            expect(field.hidden).toBeFalse();
        });
    });

    describe('setParent', () => {
        it('should set _parent property', () => {
            let parent = {} as any;
            field.setParent(parent);
            expect(field._parent).toBe(parent);
        });
        it('should update _isParentHidden', () => {
            field.setParent({hidden: true} as any);
            expect(field._isParentHidden).toBeTrue();
        });
    });

    describe('hidden', () => {

        it('should update _hidden status', () => {
            field.hidden = true;
            expect(field._hidden).toBeTrue();
            field.hidden = false;
            expect(field._hidden).toBeFalse();
        });

        it('should return true when parent is hidden and self is visible', () => {
            field._isParentHidden = true;
            field._hidden = false;
            expect(field.hidden).toBeTrue();
        });
        it('should return true when parent and self is hidden', () => {
            field._isParentHidden = true;
            field._hidden = true;
            expect(field.hidden).toBeTrue();
        });
        it('should return true when parent is visible and self is hidden', () => {
            field._isParentHidden = false;
            field._hidden = true;
            expect(field.hidden).toBeTrue();
        });
        it('should return false when parent and self is visible', () => {
            field.setParent({hidden: false} as any);
            field._hidden = false;
            expect(field.hidden).toBeFalse();
        });
        it('should notify its children when hidden status is changed', () => {
            spyOn(field, 'notifyChildren');
            field.hidden = true;
            field.hidden = true;
            expect(field.notifyChildren).toHaveBeenCalledTimes(1);
            (field.notifyChildren as any).calls.reset();
            field.hidden = false;
            field.hidden = false;
            expect(field.notifyChildren).toHaveBeenCalledTimes(1);
        });
    });

    describe('addChild', () => {
        it('should add child to _children array', () => {
            let child = new Field();
            field.addChild(child);
            expect(field._children.length).toBe(1);
            expect(field._children[0]).toBe(child);
        });
        it(`should set the child's parent`, () => {
            let child = new Field();
            spyOn(child, 'setParent');
            field.addChild(child);
            expect(child.setParent).toHaveBeenCalledWith(field);
        });
    });

    describe('parentStatusChanged', () => {
        it('should update _isParentHidden', () => {
            field._parent = {hidden: true} as any;
            field.parentStatusChanged();
            expect(field.hidden).toBeTrue();
        });
        it('should notify children parent status has changed', () => {
            spyOn(field, 'notifyChildren');
            field._parent = {hidden: true} as any;
            field.parentStatusChanged();
            expect(field.notifyChildren).toHaveBeenCalled();
        });

    });
    describe('notifyChildren', () => {

        it('should return false when no children fields were notified', () => {
            expect(field.notifyChildren()).toBeFalse();
        });
        it('should return true children fields were notified', () => {
            field.addChild(new Field());
            expect(field.notifyChildren()).toBeTrue();
        });

        it('should call parentStatusChanged on all children', () => {
            let children = [new Field(), new Field()].map((child) => {
                spyOn(child, 'parentStatusChanged');
                return child;
            });
            children.forEach((child) => field.addChild(child));
            field.notifyChildren();
            children.forEach((child) => expect(child.parentStatusChanged).toHaveBeenCalled());
        });

    });


});