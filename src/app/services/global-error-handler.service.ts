import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  public handleError(error: any) {
    // TODO send to server dashboard
    console.log("error", error);
  }
}
