import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { BackButtonComponent } from './back-button/back-button.component';
import { IconLabelButtonComponent } from './icon-label-button/icon-label-button.component';
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { OptionsButtonComponent } from './options-button/options-button.component';

@NgModule({
  declarations: [BackButtonComponent, IconLabelButtonComponent, MenuButtonComponent, OptionsButtonComponent],
  imports: [CommonModule, MaterialModule],
  exports: [BackButtonComponent, IconLabelButtonComponent, MenuButtonComponent, OptionsButtonComponent]
})
export class RngButtonsModule {}
