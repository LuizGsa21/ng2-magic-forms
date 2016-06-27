import {Component} from "@angular/core";
import {BaseLayout} from "./base.layout";

@Component({
    selector: '[inlineLayout]',
    template: require('./inline.layout.html')
})
export class InlineLayout extends BaseLayout {}