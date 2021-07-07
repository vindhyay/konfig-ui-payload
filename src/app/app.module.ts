import {APP_INITIALIZER, ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppConfigService} from "./app-config-providers/app-config.service";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CanDeactivateGuard} from "./services/deactivate-guard.service";
import {GlobalErrorHandlerService} from "./services/global-error-handler.service";
import {SharedModule} from "./modules/shared/shared.module";
import {AuthModule} from "./modules/auth/auth.module";
import {TaskModule} from './modules/task/task.module';
import {JwtInterceptor} from './interceptors/jwt.interceptor';

export function initConfig(appConfig: AppConfigService) {
  return () => appConfig.loadAppConfig();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    TaskModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initConfig,
    deps: [AppConfigService],
    multi: true
  },
    // {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},

    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService }, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
