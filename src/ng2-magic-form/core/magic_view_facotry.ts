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
import {
    isBlank,
    throwError,
    debug
} from '../util';
import {MagicControl} from './magic_control';
import {TemplateConfig} from './template_config';


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
export class MagicControlFactory implements OnInit {


    @Input('field')
    field: MagicControl;

    @ViewChild(ChildRef as Type)
    childRef: ChildRef;

    @HostBinding('style.display')
    get hideSelf() { return this.field.isSelfHidden ? 'none' : '' }

    @HostBinding('class')
    get hostClassName () { return this.field.hostClassName; }

    constructor (private _componentResolver: ComponentResolver, private templateConfig: TemplateConfig) {}

    ngOnInit () {
        if (isBlank(this.field)) {
            throwError(`MagicControl field is missing...`)
        }
        debug('MagicField.ngOnInit()', this.field.key, this);
        this._createView();
    }

    private _createView () {
        if (this.field.type === 'container') {
            return this._createContainer(this.field._children);
        } else {
            let component = this.templateConfig._getTemplateComponent(this.field.type);
            if (isBlank(component)) {
                throwError(`Template type '${this.field.type}' does not exist.`);
            }
            this._createTemplate(component);
        }
    }

    private _createTemplate (component: Function) {
        return this._componentResolver.resolveComponent(component).then((componentFactory: ComponentFactory<any>) => {
            let view = this.childRef.viewContainer.createComponent(componentFactory);
            view.instance.field = this.field;
        });
    }

    private _createContainer (children: MagicControl[]) {
        return children.map((child) => {
            return this._componentResolver.resolveComponent(MagicControlFactory as Type).then((componentFactory: ComponentFactory<any>) => {
                let viewInstance = this.childRef.viewContainer.createComponent(componentFactory).instance as MagicControlFactory;
                viewInstance.field = child;
            });
        });
    }
}