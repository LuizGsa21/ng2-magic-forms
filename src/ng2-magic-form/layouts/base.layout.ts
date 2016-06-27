import {Control} from "@angular/common";
import {Input, OnInit, Component, HostBinding, ContentChild, ViewChild} from "@angular/core";
import {FormService} from "../services/form.service";
import {isFunction} from "../util";
import {Field} from "../templates/base";

export class BaseLayout {
    protected _field: Field<any, any>;
    public control: Control;

    constructor(protected formService: FormService) {}

    @Input('field')
    set field(field) {
        this._field = field;
        this.control = field.control;
    }
    get field() {
        return this._field;
    }

    @HostBinding('class')
    get className() {
        if (!this._field) return '';
        return this._field.templateOptions.className || '';
    }
}

