import { Component, Input } from '@angular/core';
import {DocType, IPreviewData, PreviewSize, PreviewType} from "../model/common-types";

@Component({
  selector: 'rng-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent {
  type: DocType | -1;
  previewURL: string | null;
  size: PreviewSize | null = PreviewSize.SMALL;
  localPreviewURL: string | null;
  containerClass: PreviewType[] | null = [PreviewType.SMALL];
  containerImageStyle: object | null;
  iconClass: string[] | null;
  round: boolean | false;

  @Input()
  set previewData(data: IPreviewData) {
    this.type = data.docType;
    this.previewURL = data.previewURL;
    this.size = data.previewSize || PreviewSize.SMALL;
    this.round = data.round || false;
    this.initPreview();
  }

  initPreview() {
    this.localPreviewURL = null;
    this.containerClass = [PreviewType.SMALL];
    this.containerImageStyle = null;
    this.iconClass = null;

    if (this.size === PreviewSize.WIDGET) {
      this.containerClass = [PreviewType.WIDGET];
    }

    if (this.previewURL && this.previewURL.length) {
      this.localPreviewURL = this.previewURL;
    }

    if (this.round) {
      this.containerClass.push(PreviewType.ROUND);
    }

    if (this.localPreviewURL) {
      this.containerImageStyle = { 'background-image': 'url(' + this.localPreviewURL + ')' };
      const image = new Image();
      image.addEventListener('load', e => this.handleImageLoad(e));
      image.src = this.localPreviewURL;
    } else {
      this.iconClass = this.docTypeIconClass(this.type);
    }
  }
  handleImageLoad(event) {
    const img = event.path[0];
    console.log('handleImageLoad', img);
    if (img.width > img.height) {
      this.containerClass.push(PreviewType.LANDSCAPE);
    }
    if (img.width < img.height) {
      this.containerClass.push(PreviewType.PORTRAIT);
    }
  }
  docTypeIconClass(docType): string[] {
    switch (docType) {
      case DocType.XLSX:
        return ['pi pi-file-excel', 'ms-green'];
      case DocType.PDF:
        return ['pi pi-file-pdf', 'adobe-red'];
      case DocType.IMAGE:
        return ['pi pi-image', 'ms-blue'];
      case DocType.VIDEO:
        return ['pi pi-video', 'ms-blue'];
      default:
        return ['pi pi-file', 'ms-blue'];
    }
  }
}
