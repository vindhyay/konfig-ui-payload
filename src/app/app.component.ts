import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "./modules/shared/base/base.component";
import {UserDataModel, UserRole} from "./modules/auth/models";
import {Menu} from "primeng/menu";
import {ActivatedRoute, Data, NavigationEnd, Router} from "@angular/router";
import {AuthService} from "./modules/auth/services/auth.service";
import {UserService} from "./modules/user/services/user.service";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent implements OnInit{
  currentUser: UserDataModel | null = null;
  menu: Menu[] | null = null;
  routeTitle: string = '';
  routePhoneTitle: string = '';
  phoneLayout = false;
  navbarBordered = false;
  moduleClass: string | null = '';
  groupId: string = '';
  noWorkflowAssociation: boolean = false;
  get navTitle(): string {
    return this.phoneLayout ? this.routePhoneTitle : this.routeTitle;
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
  ) {
    super();
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser() ? this.authService.getCurrentUser() : null;
    this.subscribe(
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).pipe(
        map(() => {
          const child = this.activatedRoute.firstChild;
          // @ts-ignore
          return child.snapshot;
        })
      ),
      snapshot => {
        const routeData = snapshot.data;
        this.setupRoute(routeData);
      }
    );
    if (this.currentUser) {
      this.authService.getUserDetails();
    }
    this.subscribe(this.authService.onAuthChanged$, user => {
      this.error = false;
      this.noWorkflowAssociation = false;
      this.currentUser = user;
      if (this.currentUser) {
        this.setupMenu(this.currentUser.roles);
      } else {
        this.groupId = '';
        this.menu = null;
      }
    });
    this.subscribe(this.userService.selectionChange$, selection => {
      if (selection) {
        const { selectedGroup: { id: newGroupId = '' } = {} } = selection;
        if (!this.groupId || this.groupId !== newGroupId) {
          this.groupId = newGroupId;
        }
      }
    });
  }

  setupRoute(data: Data) {
    if (this.currentUser) {
      this.setupMenu(this.currentUser.roles);
    }
    this.routeTitle = data && data.title ? data.title : '';
    this.routePhoneTitle = data && data.phoneTitle ? data.phoneTitle : '';
    this.moduleClass = data && data.moduleClass ? data.moduleClass : '';
    this.navbarBordered = data && data.navbarBordered ? data.navbarBordered : false;
  }

  setupMenu(roles: UserRole[]) {
    //this.menu = this.roleGuardService.roleMenu(roles);
  }

  logoff() {
    this.authService.logoff();
  }

  scrollTop(routerComponent: any) {
    const scrollElem = document.querySelector('#moveTop');
    if (scrollElem) {
      scrollElem.scrollIntoView();
    }
  }
}
