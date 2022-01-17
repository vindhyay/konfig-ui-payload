import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {IAvatarData} from "../model/common-types";

@Component({
  selector: 'rng-image',
  templateUrl: './image.component.html',
  styleUrls: []
})
export class ImageComponent implements OnInit, OnChanges {
  localData: IAvatarData | null;
  @Input() size = 32;
  @Input()
  set data(data: IAvatarData) {
    // reset previous data
    this.localImageURL = null;
    this.localAltText = '';
    // init with new data
    this.localData = data;
    this.initImage();
  }
  get data(): IAvatarData {
    return this.localData;
  }

  @Input() imageUrl: string;
  @Input() placeholder: string;

  initialColor: string;
  initial: string;

  imgWidth = 0;
  imgHeight = 0;
  imgClass = 'square';

  localImageURL = null;
  localAltText = '';

  constructor() {}

  ngOnInit() {
    this.initImage();
  }

  ngOnChanges(): void {
    this.initImage();
  }

  initImage() {
    if (this.data && this.data.imageUrl && this.data.imageUrl.length > 0) {
      this.localImageURL = this.data.imageUrl;
    } else if (this.imageUrl && this.imageUrl.length > 0) {
      this.localImageURL = this.imageUrl;
    }

    if (this.localImageURL) {
      const image = new Image();
      image.addEventListener('load', e => this.handleImageLoad(e));
      image.src = this.localImageURL;
    }

    if (this.data && this.data.name && this.data.name.length > 0) {
      this.localAltText = this.data.name;
    }
    if (this.placeholder && this.placeholder.length > 0) {
      this.localAltText = this.placeholder;
    }

    this.generateInitial(this.localAltText);
  }

  handleImageLoad(event) {
    this.imgWidth = event.target.width;
    this.imgHeight = event.target.height;
    if (this.imgWidth > this.imgHeight) {
      this.imgClass = 'landscape-img';
    }
    if (this.imgWidth < this.imgHeight) {
      this.imgClass = 'portrait-img';
    }
  }

  generateInitial(userName) {
    if (userName) {
      const colors = [
        'orange',
        'dark-orange',
        'red',
        'pink',
        'green',
        'light-green',
        'blue',
        'darken-blue',
        'dark-blue',
        'purple',
        'brown',
        'dark',
        'gray'
      ];
      this.initial = this.getInitial(userName);
      this.initialColor = colors[this.hashCode(this.initial) % colors.length];
    }
  }

  getInitial(name) {
    const matches = name.match(/\b(\w)/g);
    return matches.join('');
  }
  hashCode(stringValue: string) {
    let hash = 0;
    if (stringValue.length === 0) {
      return hash;
    }
    for (let i = 0; i < stringValue.length; i++) {
      const chr = stringValue.charCodeAt(i);
      // tslint:disable-next-line: no-bitwise
      hash = (hash << 5) - hash + chr;
      // tslint:disable-next-line: no-bitwise
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
}
