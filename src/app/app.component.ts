import { Component, OnInit, Injectable } from '@angular/core';
import { HTTPStatus } from './services/RxJS/HTTPStatus.service';
import { expressionType } from '../../node_modules/@angular/compiler/src/output/output_ast';
import { HttpInterceptor, HttpRequest, HttpHandler } from '../../node_modules/@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  loading = false;

  activeTopbarItem: Element;
  topbarMenuActive: boolean;
  topbarMenuClick: boolean;
  sidebarActive: boolean;
  topbarMenuButtonClick: boolean;

  constructor(private httpStatus: HTTPStatus) { }

  ngOnInit() {
    this.httpStatus.getHttpStatus().subscribe((isInFlight: boolean) => {
      // https://stackoverflow.com/questions/43375532/expressionchangedafterithasbeencheckederror-explained
      setTimeout(() => {
        this.loading = isInFlight;
      }, 0);
    });

    //  this.sidebarActive = true;
  }

  onTopbarMobileMenuButtonClick(event: Event) {
    this.topbarMenuButtonClick = true;
    this.topbarMenuActive = !this.topbarMenuActive;

    event.preventDefault();
  }

  onMenuButtonClick(event: Event) {
    this.sidebarActive = !this.sidebarActive;

    event.preventDefault();
  }

  onTopbarRootItemClick(event: Event, item: Element) {
    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = null;
    } else {
      this.activeTopbarItem = item;
    }

    event.preventDefault();
  }

  onTopbarMenuClick(event: Event) {
    this.topbarMenuClick = true;
  }
}

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}
