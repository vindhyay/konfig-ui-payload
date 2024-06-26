import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "./modules/shared/base/base.component";
import { UserDataModel } from "./modules/auth/models";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "./modules/auth/services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent extends BaseComponent implements OnInit {
  currentUser: UserDataModel | null = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    super();
  }

  ngOnInit() {}

  logoff() {
    this.authService.logoff();
  }
}
