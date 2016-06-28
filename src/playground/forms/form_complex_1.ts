import {MagicValidators} from "../../ng2-magic-form/validators/index";
import {Control} from "@angular/common";
import {FormService} from "../../ng2-magic-form/services/form.service";
export let FormComplex1 = [
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
            label: 'Name of The New Amenity',
            type: 'text',
            description: 'eg Tanning, Free Towels, Sauna, VIP pass'
        }
    },
    {
        hostClassName: 'row',
        className: 'col-xs-12',
        key: 'amenityDetail',
        type: 'textarea',
        defaultValue: null,
        validators: [],
        templateOptions: {
            label: 'Amenity Description',
            placeholder: 'Optional',
            rows: 3
        }
    },
    {
        hostClassName: 'row',
        className: 'col-xs-12',
        key: 'showPriceOptions',
        type: 'radio',
        defaultValue: '1',
        templateOptions: {
            radios: [
                {value: '0', text: 'This amenity has no directly associated price'},
                {value: '1', text: 'This amenity has an associated price'},
            ]
        }
    },
    {
        hostClassName: 'row',
        key: 'priceContainer',
        type: 'container',
        hidden: (value: any, option: any, control: Control, form: FormService) => {
            return form.getControl('showPriceOptions').value == 0;
        },
        children: [
            {
                hostClassName: 'col-xs-12',
                key: 'priceAmenityInfo',
                type: 'div',
                templateOptions: {
                    html: `<strong>Note - Pricing for Amenities is a future enhancement to ClubReady, you can configure them now, the pricing is not currently implemented in the agreement process, it will be completed at a later date. Amenities are not sold on their own - they are always tied to sales package agreements. Any price is added on to the sales package price and the frequency of payment is the sales package frequency (most typically a $ charge every month - but dependant upon the sales package that grants the amenity)</strong>`
                }
            }
        ]
    },
    {
        hostClassName: 'row',
        key: 'discountId',
        type: 'select',
        defaultValue: '0',
        templateOptions: {
            className: 'col-xs-12',
            options: [
                {value: '0', text: 'Optional - Assign An Associated Discount Scheme This Amenity Will Include'},
                {value: '431', text: 'Member Referral'},
                {value: '471', text: '50% off all products'},
                {value: '4713', text: 'asdfasdf'},
                {value: '4715', text: 'New Scheme (corp) '}
            ]
        }
    },
]; 