import {Control} from "@angular/common";
import {Input, OnInit, Component, HostBinding, ContentChild, ViewChild} from "@angular/core";
import {FormService} from "../services/form.service";
import {isFunction} from "../util";
import {Field} from "../templates/base";

export class BaseLayout {
    protected _field: Field<any, any>;
    protected _control: Control;

    constructor(protected formService: FormService) {}

    @Input('field')
    set field(field) {
        this._field = field;
        this._control = field.control;
    }
    get field() {
        return this._field;
    }

    @HostBinding('class')
    get className() {
        if (!this._field) return '';
        return this._field.templateOptions.className || '';
    }

    get hidden() {
        if (!this._field) {
            return false;
        }
        let hidden = this._field.option.hidden;
        if (isFunction(hidden)) {
            return hidden(this._control, this._field.option, this.formService);
        } else {
            return hidden;
        }
    }
}

