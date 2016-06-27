import {enableProdMode} from "@angular/core";
import {HTTP_PROVIDERS} from "@angular/http";
import {AppComponent} from "./app.component";
import {bootstrap} from "@angular/platform-browser-dynamic";

if (process.env.ENV === 'production') {
    enableProdMode();
}

bootstrap(<Function>AppComponent, [HTTP_PROVIDERS])
    .catch((err: any) => console.error(err));