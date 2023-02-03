import { Component, OnInit } from "@angular/core";
import { UserDataModel } from "./modules/auth/models";
import { AuthService } from "./modules/auth/services/auth.service";
import { BaseComponent } from "./modules/shared/base/base.component";
import { TokenRefreshService } from "./services/token-refresh.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: []
})
export class AppComponent extends BaseComponent implements OnInit {
  user: UserDataModel | null;
  constructor(private authService: AuthService, private tokenRefresher: TokenRefreshService) {
    super();
    this.user = this.authService.getCurrentUser() || null;
  }
  officeType: string;
  ngOnInit() {
    this.subscribe(this.authService.onAuthChanged$, user => {
      this.user = user;
      if(this.user) {
        this.tokenRefresher.scheduleTokenRefresh();
      }
      else {
        this.tokenRefresher.cancelTokenRefresh();
      }
    });
  }
}
