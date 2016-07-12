import {Injectable} from '@angular/core';
import {MagicFormBuilder} from '../../src/ng2-magic-form/core/magic_form_builder';
import {MagicForm} from '../../src/ng2-magic-form/core/magic_form';


let options = [
    {
        key: 'key1',
        type: 'container',
        children: [
            {
                key: 'key1_child1',
                type: 'type1_child1',
            },
            {
                key: 'key1_child2',
                type: 'type1_child2',
            },
            {
                key: 'key1_child3',
                type: 'container',
                children: [
                    {
                        key: 'key1_child3_child1',
                        type: 'type1_child3_child1',
                    },
                    {
                        key: 'key1_child3_child2',
                        type: 'type1_child3 _child2',
                    },
                ]
            },
        ]
    },
    {
        key: 'key2',
        type: 'type2'
    },
    {
        key: 'key3',
        type: 'type3'
    },
];
describe('MagicFormBuilder', () => {
    let formBuilder;

    beforeEach(() => {
        formBuilder = new MagicFormBuilder();
    });
    
    describe('group', () => {
        it('should throw when field option is empty', () => {
            expect(() => formBuilder.group([null])).toThrowError('field options not specified.');
            expect(() => formBuilder.group([undefined])).toThrowError('field options not specified.');
        });
        
        it('should throw when `key` is missing', () => {
            expect(() => formBuilder.group([{}])).toThrowError(`The field option 'key' is required...`);
        });
        
        it('should throw when `type` is missing', () => {
            expect(() => formBuilder.group([{key:'key1'}])).toThrowError(`The field option 'type' is required...`);
        });
        
        it(`should throw when type 'container' doesn't have any children`, () => {
            expect(() => formBuilder.group([{key:'key1', type:'container'}])).toThrowError(`The template type 'container' requires children fields`);
            
        });
        it(`should throw when a type contains children but is not a container`, () => {
            expect(() => formBuilder.group([{key:'key1', type:'someType', children:[{}]}])).toThrowError(`Only a 'container' type may have children fields`);
        });

        it('should return a MagicForm with magic controls properly links', () => {
            let form = formBuilder.group(options);
            expect(form).toEqual(jasmine.any(MagicForm));

            let key1_child3_child1 = form.getMagicControl('key1_child3_child1');
            let key1_child3_child2 = form.getMagicControl('key1_child3_child2');
            expect(key1_child3_child1._parent).toBe(key1_child3_child2._parent);
            expect(key1_child3_child1._parent.options.key).toBe('key1_child3');

            let key1_child1 = form.getMagicControl('key1_child1');
            expect(key1_child1._parent.options.key).toBe('key1');
        });

    });
});
