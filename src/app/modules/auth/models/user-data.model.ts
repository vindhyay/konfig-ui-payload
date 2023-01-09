export const enum UserRole {
  Admin = "Admin",
  WorkflowManager = "workflowManager",
  Support = "supportRole",
  Agent = "agent",
}
export interface View {
  group: string[];
  workflow: string[];
}

export interface Edit {
  group: string[];
  workflow: string[];
}

export interface Create {
  group: string[];
  workflow: any[];
}

export interface Permissions {
  view: View;
  edit: Edit;
  create: Create;
}

export interface UserDataModel {
  roles: Array<{ originalName: string; id: string }>;
  permissions: Permissions;
  userId: string;
  name: string;
  emailId: string;
  phone: string;
  internalGroup: string;
  location: string;
  timeZone: string;
  status: string;
  seatLocation: string;
  managerName: string;
}
