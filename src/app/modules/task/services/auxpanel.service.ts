import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

export type AuxPanel = 'comments' | 'attachments' | null;

@Injectable({
  providedIn: 'root'
})
export class AuxpanelService {
  private auxPanelSubject = new Subject<AuxPanel>();
  public auxPanelOpened$ = this.auxPanelSubject.asObservable();

  constructor(private router: Router) {}

  togglePanel(panel?: AuxPanel, taskId?: string, historyMode?: boolean) {
    this.auxPanelSubject.next(panel);
  }
}
