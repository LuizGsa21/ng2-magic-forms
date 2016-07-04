import {MagicValidators} from '../../ng2-magic-form/validators/index';
import {MagicControl} from '../../ng2-magic-form/magic_control';
export let FormComplex1 = [
    /**
     * Amenity Name
     */
    {
        hostClassName: 'col-xs-12 hostClassName',
        templateClassName: 'row templateClassName',
        layoutClassName: 'col-xs-12 layoutClassName',

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
    /**
     * Amenity Description
     */
    {
        hostClassName: 'col-xs-12 hostClassName',
        templateClassName: 'row templateClassName',
        layoutClassName: 'col-xs-12 layoutClassName',

        key: 'amenityDescription',
        type: 'textarea',
        defaultValue: null,
        validators: [],
        
        templateOptions: {
            label: 'Amenity Description',
            placeholder: 'Optional',
            rows: 3
        }
    },

    /**
     * Show price options
     */
    {
        hostClassName: 'col-xs-12 hostClassName',
        templateClassName: 'row templateClassName',
        layoutClassName: 'col-xs-12 layoutClassName',

        key: 'showPriceOptions',
        type: 'radio',
        defaultValue: '0',

        onClick(radio: any, magic: MagicControl, event: MouseEvent) {
            let control = magic.findMagicControl('container1');
            console.log(radio.value, 'radio value', control);
            if (radio.value == '0') {
                control.options.hidden = true;
            } else {
                control.options.hidden = false;
            }
            console.log('control.options.hidden', control.options.hidden);
        },

        templateOptions: {
            radios: [
                {value: '0', text: 'This amenity has no directly associated price'},
                {value: '1', text: 'This amenity has an associated price'},
            ]
        }
    },
    /**
     * Price Container
     */
    {
        hostClassName: 'col-xs-12 container1 hostClassName',
        templateClassName: 'row templateClassName',
        layoutClassName: 'col-xs-12 layoutClassName',

        key: 'container1',
        type: 'container',

        hidden: true,

        children: [
            /**
             * Amenity Price info
             */
            {
                hostClassName: 'col-xs-12 hostClassName',
                templateClassName: 'row templateClassName',
                layoutClassName: 'col-xs-12 layoutClassName',

                key: 'priceAmenityInfo',
                type: 'div',

                templateOptions: {
                    html: `<strong>Note - Pricing for Amenities is a future enhancement to ClubReady, you can configure them now, the pricing is not currently implemented in the agreement process, it will be completed at a later date. Amenities are not sold on their own - they are always tied to sales package agreements. Any price is added on to the sales package price and the frequency of payment is the sales package frequency (most typically a $ charge every month - but dependant upon the sales package that grants the amenity)</strong>`
                }
            },
            /**
             * Amenity Price
             */
            {
                // hostClassName: 'col-xs-12 hostClassName',
                templateClassName: 'row templateClassName',
                layoutClassName: 'col-xs-12 layoutClassName',

                key: 'price',
                type: 'inputGroup',
                defaultValue: null,
                validators: [
                    MagicValidators.requiredWhen('showPriceOptions', 'Price field is required.')
                ],

                templateOptions: {
                    leftSideClass: 'col-xs-4',
                    rightSideClass: 'col-xs-4',
                    label: 'Price',
                    type: 'number',
                    leftAddon: '$'
                }
            },
            /**
             * Amenity min price
             */
            {
                // hostClassName: 'col-xs-12 hostClassName',
                templateClassName: 'row templateClassName',
                layoutClassName: 'col-xs-12 layoutClassName',

                key: 'minPrice',
                type: 'inputGroup',
                defaultValue: null,
                validators: [
                    MagicValidators.lessThanTransform('price', 'This must be less than the "Price" if entered.')
                ],

                templateOptions: {
                    leftSideClass: 'col-xs-4',
                    rightSideClass: 'col-xs-4',
                    label: 'Optional Min Price',
                    type: 'number',
                    leftAddon: '$',
                    description: '(ability to edit price is a permission)'
                }
            },
            /**
             * Aminity max price
             */
            {
                // hostClassName: 'col-xs-12 hostClassName',
                templateClassName: 'row templateClassName',
                layoutClassName: 'col-xs-12 layoutClassName',

                key: 'maxPrice',
                type: 'inputGroup',
                defaultValue: null,
                validators: [
                    MagicValidators.greaterThanTransform('price', 'This must be greater than the "Price" if entered.')
                ],

                templateOptions: {
                    leftSideClass: 'col-xs-4',
                    rightSideClass: 'col-xs-4',
                    label: 'Optional Max Price',
                    type: 'number',
                    leftAddon: '$',
                    description: '(ability to edit price is a permission)'
                }
            },
        ]
    },
    {
        // hostClassName: 'col-xs-12 hostClassName',
        templateClassName: 'row templateClassName',
        layoutClassName: 'col-xs-12 layoutClassName',

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