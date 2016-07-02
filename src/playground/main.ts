import {enableProdMode} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {AppComponent} from './app.component';

if (process.env.ENV === 'production') {
    enableProdMode();
}

bootstrap(<Function>AppComponent, [
    HTTP_PROVIDERS,
    disableDeprecatedForms(),
    provideForms()
]).catch((err: any) => console.error(err));