import { Router, ActivatedRoute } from '@angular/router';
export declare class BackButtonComponent {
  private router;
  private activeRoute;
  light: boolean | null;
  backSteps: number | null;
  historyMode: boolean | null;
  backByUrl: string | null;
  constructor(router: Router, activeRoute: ActivatedRoute);
  readonly backRelative: ActivatedRoute;
  goBack(): void;
}
