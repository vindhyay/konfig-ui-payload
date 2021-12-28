export interface TypeLabel {
  color: string;
  value: string;
  status?: boolean;
}

export interface IAvatarData {
  name: string;
  imageUrl: string;
}

export interface IAvatarEnabled {
  avatar: IAvatarData;
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

export enum PreviewType {
  SMALL = 'small',
  WIDGET = 'widget',
  ROUND = 'round',
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape'
}

export enum PreviewSize {
  SMALL = 32,
  WIDGET = 120
}

export interface IActionButton<T> {
  iconCSS: string;
  action: T;
}
