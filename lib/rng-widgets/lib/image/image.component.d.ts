import { OnInit, OnChanges } from '@angular/core';
import { IAvatarData } from '../../model/common-types';
export declare class ImageComponent implements OnInit, OnChanges {
  localData: IAvatarData | null;
  size: number;
  data: IAvatarData;
  imageUrl: string;
  placeholder: string;
  initialColor: string;
  initial: string;
  imgWidth: number;
  imgHeight: number;
  imgClass: string;
  localImageURL: any;
  localAltText: string;
  constructor();
  ngOnInit(): void;
  ngOnChanges(): void;
  initImage(): void;
  handleImageLoad(event: any): void;
  generateInitial(userName: any): void;
  getInitial(name: any): any;
  hashCode(stringValue: string): number;
}
