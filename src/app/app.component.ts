import { Component, OnInit } from "@angular/core";
import { UserDataModel } from "./modules/auth/models";
import { AuthService } from "./modules/auth/services/auth.service";
import { BaseComponent } from "./modules/shared/base/base.component";
import { TokenRefreshService } from "./services/token-refresh.service";
import { ScriptLoaderService } from "./services/script-loader.service";
import { AppConfigService } from "./app-config-providers/app-config.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: [],
})
export class AppComponent extends BaseComponent implements OnInit {
  user: UserDataModel | null;
  constructor(
    private authService: AuthService,
    private tokenRefresher: TokenRefreshService,
    private scriptLoaderService: ScriptLoaderService,
    protected config: AppConfigService
  ) {
    super();
    this.user = this.authService.getCurrentUser() || null;
  }
  officeType: string;
  ngOnInit() {
    const googleMapsURL = this.config.googleMapsURL;
    const fontsURL = this.config.fontsURL;
    this.loadScript(googleMapsURL);
    this.loadFonts(fontsURL);
    this.subscribe(this.authService.onAuthChanged$, (user) => {
      this.user = user;
      if (this.user) {
        this.tokenRefresher.scheduleTokenRefresh();
      } else {
        this.tokenRefresher.cancelTokenRefresh();
      }
    });
  }
  loadScript(scriptUrl: string) {
    this.scriptLoaderService.loadScript(scriptUrl);
  }
  loadFonts(fontsURL: string) {
    this.scriptLoaderService.loadCss(fontsURL);
  }
}
