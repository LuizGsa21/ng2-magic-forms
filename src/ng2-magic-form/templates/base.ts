import {Input, OnInit, Component, HostBinding, ElementRef, OnDestroy} from "@angular/core";
import {Control} from "@angular/common";
import {FormService} from "../services/form.service";

/**
 * All templates/layouts must support these fields.
 */
export interface IField {
    hostClassName?: string;
    key: string;
    type: string;
    hidden?: any;
    validators?: any[];
    defaultValue?: any;
    fieldGroup?: any[];
    // custom fields used by templates/layouts
    templateOptions?: any;
}

export class Field<T extends IField, U> implements OnInit, OnDestroy {

    @HostBinding('class')
    hostClassName: string;

    @Input('option')
    option: T;

    templateOptions: U;

    control: Control;
    errors: any[];

    self: this;

    constructor(protected formService: FormService) { this.self = this; }

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
        this.syncErrors();
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
        this.control.valueChanges.subscribe(() => this.syncErrors());
    }

    updateControl(value) {
        this.control.updateValue(value, {onlySelf: false, emitEvent: true, emitModelToViewChange: true});
    }

    ngOnDestroy() {
        this.self = null;
    }
}