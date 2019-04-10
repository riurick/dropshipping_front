import { Observable } from 'rxjs';
import { HttpBackend, HttpRequest, HttpEvent } from '../../../../node_modules/@angular/common/http';

export declare abstract class XhrFactory {
    abstract build(): XMLHttpRequest;
}

export declare class CustExtBrowserXhr implements XhrFactory {
    constructor();
    build(): any;
}

export declare class HttpXhrBackend implements HttpBackend {
    private xhrFactory;
    constructor(xhrFactory: XhrFactory);
    /**
     * Process a request and return a stream of response events.
     */
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>>;
}
