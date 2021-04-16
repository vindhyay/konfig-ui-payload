import { Injectable, OnDestroy } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { BehaviorSubject, EMPTY, Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../../services/storage.service';
import { SelectedPreferencesModel } from '../../auth/models';
import { catchError, tap } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import {AppConfigService} from "../../../app-config-providers/app-config.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService implements OnDestroy {
  constructor(protected http: HttpClient, protected storage: StorageService, protected config: AppConfigService) {
    super(http);
  }

  public workflows: BehaviorSubject<any> = new BehaviorSubject([]);
  public groups: BehaviorSubject<any> = new BehaviorSubject([]);
  public selection: BehaviorSubject<{
    selectedGroup?: any;
    selectedWorkflow: any;
    selectedRole: any;
  }> = new BehaviorSubject({selectedWorkflow: null, selectedRole: null});
  public selectionChange$ = this.selection.asObservable();

  private socket$: any;
  private tasksSubject$ = new Subject<any>();

  ngOnDestroy(): void {}

  setSelectedWorkflow(selectedWorkflow: any) {
    const roles = selectedWorkflow.roles || [];
    let selectedRole = roles.find((role: any) => role.default === true) || {};
    selectedRole = selectedRole.id ? selectedRole : roles[0] || {};
    this.setSelection(this.selection.getValue().selectedGroup, selectedRole, selectedWorkflow);
  }

  setSelection(selectedGroup: any, selectedRole: any, selectedWorkflow? : any) {
    const preferencesIfAny: SelectedPreferencesModel = this.storage.preference;
    const { selectedWorkflowId = '', selectedRoleId = '' } = preferencesIfAny || {};
    this.storage.preference = {
      selectedWorkflowId: (selectedWorkflow && selectedWorkflow.id) || selectedWorkflowId,
      selectedRoleId: (selectedRole && selectedRole.id) || selectedRoleId,
      selectedGroupId: selectedGroup && selectedGroup.id
    };
    this.selection.next({ selectedGroup, selectedWorkflow, selectedRole });
  }

  setWorkflowsAndRoles(data: any[]) {
    this.workflows.next(data);
    let selectedWorkflow = data.find(workflow => workflow.default === true) || {};
    selectedWorkflow = selectedWorkflow.id ? selectedWorkflow : data[0] || {};
    const roles = selectedWorkflow.roles || [];
    let selectedRole = roles.find((role: any) => role.default === true) || {};
    selectedRole = selectedRole.id ? selectedRole : roles[0] || {};
    let selectedGroup = this.selection.getValue().selectedGroup;
    const preferencesIfAny: SelectedPreferencesModel = this.storage.preference;
    if (preferencesIfAny) {
      const { selectedWorkflowId = '', selectedRoleId = '' } = preferencesIfAny;
      const selectedWorkflowExists = data.find(workflow => workflow.id == selectedWorkflowId);
      const selectedRoleExist =
        selectedWorkflowExists && selectedWorkflowExists.roles.find((role: any) => role.id === selectedRoleId);
      if (selectedWorkflowExists && selectedRoleExist) {
        this.setSelection(selectedGroup, selectedRoleExist, selectedWorkflowExists);
        return;
      }
    }
    this.setSelection(selectedGroup, selectedRole, selectedWorkflow);
  }

  setGroups(data: any[]) {
    if (data && data.length) {
      this.groups.next(data);
      const preferencesIfAny: SelectedPreferencesModel = this.storage.preference;
      let selectedGroup = data[0];
      if (preferencesIfAny) {
        const { selectedGroupId = '' } = preferencesIfAny;
        selectedGroup = data.find(group => group.id === selectedGroupId) || selectedGroup;
      }
      let selectedWorkflow = this.selection.getValue() && this.selection.getValue().selectedWorkflow;
      let selectedRole = this.selection.getValue() && this.selection.getValue().selectedRole;
      this.setSelection(selectedGroup, selectedWorkflow, selectedRole);
    }
  }

  getHistoryQueueColumns = (params: any): Observable<any> => {
    const { workflowId = '' } = params;
    const url = `${this.config.getApiUrls().getAllHistoryColumnsURL}/${workflowId}`;
    return this.getData(url, params);
  };

  saveConfiguredColumns = (params: any, payload: any): Observable<any> => {
    const { workflowId = '' } = params;
    const url: string = `${this.config.getApiUrls().saveConfiguredColumnsURL}/${workflowId}`;
    return this.postData(url, payload);
  };

  exportTasks = (scope: any, params: any, payload: any): Observable<any> => {
    const url: string = `${this.config.getApiUrls().exportTasksURL}/${scope}`;
    return this.postData(url, payload, params, 'blob');
  };


  /**
   * Creates a new WebSocket subject and send it to the messages subject
   * @param cfg if true the observable will be retried.
   */
  public connect(params: any): void {
    this.socket$ = this.getNewTaskDataSocket(params);
    const tasks: any = this.socket$.pipe(
      tap({
        error: error => console.log(error)
      }),
      catchError(_ => EMPTY)
    );
    this.tasksSubject$.next(tasks);
  }

  close() {
    if (this.socket$) {
      this.socket$.complete();
      this.tasksSubject$.complete();
      this.socket$ = null;
    }
  }

  /**
   * Return a custom WebSocket subject which reconnects after failure
   */
  private getNewTaskDataSocket(params: any) {
    const { userId, workflowId, roleId } = params;
    const paramsString1 = userId ? `?userId=${userId || ''}` : '';
    const paramsString2 = roleId ? `&roleId=${roleId || ''}` : '';
    const url = `${this.config.getApiUrls().taskTableSocketURL}/${workflowId}${paramsString1}${paramsString2}`;
    console.log('socket url', url);
    return webSocket({
      url: url,
      deserializer: msg => {
        return msg;
      },
      openObserver: {
        next: () => {
          console.log('[New Tasks DataService]: connection ok');
        }
      },
      closeObserver: {
        next: () => {
          console.log('[New Tasks DataService]: connection closed');
          this.socket$ = undefined;
        }
      }
    });
  }
}
