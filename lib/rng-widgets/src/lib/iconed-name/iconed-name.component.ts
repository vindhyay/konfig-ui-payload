import { Component, Input } from '@angular/core';
import { IAvatarData, IAvatarEnabled } from '../../model/common-types';

@Component({
  selector: 'rng-iconed-name',
  templateUrl: './iconed-name.component.html',
  styleUrls: []
})
export class IconedNameComponent {
  @Input() data: IAvatarData | IAvatarEnabled;

  get avatarName(): string {
    const avatar = this.avatar;
    return avatar.name;
  }

  get avatar(): IAvatarData {
    if (!this.data) {
      return {} as IAvatarData;
    }
    if ('avatar' in this.data) {
      return (this.data as IAvatarEnabled).avatar;
    }
    return this.data as IAvatarData;
  }
}
