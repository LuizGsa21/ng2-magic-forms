import {
    Component,
    Input,
    OnInit,
    ComponentResolver,
    ComponentFactory,
    Directive,
    ViewContainerRef,
    ViewChild,
    Type,
    HostBinding,
    OnDestroy
} from "@angular/core";
import {throwError} from "rxjs/util/throwError";
import {FieldTemplates} from "./templates/templates";
import {isArray, isFunction, isEmpty} from "./util";
import {FormService} from "./services/form.service";
import {Control, ControlGroup} from "@angular/common";
import {MagicControl} from "./models/magic_control";


/**
 * Hack used to get reference of parent view.
 * Used by MagicField to inject fields dynamically.
 * @internal
 */
@Directive({
    selector: '[childRef]',
    // styles: [`:host { display: none; }`]
})
export class ChildRef {
    constructor (public viewContainer: ViewContainerRef) {}
}


/**
 * All templates/layouts must support these fields.
 */
export interface IField {
    // magic field class
    hostClassName?: string;
    // template root class
    className?: string;
    key: string;
    type: string;
    hidden?: any;
    validators?: any[];
    defaultValue?: any;
    children?: IField[];

    // custom fields used by templates/layouts
    templateOptions?: any;

    // events
    valueChanges: any;
    onClick: any;
    onBlur: any;
    onFocus: any;
}

export class Field<T extends IField, U> implements OnInit, OnDestroy {

    private _hostClassName = '';

    @HostBinding('class')
    set hostClassName(value) {
        this._hostClassName = value;
    }

    get hostClassName() {
        let className = this._hostClassName || '';
        return this.hidden ? className + ' hidden' : className;
    }

    @Input('option')
    option: T;

    templateOptions: U;

    control: Control;

    errors: any[];

    @ViewChild(ChildRef as Type)
    childRef: ChildRef;

    self: this;

    constructor(protected formService: FormService) {
        this.self = this;
    }

    /**
     * If your template uses transclusion this should always return true. Otherwise override this getter and return false.
     * NOTE: when overriding, YOU HAVE TO USE A GETTER. We use the Classes prototype when validating.
     *
     * When a field does not use transclusion, its creation process is wrapped in a setTimeout call.
     * This is required for the fields to maintain their order when rendered.
     * @returns {boolean}
     */
    get usesTransclusion() {
        return true;
    }

    ngOnInit() {
        this.initOptions();
        this.initControl();
        this.registerListeners();
    }

    initOptions () {
        this.hostClassName = this.option.hostClassName || '';
        this.templateOptions = this.option.templateOptions;
    }

    initControl() {
        this.control = this.formService.createControl(this.option);
    }
    
    syncErrors() {
        this.errors = this.formService.getControlErrors(this.option.key);
    }

    registerListeners() {
        this.control.valueChanges.subscribe((value) => {
            this.syncErrors();
            this._callEvent('valueChanges', value);
        });
    }

    _callEvent(eventName: string, value: any) {
        if (this.option[eventName]) {
            return this.option[eventName](value, this.option, this.control, this.formService);
        }
    }

    onClick(event: any) {
        this._callEvent('onClick', event);
    }

    onBlur(event: any) {
        this._callEvent('onBlur', event);
    }

    onFocus(event: any) {
        this._callEvent('onFocus', event);
    }

    get hidden() {
        let hidden = this.option.hidden;
        if (isFunction(hidden)) {
            return this._callEvent('hidden', this.control.value);
        } else {
            return hidden;
        }
    }


    updateControl(value) {
        this.control.updateValue(value, {onlySelf: false, emitEvent: true, emitModelToViewChange: true});
    }

    ngOnDestroy() {
        this.self = null;
    }
}


@Component({
    selector: 'magicField',
    directives: [
        ChildRef
    ],
    template: `<div childRef></div>`
})
export class MagicField extends Field<any, any> implements OnInit {

    constructor (protected formService: FormService, protected componentResolver: ComponentResolver) {
        super(formService);
    }

    ngOnInit () {
        if (!this.option) { throwError('Ahhh! no magic field option was found.'); }
        // initialize option, control and listeners
        super.ngOnInit();
        if (this.option.type == 'container') {
            this._createContainer(this.option.children);
        } else {
            let fieldConstructor = FieldTemplates[this.option.type];
            if (!fieldConstructor) {
                throwError(`Template type '${this.option.type}' does not existt.`);
            }
            this._createTemplate(fieldConstructor);
        }
    }

    _createTemplate (component: Function) {
        return this.componentResolver.resolveComponent(component).then((componentFactory: ComponentFactory<any>) => {
            let view = this.childRef.viewContainer.createComponent(componentFactory);
            view.instance.field = this.self;
        });
    }

    private _createContainer (children: IField[]) {
        if (isEmpty(children)) {
            throwError('Container type requires children elements');
        }
        return children.map((option) => {
            return this.componentResolver.resolveComponent(MagicField as Type).then((componentFactory: ComponentFactory<any>) => {
                let viewInstance = this.childRef.viewContainer.createComponent(componentFactory).instance;
                viewInstance.option = option;
                // A container sets its children's parent after the view has been initialized
                setTimeout(() => this._setMagicParent(viewInstance));
            });
        });
    }

    private _setMagicParent(viewInstance: any) {
        if (!viewInstance.control) {
            throwError(`Ahhh! The view's control hasn't been created. You should report this bug.`);
        }
        viewInstance.control.magicParent = this.control;
    }
}