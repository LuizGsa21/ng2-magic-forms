import {Component} from "@angular/core";
import {MagicForm} from "../ng2-magic-form/magic_form.component";
import {MagicValidators} from "../ng2-magic-form/validators/index";
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
        // this.fields = [{
        //     hostClassName: 'col-xs-12',
        //     children: [
        //         {
        //             hostClassName: 'row',
        //             key: 'amenityName',
        //             type: 'input',
        //             defaultValue: null,
        //             validators: [
        //                 MagicValidators.requiredTransform('A name for the new Amenity is required')
        //             ],
        //             templateOptions: {
        //                 className: 'col-xs-12',
        //                 label: 'Name of The New Amenity',
        //                 type: 'text',
        //                 description: 'eg Tanning, Free Towels, Sauna, VIP pass'
        //             }
        //         },
        //         {
        //             hostClassName: 'row',
        //             key: 'amenityDescription',
        //             type: 'textarea',
        //             defaultValue: null,
        //             validators: [],
        //             templateOptions: {
        //                 className: 'col-xs-12',
        //                 label: 'Amenity Description',
        //                 placeholder: 'Optional',
        //                 type: 'text'
        //             }
        //         },
        //         {
        //             hostClassName: 'row',
        //             key: 'myRadioButton',
        //             type: 'radio',
        //             defaultValue: '0',
        //             templateOptions: {
        //                 className: 'col-xs-12',
        //                 radios: [
        //                     {value: '0', text: 'This amenity has no directly associated price'},
        //                     {value: '1', text: 'This amenity has an associated price'},
        //                 ]
        //             }
        //         },
        //         {
        //             hostClassName: 'row',
        //             key: 'discountId',
        //             type: 'select',
        //             defaultValue: '0',
        //             templateOptions: {
        //                 className: 'col-xs-12',
        //                 options: [
        //                     {value: '0', text: 'Optional - Assign An Associated Discount Scheme This Amenity Will Include'},
        //                     {value: '431', text: 'Member Referral'},
        //                     {value: '471', text: '50% off all products'},
        //                     {value: '4713', text: 'asdfasdf'},
        //                     {value: '4715', text: 'New Scheme (corp) '}
        //                 ]
        //             }
        //         }
        //     ]
        // }, {
        //     hostClassName: 'col-xs-12',
        //     children: [
        //         {
        //             key: 'divDescription',
        //             type: 'div',
        //             hidden: true,
        //             hostClassName: 'row',
        //             templateOptions: {
        //                 className: 'col-xs-12',
        //                 html: `<strong>Note - Pricing for Amentities is a future enhancement to ClubReady, you can configure them now, the pricing is not currently implemented in the agreement process, it will be completed at a later date. Amenities are not sold on their own - they are always tied to sales package agreements. Any price is added on to the sales package price and the frequency of payment is the sales package frequency (most typically a $ charge every month - but dependant upon the sales package that grants the amenity)</strong>`,
        //             }
        //         },
        //         {
        //             hostClassName: 'row',
        //             key: 'price',
        //             type: 'inputGroup',
        //             defaultValue: null,
        //             validators: [
        //                 // transformMessage(FormValidators.required, 'A name for the new Amenity is required')
        //             ],
        //             templateOptions: {
        //                 className: 'col-xs-12',
        //                 label: 'Price',
        //                 type: 'number',
        //                 leftAddon: '$',
        //                 // description: 'eg Tanning, Free Towels, Sauna, VIP pass'
        //             }
        //         },
        //         {
        //             hostClassName: 'row',
        //             key: 'minPrice',
        //             type: 'inputGroup',
        //             defaultValue: null,
        //             validators: [
        //                 // transformMessage(FormValidators.required, 'A name for the new Amenity is required')
        //             ],
        //             templateOptions: {
        //                 className: 'col-xs-12',
        //                 label: 'Min Price',
        //                 type: 'number',
        //                 leftAddon: '$',
        //                 // description: 'eg Tanning, Free Towels, Sauna, VIP pass'
        //             }
        //         },
        //         {
        //             hostClassName: 'row',
        //             key: 'maxPrice',
        //             type: 'inputGroup',
        //             defaultValue: null,
        //             validators: [
        //                 // transformMessage(FormValidators.required, 'A name for the new Amenity is required')
        //             ],
        //             templateOptions: {
        //                 className: 'col-xs-12',
        //                 label: 'Max Price',
        //                 type: 'number',
        //                 leftAddon: '$',
        //                 // description: 'eg Tanning, Free Towels, Sauna, VIP pass'
        //             }
        //         }
        //
        //
        //     ]
        // }];
        // this.fields = [{
        //     hostClassName: 'col-xs-12 my-container',
        //     type: 'container',
        //     key: 'container1',
        //     defaultValue: null,
        //     validators: [],
        //
        //     children: [
        //         {
        //             hostClassName: 'row my-first-child-host',
        //             key: 'amenityName',
        //             type: 'input',
        //             defaultValue: null,
        //             validators: [
        //                 MagicValidators.requiredTransform('A name for the new Amenity is required')
        //             ],
        //             templateOptions: {
        //                 className: 'col-xs-12',
        //                 label: 'Name of The New Amenity',
        //                 type: 'text',
        //                 description: 'eg Tanning, Free Towels, Sauna, VIP pass'
        //             }
        //         },
        //         {
        //             hostClassName: 'row',
        //             key: 'amenityDescription',
        //             type: 'textarea',
        //             defaultValue: null,
        //             validators: [],
        //             templateOptions: {
        //                 className: 'col-xs-12',
        //                 label: 'Amenity Description',
        //                 placeholder: 'Optional',
        //                 type: 'text'
        //             }
        //         },
        //         {
        //             hostClassName: 'row',
        //             key: 'myRadioButton',
        //             type: 'radio',
        //             defaultValue: '0',
        //             templateOptions: {
        //                 className: 'col-xs-12',
        //                 radios: [
        //                     {value: '0', text: 'This amenity has no directly associated price'},
        //                     {value: '1', text: 'This amenity has an associated price'},
        //                 ]
        //             }
        //         },
        //         {
        //             hostClassName: 'row',
        //             key: 'discountId',
        //             type: 'select',
        //             defaultValue: '0',
        //             templateOptions: {
        //                 className: 'col-xs-12',
        //                 options: [
        //                     {value: '0', text: 'Optional - Assign An Associated Discount Scheme This Amenity Will Include'},
        //                     {value: '431', text: 'Member Referral'},
        //                     {value: '471', text: '50% off all products'},
        //                     {value: '4713', text: 'asdfasdf'},
        //                     {value: '4715', text: 'New Scheme (corp) '}
        //                 ]
        //             }
        //         }
        //     ]
        // }]
        this.fields = [
            {
                hostClassName: 'row',
                className: 'col-xs-12',
                key: 'amenityName',
                type: 'input',
                defaultValue: null,
                validators: [
                    MagicValidators.requiredTransform('A name for the new Amenity is required')
                ],
                templateOptions: {
                    className: 'col-xs-12',
                    label: 'Name of The New Amenity',
                    type: 'text',
                    description: 'eg Tanning, Free Towels, Sauna, VIP pass'
                }
            },
            {
                hostClassName: 'row my-seconf-child-host',
                className: 'col-xs-12',
                key: 'amenityName2',
                type: 'input',
                defaultValue: null,
                validators: [
                    MagicValidators.requiredTransform('A name for the new Amenity is required')
                ],
                templateOptions: {
                    className: 'col-xs-12',
                    label: 'Name of The New Amenity',
                    type: 'text',
                    description: 'eg Tanning, Free Towels, Sauna, VIP pass'
                }
            },
            // {
            //     hostClassName: 'row',
            //     key: 'amenityDescription',
            //     type: 'textarea',
            //     defaultValue: null,
            //     validators: [],
            //     templateOptions: {
            //         className: 'col-xs-12',
            //         label: 'Amenity Description',
            //         placeholder: 'Optional',
            //         type: 'text'
            //     }
            // },
            // {
            //     hostClassName: 'row',
            //     key: 'myRadioButton',
            //     type: 'radio',
            //     defaultValue: '0',
            //     templateOptions: {
            //         className: 'col-xs-12',
            //         radios: [
            //             {value: '0', text: 'This amenity has no directly associated price'},
            //             {value: '1', text: 'This amenity has an associated price'},
            //         ]
            //     }
            // },
            // {
            //     hostClassName: 'row',
            //     key: 'discountId',
            //     type: 'select',
            //     defaultValue: '0',
            //     templateOptions: {
            //         className: 'col-xs-12',
            //         options: [
            //             {value: '0', text: 'Optional - Assign An Associated Discount Scheme This Amenity Will Include'},
            //             {value: '431', text: 'Member Referral'},
            //             {value: '471', text: '50% off all products'},
            //             {value: '4713', text: 'asdfasdf'},
            //             {value: '4715', text: 'New Scheme (corp) '}
            //         ]
            //     }
            // }
        ]

    }
    
    submit(event) {
        console.log(event);
    }
}