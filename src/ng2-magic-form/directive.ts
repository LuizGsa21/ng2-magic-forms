import {Directive, ElementRef, OnInit, Input} from '@angular/core';
import {Observable} from "rxjs/Rx";
@Directive({
    selector: '[magicLoader]',
    inputs: [
        'key: translate'
    ]
})
export class MagicLoader {
    @Input('')
    key: string;

    constructor (private _element: ElementRef) {
        console.log('what');
    }

}
