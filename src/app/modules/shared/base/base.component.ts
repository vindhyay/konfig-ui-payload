import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, TeardownLogic } from 'rxjs';

@Component({
  selector: 'app-base',
  template: 'NO BASE TEMPLATE',
  styleUrls: []
})
export class BaseComponent implements OnDestroy {
  private subscription = new Subscription();
  public loading = false;
  public error = false;
  public menuItems: string[] = ['Edit', 'Delete'];
  constructor() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // subscription helpers
  protected enqueue(logic: TeardownLogic) {
    this.subscription.add(logic);
  }
  protected subscribe(observable: Observable<any>, onResult: (result: any) => void) {
    this.enqueue(observable.subscribe(onResult, this.errorHandler));
  }
  protected subscribeHandleError(
    observable: Observable<any>,
    onResult: (result: any) => void,
    onError: (error: any) => void
  ) {
    this.enqueue(observable.subscribe(onResult, onError));
  }

  // default handlers
  errorHandler(error: any) {
    // TODO: implement error handling in GUI
    console.log(error);
  }
}
