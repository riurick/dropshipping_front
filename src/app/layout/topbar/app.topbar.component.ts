import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';




@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {
    activeIndex: number;


    constructor(public app: AppComponent) {

     }

    ngOnInit() {
    }


    getUser() {
    }

    logout(): void {
    }

}
