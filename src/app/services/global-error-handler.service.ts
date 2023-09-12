import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  public handleError(error: any) {
    console.log("error", error);
  }
}
