export interface Workflow {
  id: number;
  workflowName: string;
  default: boolean;
  roles: Role[];
}

export interface Role {
  id: number;
  roleName: string;
  default: boolean;
}

export interface SelectionModel {
  selectedGroup?: any;
  selectedWorkflow: any;
  selectedRole: any;
}
