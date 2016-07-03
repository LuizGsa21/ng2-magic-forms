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
    OnInit,
    OnDestroy
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Form} from './form.service';
import {TemplateConfig} from './templates/templates';
import {
    isBlank,
    throwError,
    isEmpty,
    debug,
    normalizeBool
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
export class MagicField implements OnInit, OnDestroy {


    @ViewChild(ChildRef as Type)
    childRef: ChildRef;

    @Input('options')
    options: IOptionField;

    control: FormControl;

    errors: any[];

    parent: MagicField;
    children: MagicField[] = [];

    _hidden: boolean;
    // is true when any of its parents is hidden
    _isParentHidden: boolean;
    private isAfterViewInit;


    @HostBinding('style.display')
    get hideSelf() {
        return this.options.hidden ? 'none' : '';
    }

    get hidden(): boolean {
        // Always do a check before returning because the user may change the status at any given time.
        this.hidden = this.options.hidden;
        return this._isParentHidden ? true : this._hidden;
    }

    includeOrExclude() {
        // ignore all calls before afterViewInit
        if (!this.isAfterViewInit) return;
        if (this._isParentHidden || this._hidden) {
            this.form.removeControl(this.options.key);
        } else {
            this.form.registerControl(this.options.key, this.control);
        }
    }

    set hidden(value: boolean) {
        value = normalizeBool(value);
        if (value !== this._hidden) {
            this._hidden = value;
            this.includeOrExclude();
            this.notifyChildren();
        }
    }

    constructor (public form: Form, private _componentResolver: ComponentResolver, private templateConfig: TemplateConfig) {}

    ngOnInit () {
        debug('MagicField.ngOnInit()', this.options.key, this);
        this._initOptions();
        this._initControl();
        this._createView();
    }

    @HostBinding('class')
    get hostClassName () { return this.options.hostClassName || ''; }

    get templateOptions () { return this.options.templateOptions }
    
    get value() { return this.control.value }

    syncErrors() {
        this.errors = this.form.getControlErrors(this.options.key);
    }
    updateValue(value: any) {
        this.control.updateValue(value, {onlySelf: false});
    }

    parentStatusChanged() {
        if (this._isParentHidden == this.parent.hidden) {
            throwError('parentStatusChanged() was called but parent never changed.... you should report this bug.');
        }
        this._isParentHidden = this.parent.hidden;
        this.includeOrExclude();
    }

    notifyChildren() {
        if (isEmpty(this.children)) {
            return; // do nothing
        }
        this.children.forEach((field) => {
            field.parentStatusChanged();
            field.notifyChildren();
        });
    }

    ngAfterViewInit() {
        this.isAfterViewInit = true;
        setTimeout(() => this.notifyChildren());
    }

    onClick (event: any) { this._callEvent('onClick', event); }

    onBlur (event: any) { this._callEvent('onBlur', event); }

    onFocus (event: any) { this._callEvent('onFocus', event); }

    ngOnDestroy() {
        this.parent = null;
        this.children = null;
    }

    private _initOptions () {
        if (isBlank(this.options.type)) {
            debug(`The field option 'type' is missing:`, this.options);
            throwError(`The field option 'type' is required...`);
        }
        if (isBlank(this.options.key)) {
            debug(`The field option 'key' is missing:`, this.options);
            throwError(`The field option 'key' is required...`);
        }
        this.hidden = this.options.hidden = !!this.options.hidden;
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
                this.children.push(viewInstance);
                viewInstance.options = option;
                viewInstance.parent = this;
            });
        });
    }

    private _callEvent (eventName: string, value: any) {
        if (this.options[eventName]) {
            return this.options[eventName](value, this.control, this.options, this.form);
        }
    }
}