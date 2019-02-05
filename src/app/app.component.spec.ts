import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { APP_BASE_HREF } from '@angular/common';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = <AppComponent>fixture.debugElement.componentInstance;
    app.ngOnInit();
    const click = new MouseEvent('click');
    app.onTopbarMobileMenuButtonClick(click);
    app.onMenuButtonClick(click);
    app.onTopbarRootItemClick(click, null);
    app.onTopbarMenuClick(click);

    expect(app).toBeTruthy();
  }));
});
