import {
    Input,
    OnInit
} from '@angular/core';
import {MagicControl} from '../magic_control';
import {
    isBlank,
    throwError
} from '../../util';
/**
 * Base class of all fields.
 */
export abstract class Field implements OnInit {
    
    field: MagicControl;

    ngOnInit() { this.checkTemplateOptions(); }
    
    
    protected checkTemplateOptions() {
        if (isBlank(this.field)) {
            this.throwError('field is required');
        }
        if (isBlank(this.field.templateOptions)) {
            this.throwError('templateOptions is required.');
        }
    }
    
    protected throwError(message) {
        throwError(`${this.constructor.name}: ${message}`);
    }

}