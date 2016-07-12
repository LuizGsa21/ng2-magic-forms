import {
    isEmpty,
    throwError,
    isFunction,
    isString
} from '../util';
import {Injectable} from '@angular/core';
import {InputField} from './fields/input';
import {TextAreaField} from './fields/textarea';
import {SelectField} from './fields/select';
import {InputDefaultTemplate} from '../templates/default/_layout';
// import {InputDefaultTemplate} from './default/input';
// import {TextareaDefaultTemplate} from './default/textarea';
// import {SelectDefaultTemplate} from './default/select';
// import {RadioDefaultTemplate} from './default/radio';
// import {DivDefaultTemplate} from './default/div';
// import {InputGroupInlineTemplate} from './two_column/input_group';

@Injectable()
export class TemplateConfig {

    templates: any = {
        input: InputDefaultTemplate,
        textarea: TextAreaField,
        select: SelectField,
        // radio: RadioDefaultTemplate,
        // div: DivDefaultTemplate,
        // inputGroup: InputGroupInlineTemplate
    };

    setType(config: {name: string, component: any}) {
        if (isEmpty(config)) {
            throwError('A config object is required.');
        } else if (!isString(config.name)) {
            throwError('Template name must be a string');
        } else if (!isFunction(config.component)) {
            throwError('Template component must be a function.');
        }
        if (this.templates[config.name]) {
            console.info('Template', config.name, 'has been overridden.')
        }
        this.templates[config.name] = config.component;
    }

    /** @internal */
    _getTemplateComponent(name: string) { return this.templates[name] || null; }
}