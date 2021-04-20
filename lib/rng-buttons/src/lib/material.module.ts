import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  exports: [MatButtonModule, MatMenuModule, MatDividerModule]
})
export class MaterialModule {}
