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
export declare enum DocType {
  XLSX = 0,
  DOCX = 1,
  HTML = 2,
  XML = 3,
  ZIP = 4,
  PDF = 5,
  IMAGE = 6,
  VIDEO = 7
}
export declare enum PreviewType {
  SMALL = 'small',
  WIDGET = 'widget',
  ROUND = 'round',
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape'
}
export declare enum PreviewSize {
  SMALL = 32,
  WIDGET = 120
}
export interface IActionButton<T> {
  iconCSS: string;
  action: T;
}
