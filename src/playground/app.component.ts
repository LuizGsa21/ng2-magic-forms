import {Component} from '@angular/core';
import {
    MagicForm
} from '../ng2-magic-form/core/magic_form';
import {MagicFormBuilder} from '../ng2-magic-form/core/magic_form_builder';
import {
    MAGIC_FORM_PROVIDERS,
    MAGIC_FORM_DIRECTIVES
} from '../ng2-magic-form/index';

@Component({
    selector: 'app',
    directives: [
        MAGIC_FORM_DIRECTIVES,
    ],
    providers: [
        MAGIC_FORM_PROVIDERS
    ],
    template: require('./app.component.html'),
    styles: [require('./app.component.scss')],
})
export class AppComponent {

    form: MagicForm;
    
    constructor (private _formBuilder: MagicFormBuilder) {
        
    }
    
    ngOnInit() {
        this.form = this._formBuilder.group([
            {
                key: 'username',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'my damn label'
                }
            },
            {
                key: 'description',
                type: 'textarea',
                templateOptions: {}
            },
            {
                key: 'sex',
                type: 'select',
                defaultValue: 'male',
                templateOptions: {
                    options: [
                        {value: 'male', text: 'Male'},
                        {value: 'female', text: 'Female'}
                    ]
                }
            }
        ]);
    }

    submit (event) {
        console.log(event);
    }
}