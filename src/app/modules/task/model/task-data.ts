export interface TaskData {
  assignedName: string;
  assignedTo: string;
  channelName: string;
  clientName: string;
  id: number;
  productName: string;
  registrationType: string;
  transactionId: string;
  workflowTaskAction: string | null;
  workflowTaskName: string;
  status?: string;
}

export const enum TaskStatus {
  InProgress = 'In Progress',
  Suspended = 'Suspended',
  Rejected = 'Rejected',
  Completed = 'Completed'
}

export interface TaskDetailsData {
  clientName: string;
  comments: Comments[];
  documents: any[];
  forms: any[];
  assignedTo: string;
  currentTask: any;
  workflowTask: any;
  previousTasks: any;
  tasks: any;
  generalInfo: any[];
  history: HistoryPayload[];
  payload: PayloadLabel[];
  productName: string;
  registrationType: string;
  task: TaskActionPayload;
  taskName: string;
  transactionId: string;
  taskType?: string;
}

export interface Comments {
  comment: string;
  event: string;
  action: string;
  lastUpdatedId: string;
  createdTime: string | Date;
  type: string;
  createdBy: any;
}

export interface HistoryPayload {
  label: string;
  data: TaskHistory[];
}

export interface TaskHistory {
  taskName: string;
  timeStamp: string | Date;
  comments: Comments[];
}

export interface PayloadLabel {
  label: string;
  data: PayloadLabelData[];
}

export interface PayloadLabelData {
  label: string;
  value: string;
}

export interface TaskActionPayload {
  label: string;
  taskName?: string;
  actions: TaskAction[];
  editEligible: boolean | string;
}

export interface TaskAction {
  assignedTo: string;
  comments: string;
  name?: string;
  id: string;
  label: string;
  taskAction: string;
  taskName: string;
  actionName?: string;
  timeStamp: string;
  value: string;
  commentRequired: string | boolean;
  reasonRequired: string | boolean;
  actionReasons: any;
}

export interface TaskUserPayload {
  user: any;
  task: any;
}

export enum TaskDocType {
  INCOMING = 'Incoming',
  OUTGOING = 'Outgoing'
}

export interface ITaskDoc extends IPreviewData {
  document_direction: string;
  document_id: string;
  document_name: string;
  documentName: string;
  createdTime: string;
  dri: string;
  uploaded: any;
}


export interface IPreviewData {
  docType: DocType;
  previewURL?: string | null;
  previewSize?: PreviewSize | null;
  round?: boolean | false;
}

export enum DocType {
  XLSX,
  DOCX,
  HTML,
  XML,
  ZIP,
  PDF,
  IMAGE,
  VIDEO
}

export enum PreviewSize {
  SMALL = 32,
  WIDGET = 120
}
