import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rng-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: []
})
export class BackButtonComponent {
  @Input() light: boolean | null = false;
  @Input() backSteps: number | null;
  @Input() historyMode: boolean | null = false;
  @Input() backByUrl: string | null = null;
  @Input() backFn: Function = null;
  @Input() borderColor: '#F3F6F9'

  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  get backRelative() {
    switch (this.backSteps) {
      case 1:
        return this.activeRoute;
      case 2:
        return this.activeRoute.parent;
      case 3:
        return this.activeRoute.parent.parent;
        // we could implement some recursion here but also it could require to navigate to "root" (0 for example)
      default:
        return this.activeRoute.root.firstChild; // root's firstchild -1 should give us the root itself
    }
  }
  goBack(): void {
    if (this.backFn) {
      this.backFn();
    } else if (this.historyMode) {
      history.go(-this.backSteps);
    } else if (this.backByUrl) {
      this.router.navigate([`../../../${this.backByUrl}`], { relativeTo: this.activeRoute });
    } else {
      this.router.navigate(['../'], { relativeTo: this.backRelative });
    }
  }
}
