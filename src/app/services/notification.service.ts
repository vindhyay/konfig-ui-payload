import { Injectable } from '@angular/core';
import { ActiveToast, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(protected toast: ToastrService) {}
  public error(message: string, title: string = 'Error'): ActiveToast<any> {
    return this.toast.error(message, title);
  }
  public success(message: string, title: string = 'Success'): ActiveToast<any> {
    return this.toast.success(message, title);
  }
  public info(message: string, title: string = 'Info'): ActiveToast<any> {
    return this.toast.info(message, title);
  }
}
