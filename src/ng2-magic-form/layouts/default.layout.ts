import {Component} from "@angular/core";
import {BaseLayout} from "./base.layout";

@Component({
    selector: '[defaultLayout]',
    template: require('./default.layout.html')
})
export class DefaultLayout extends BaseLayout {}