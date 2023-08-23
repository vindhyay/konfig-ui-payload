import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  private isLoading = new Subject<boolean>();
  private loaderTimer = null;

  public start(time = 0) {
    if (!time) {
      this.isLoading.next(true);
    } else {
      clearTimeout(this.loaderTimer);
      this.loaderTimer = setTimeout(() => {
        this.isLoading.next(true);
      }, time);
    }
  }
  public complete() {
    clearTimeout(this.loaderTimer);
    this.isLoading.next(false);
  }

  getLoadingStatus(): Observable<boolean> {
    return this.isLoading.asObservable();
  }
}
