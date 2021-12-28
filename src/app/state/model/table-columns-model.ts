export interface CreatedBy {
  userId: string;
  createdTime: any;
  lastUpdatedTime: any;
  name: string;
  emailId: string;
  phone: string;
  internalGroup: string;
  location?: any;
  timeZone?: any;
  status: string;
  seatLocation?: any;
  managerName?: any;
  defaultWorkflow?: any;
  defaultRole?: any;
}

export interface LastUpdatedBy {
  userId: string;
  createdTime: any;
  lastUpdatedTime: any;
  name: string;
  emailId: string;
  phone: string;
  internalGroup: string;
  location?: any;
  timeZone?: any;
  status: string;
  seatLocation?: any;
  managerName?: any;
  defaultWorkflow?: any;
  defaultRole?: any;
}

export interface Workflow {
  createdTime: any;
  lastUpdatedTime: any;
  id: number;
  workflowName: string;
  workflowDescription: string;
  status: string;
  appId: string;
  appIdLocation: string;
  isEditable: boolean;
  workflowVersions?: any;
}

export interface Field {
  createdTime?: any;
  createdBy?: CreatedBy;
  lastUpdatedTime?: any;
  lastUpdatedBy?: LastUpdatedBy;
  id?: number;
  displayName: string;
  label: string;
  path?: string;
  workflow?: Workflow;
  metaData?: string;
  resourceType?: string;
  apiTask?: any;
  status?: boolean;
  dataType?: string;
  validators?: string;
  datasetKey?: string;
  prefix?: string;
  suffix?: string;
}

export interface Column {
  createdTime?: any;
  createdBy?: CreatedBy;
  lastUpdatedTime?: any;
  lastUpdatedBy?: LastUpdatedBy;
  id?: number;
  workflow?: Workflow;
  field: Field;
  order: number;
  status?: boolean;
  sortable: boolean;
  searchable: boolean;
  viewType: ViewTypes;
  format?: any;
  visible: boolean;
  rowSpanKey?: string;
  options?: Option[];
}
interface Option {
  name: string;
  value: string;
}

export enum ViewTypes {
  'INPUT' = 'INPUT',
  'TIMESTAMP' = 'TIMESTAMP',
  'DROPDOWN' = 'DROPDOWN',
  'ICON_DROPDOWN' = 'ICON_DROPDOWN'
}

export interface SearchData {
  path: string;
  sort?: string;
  dataType?: string;
  value: string;
  resourceType: string;
  operator?: string;
  condition?: string;
}

export interface ColumnSearchData {
  [name: string]: SearchData;
}

export interface ColumnSearchPayload {
  key: string;
  value: string;
  resourceType: string;
  dataType: string;
  sort?: string;
  operator?: string;
  condition?: string;
}

export interface TasksQueryPayload {
  searchAttributes: ColumnSearchPayload[];
  offset: number;
  noOfRows: number;
  userId?: string;
  groupId: string;
  workflowId?: string;
  roleId?: string;
}
