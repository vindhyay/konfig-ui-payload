import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ImageComponent } from './image/image.component';
import { PreviewComponent } from './preview/preview.component';
import { IconedMenuComponent } from './iconed-menu/iconed-menu.component';
import { IconedNameComponent } from './iconed-name/iconed-name.component';
import { CompactToolbarComponent } from './compact-toolbar/compact-toolbar.component';
import { NamedMenuComponent } from './named-menu/named-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ImageComponent,
    PreviewComponent,
    IconedMenuComponent,
    IconedNameComponent,
    CompactToolbarComponent,
    NamedMenuComponent
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    ImageComponent,
    PreviewComponent,
    IconedMenuComponent,
    IconedNameComponent,
    CompactToolbarComponent,
    NamedMenuComponent
  ]
})
export class RngWidgetsModule {}
