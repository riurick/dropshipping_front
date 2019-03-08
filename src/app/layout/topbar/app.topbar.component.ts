import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Router } from '../../../../node_modules/@angular/router';
import { AuthGuardService } from '../../services/auth-guard/auth-guard.service';
import { finalize } from '../../../../node_modules/rxjs/operators';




@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {
    activeIndex: number;


    constructor(
        public app: AppComponent,
        private authGuard: AuthGuardService,
        private http: HttpClient,
        private router: Router
    ) {
        //  this.authGuard.authenticate(undefined, undefined);
     }

    ngOnInit() {
    }

    login() {

    }

    getUser() {
    }

    logout(): void {
        this.http.post('logout', {}).pipe(finalize(() => {
            this.authGuard.authenticated = false;
            this.router.navigateByUrl('/login');
        })).subscribe();
    }

    authenticated() { return this.authGuard.authenticated; }

}
