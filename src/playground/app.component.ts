import {Component} from "@angular/core";
import {MagicForm} from "../ng2-magic-form/magic_form.component";
import {MagicValidators} from "../ng2-magic-form/validators/index";
import {FormRecursive1} from "./forms/form_recursive_1";
import {FormBasic1} from "./forms/form_basic_1";
// import {DynamicFormComponent} from "./dynamicForm";
// import {FormValidators, transformMessage} from "./dynamicForm/formValidators";
// import {Validators} from "@angular/common";
// import {IField} from "./dynamicForm/templates/base";
// import {TextareaField} from "./dynamicForm/templates/textareaField.template";
// import {InputField} from "./dynamicForm/templates/inputField.template";

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('./app.component.scss')],
    directives: [
        MagicForm
    ]
})
export class AppComponent {

    // fields: IField[];
    fields: any[];

    constructor () {
        this.fields = FormBasic1;
        // this.fields = FormRecursive1;

    }

    submit (event) {
        console.log(event);
    }
}