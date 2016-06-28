import {Control} from "@angular/common";
import {Input, HostBinding} from "@angular/core";
import {Field} from "../magic_field.component";

export class BaseLayout {
    protected _field: Field<any, any>;
    public control: Control;

    constructor() {}

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
        return this._field && this._field.option.templateOptions.className || '';
    }
}

