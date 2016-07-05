import {Component} from '@angular/core';
import {MagicFormComponent} from '../ng2-magic-form/magic_form.component';
import {FormOptions1} from './forms/form_1';
import {FormOptions2} from './forms/form_2';
import {TemplateConfig} from '../ng2-magic-form/templates/templates';

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('./app.component.scss')],
    directives: [
        MagicFormComponent
    ],
    providers: [
        TemplateConfig
    ]
})
export class AppComponent {

    formOptions1: any[];
    formOptions2: any[];

    constructor () {
        this.formOptions1 = FormOptions1;
        this.formOptions2 = FormOptions2;
    }

    submit (event) {
        console.log(event);
    }
}