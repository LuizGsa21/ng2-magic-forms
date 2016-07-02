import {
    ViewContainerRef,
    Directive,
    Component,
    Input,
    HostBinding,
    ComponentResolver,
    Type,
    ViewChild,
    ComponentFactory,
    OnInit
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Form} from './form.service';
import {TemplateConfig} from './templates/templates';
import {
    isBlank,
    throwError,
    isEmpty,
    debug
} from './util';


export interface IOptionField {

    key: string;
    type: string;

    hostClassName?: string;
    layoutClassName?: string;
    templateClassName?: string;

    hidden?: any;
    validators?: any[];
    defaultValue?: any;
    children?: IOptionField[];

    /**
     * Options defined by template and layout.
     */
    templateOptions?: any;

    /**
     * Field events
     */
    valueChanges: any;
    onClick: any;
    onBlur: any;
    onFocus: any;
}

/**
 * Hack used to get reference of parent view.
 * Used by MagicField to inject fields dynamically.
 * @internal
 */
@Directive({
    selector: '[childRef]',
})
export class ChildRef {
    constructor (public viewContainer: ViewContainerRef) {
    }
}

@Component({
    selector: 'magicField',
    directives: [
        ChildRef
    ],
    template: `<div childRef></div>`
})
export class MagicField implements OnInit {

    /** @internal */
    _parent: MagicField;
    /** @internal */
    _children: MagicField[] = [];

    control: FormControl;

    @ViewChild(ChildRef as Type)
    childRef: ChildRef;

    @Input('options')
    options: IOptionField;

    errors: any[];

    constructor (public form: Form, private _componentResolver: ComponentResolver, private templateConfig: TemplateConfig) {}

    ngOnInit () {
        debug('MagicField.ngOnInit()', this.options.key, this);
        this._initOptions();
        this._initControl();
        this._createView();
    }

    @HostBinding('class')
    get hostClassName () {
        return this.options.hostClassName || '';
        // let className = this._hostClassName || '';
        // return this.hidden ? className + ' hidden' : className;
    }

    get templateOptions () { return this.options.templateOptions }
    
    get value() { return this.control.value }

    private _initOptions () {
        if (isBlank(this.options.type)) {
            debug(`The field option 'type' is missing:`, this.options);
            throwError(`The field option 'type' is required...`);
        }
        if (isBlank(this.options.key)) {
            debug(`The field option 'key' is missing:`, this.options);
            throwError(`The field option 'key' is required...`);
        }
    }

    private _initControl () {
        if (isBlank(this.options)) {
            throwError('field options not specified.')
        }
        this.control = this.form.createControl(this.options);
        this.syncErrors();
        this.control.valueChanges.subscribe(() => {
            debug('valueChanges controlName:', this.options.key);
            this.syncErrors();
        });
    }

    syncErrors() {
        this.errors = this.form.getControlErrors(this.options.key);
    }
    updateValue(value: any) {
        this.control.updateValue(value, {onlySelf: false});
    }

    private _createView () {
        if (this.options.type === 'container') {
            if (isEmpty(this.options.children)) {
                throwError(`The template type 'container' requires children fields`);
            }
            return this._createContainer(this.options.children);
        } else {
            let component = this.templateConfig._getTemplateComponent(this.options.type);
            if (isBlank(component)) {
                throwError(`Template type '${this.options.type}' does not exist.`);
            }
            this._createTemplate(component);
        }
    }

    private _createTemplate (component: Function) {
        return this._componentResolver.resolveComponent(component).then((componentFactory: ComponentFactory<any>) => {
            let view = this.childRef.viewContainer.createComponent(componentFactory);
            view.instance.field = this;
        });
    }

    private _createContainer (children: IOptionField[]) {
        return children.map((option) => {
            return this._componentResolver.resolveComponent(MagicField as Type).then((componentFactory: ComponentFactory<any>) => {
                let viewInstance = this.childRef.viewContainer.createComponent(componentFactory).instance as MagicField;
                this._children.push(viewInstance);
                viewInstance.options = option;
                viewInstance._parent = this;
            });
        });
    }

    private _callEvent (eventName: string, value: any) {
        if (this.options[eventName]) {
            return this.options[eventName](value, this.control, this.options, this.form);
        }
    }

    onClick (event: any) { this._callEvent('onClick', event); }

    onBlur (event: any) { this._callEvent('onBlur', event); }

    onFocus (event: any) { this._callEvent('onFocus', event); }

}