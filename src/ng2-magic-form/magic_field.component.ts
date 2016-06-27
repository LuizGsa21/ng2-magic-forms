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
    HostBinding
} from "@angular/core";
import {throwError} from "rxjs/util/throwError";
import {FieldTemplates} from "./templates/templates";
import {IField} from "./templates/base";


/**
 * Hack used to get reference of parent view.
 * Used by MagicField to inject fields dynamically.
 * @internal
 */
@Directive({
    selector: '[childRef]'
})
class ChildRef {
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

    @Input('option')
    option: IField;

    @ViewChild(ChildRef as Type)
    childRef: ChildRef;

    @HostBinding('class')
    hostClassName: string;

    constructor (protected componentResolver: ComponentResolver) {}

    ngOnInit () {
        let options;
        if (this.option.fieldGroup) {
            options = this.option.fieldGroup;
            this.hostClassName = this.option.hostClassName || '';
        } else {
            options = [this.option];
            this.hostClassName = '';
        }
        this.createTemplates(options);

    }

    createTemplates (options: IField[]) {
        console.log(options);
        options.forEach((option) => this.createTemplate(option));
    }

    createTemplate (option: IField) {
        let fieldConstructor = FieldTemplates[option.type];
        if (!fieldConstructor) {
            throwError(`Template type '${option.type}' does not exit.`);
        }
        let usesTransclusion = fieldConstructor.prototype.usesTransclusion;
        if (usesTransclusion) {
            this._createTemplate(fieldConstructor, option);
        } else {
            setTimeout(() => this._createTemplate(fieldConstructor, option))
        }
    }

    _createTemplate (component: Function, option: IField) {
        console.debug('createTemplate() type:', option.type, 'options:', option);
        this.componentResolver.resolveComponent(component).then((componentFactory: ComponentFactory<any>) => {
            let view = this.childRef.viewContainer.createComponent(componentFactory);
            view.instance.option = option;
        });
    }
}