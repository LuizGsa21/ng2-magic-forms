import {MagicValidators} from "../../ng2-magic-form/validators/index";
export let FormBasic1 = [

    {
        hostClassName: 'row my-first-child-host',
        className: 'test root className',
        key: 'amenityName',
        type: 'input',
        defaultValue: null,
        validators: [
            MagicValidators.requiredTransform('A name for the new Amenity is required')
        ],
        templateOptions: {
            className: 'col-xs-12 test template className',
            label: 'Name of The New Amenity',
            type: 'text',
            description: 'eg Tanning, Free Towels, Sauna, VIP pass'
        }
    },
    {
        hostClassName: 'row',
        key: 'amenityDescription',
        type: 'textarea',
        defaultValue: null,
        validators: [],
        templateOptions: {
            className: 'col-xs-12',
            label: 'Amenity Description',
            placeholder: 'Optional',
            type: 'text'
        }
    },
    {
        hostClassName: 'row',
        key: 'myRadioButton',
        type: 'radio',
        defaultValue: '0',
        templateOptions: {
            className: 'col-xs-12',
            radios: [
                {value: '0', text: 'button 1'},
                {value: '1', text: 'button 3'},
                {value: '2', text: 'button 4'},
                {value: '3', text: 'button 5'},
            ]
        }
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
    {
        key: 'divDescription',
        type: 'div',
        hostClassName: 'row',
        className: 'some class',
        templateOptions: {
            className: 'col-xs-12',
            html: `<strong>Note - Pricing for Amentities is a future enhancement to ClubReady, you can configure them now, the pricing is not currently implemented in the agreement process, it will be completed at a later date. Amenities are not sold on their own - they are always tied to sales package agreements. Any price is added on to the sales package price and the frequency of payment is the sales package frequency (most typically a $ charge every month - but dependant upon the sales package that grants the amenity)</strong>`,
        }
    },
    {
        hostClassName: 'row',
        key: 'price',
        type: 'inputGroup',
        defaultValue: null,
        validators: [
            MagicValidators.requiredTransform('Price field is required.')
            // transformMessage(FormValidators.required, 'A name for the new Amenity is required')
        ],
        templateOptions: {
            leftSideClass: 'col-xs-6',
            rightSideClass: 'col-xs-6',
            label: 'Price',
            type: 'number',
            leftAddon: '$',
            description: 'eg Tanning, Free Towels, Sauna, VIP pass'
        }
    },
    {
        hostClassName: 'row',
        key: 'minPrice',
        type: 'inputGroup',
        defaultValue: null,
        validators: [
            // transformMessage(FormValidators.required, 'A name for the new Amenity is required')
        ],
        templateOptions: {
            leftSideClass: 'col-xs-6',
            rightSideClass: 'col-xs-6',
            label: 'Min Price',
            type: 'number',
            leftAddon: '$',
            // description: 'eg Tanning, Free Towels, Sauna, VIP pass'
        }
    },
    {
        hostClassName: 'row',
        key: 'maxPrice',
        type: 'inputGroup',
        defaultValue: null,
        validators: [
            // transformMessage(FormValidators.required, 'A name for the new Amenity is required')
        ],
        templateOptions: {
            leftSideClass: 'col-xs-6',
            rightSideClass: 'col-xs-6',
            label: 'Max Price',
            type: 'number',
            leftAddon: '$',
            rightAddon: '.00',
            description: 'eg Tanning, Free Towels, Sauna, VIP pass'
        }
    }
]; 