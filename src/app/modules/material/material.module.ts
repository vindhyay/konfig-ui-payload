import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatStepperModule} from '@angular/material/stepper';
import {CdkStepperModule} from '@angular/cdk/stepper';

@NgModule({
  exports: [
    MatCheckboxModule,
    MatButtonModule,
    MatTooltipModule,
    MatStepperModule,
    CdkStepperModule
  ]
})
export class MaterialModule {}
