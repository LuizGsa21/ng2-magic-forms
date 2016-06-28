import {MagicValidators} from "../../ng2-magic-form/validators/index";
export let FormRecursive1 = [
    {
        key: 'container',
        type: 'container',
        hostClassName: 'my-container hostClassName',
        // containers don't have className property
        // className: 'row my-container2 className',
        children: [
            {
                hostClassName: 'row amenityName hostClassName',
                className: 'col-xs-12 amenityName className',
                key: 'amenityName',
                type: 'input',
                defaultValue: null,
                validators: [
                    MagicValidators.requiredTransform('A name for the new Amenity is required')
                ],
                templateOptions: {
                    className: 'amenityName templateOptions.className',
                    label: 'Name of The New Amenity',
                    type: 'text',
                    description: 'eg Tanning, Free Towels, Sauna, VIP pass'
                }
            },
            {
                hostClassName: 'row amenityName2 hostClassName',
                className: 'col-xs-12 amenityName2 className',
                key: 'amenityName2',
                type: 'input',
                defaultValue: null,
                validators: [
                    MagicValidators.requiredTransform('A name for the new Amenity is required')
                ],
                templateOptions: {
                    className: 'amenityName2 templateOptions.className',
                    label: 'Name of The New Amenity',
                    type: 'text',
                    description: 'eg Tanning, Free Towels, Sauna, VIP pass'
                }
            },
            {
                key: 'container2',
                type: 'container',
                hostClassName: 'row my-container2 hostClassName',
                // containers don't have className property
                // className: 'row my-container2 className',
                children: [{
                    hostClassName: 'col-xs-12 amenityName3 hostClassName',
                    className: 'row amenityName3 className',
                    key: 'amenityName3',
                    type: 'input',
                    defaultValue: null,
                    validators: [
                        MagicValidators.requiredTransform('A name for the new Amenity is required')
                    ],
                    templateOptions: {
                        className: 'col-xs-12 amenityName3 templateOptions.className',
                        label: 'Name of The New Amenity',
                        type: 'text',
                        description: 'eg Tanning, Free Towels, Sauna, VIP pass'
                    }
                },
                    {
                        hostClassName: 'col-xs-12 amenityName4 hostClassName',
                        className: 'row amenityName4 className',
                        key: 'amenityName4',
                        type: 'input',
                        defaultValue: null,
                        validators: [
                            MagicValidators.requiredTransform('A name for the new Amenity is required')
                        ],
                        templateOptions: {
                            className: 'col-xs-12 amenityName4 templateOptions.className',
                            label: 'Name of The New Amenity',
                            type: 'text',
                            description: 'eg Tanning, Free Towels, Sauna, VIP pass'
                        }
                    }]
            }
        ]
    }
]; 