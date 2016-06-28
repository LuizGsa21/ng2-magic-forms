import {Input, HostBinding} from "@angular/core";
import {MagicField} from "../magic_field.component";


export class BaseTemplate {
    @Input('field')
    field: MagicField;

    @HostBinding('class')
    get className() {
        return this.field && this.field.option.className || '';
    }
}