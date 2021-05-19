import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  exports: [
    MatCheckboxModule,
    MatButtonModule,
      MatTooltipModule
  ]
})
export class MaterialModule {}
