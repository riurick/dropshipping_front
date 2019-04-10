import { Injectable } from '../../../../node_modules/@angular/core';
import { BrowserXhr } from '@angular/http';

@Injectable()
export class ExtBrowser extends BrowserXhr {
    constructor() {
        super();
    }
    build(): any {
        const browser = super.build();
        browser.withCredentials = true;
        return <any>(browser);
    }
}
