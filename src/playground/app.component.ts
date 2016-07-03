import {Component} from '@angular/core';
import {MagicForm} from '../ng2-magic-form/magic_form.component';
import {FormComplex1} from './forms/form_complex_1';
import {TemplateConfig} from '../ng2-magic-form/templates/templates';

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('./app.component.scss')],
    directives: [
        MagicForm
    ],
    providers: [
        TemplateConfig
    ]
})
export class AppComponent {

    formOptions: any[];

    constructor () {
        this.formOptions = FormComplex1;
    }

    submit (event) {
        console.log(event);
    }
}