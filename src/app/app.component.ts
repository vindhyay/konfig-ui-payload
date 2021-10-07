import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "./modules/shared/base/base.component";
import { UserDataModel } from "./modules/auth/models";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AuthService } from "./modules/auth/services/auth.service";
import { filter, map } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit{
  currentUser: UserDataModel | null = null;
  workflowId: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) {
    super();
  }

  ngOnInit() {
    this.subscribe(this.router.events.pipe(filter(event => event instanceof NavigationEnd)).pipe(
      map(() => {
        return this.activatedRoute.firstChild;
      })
    ), data => {
      this.subscribe(data?.params, params => {
        this.workflowId = params?.workflowId;
        if(this.workflowId && this.authService.isAuthenticated()){
          this.authService.updateUserDetails(this.workflowId);
        }
      })
    })
  }

  logoff() {
    this.authService.logoff();
  }
}
