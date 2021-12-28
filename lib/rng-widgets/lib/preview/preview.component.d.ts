import { DocType, IPreviewData, PreviewType, PreviewSize } from '../../model/common-types';
export declare class PreviewComponent {
  type: DocType | -1;
  previewURL: string | null;
  size: PreviewSize | null;
  localPreviewURL: string | null;
  containerClass: PreviewType[] | null;
  containerImageStyle: object | null;
  iconClass: string[] | null;
  round: boolean | false;
  previewData: IPreviewData;
  initPreview(): void;
  handleImageLoad(event: any): void;
  docTypeIconClass(docType: any): string[];
}
