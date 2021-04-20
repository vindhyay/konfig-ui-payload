import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialModule } from './material.module';

import { BindableComponent } from './bindable/bindable.component';
import { BindableInputComponent } from './bindable-input/bindable-input.component';
import { BindableSelectComponent } from './bindable-select/bindable-select.component';
import { BindableSelectMultiComponent } from './bindable-select-multi/bindable-select-multi.component';
import { BindableCheckboxComponent } from './bindable-checkbox/bindable-checkbox.component';
import { TypeLabelComponent } from './type-label/type-label.component';
import { ReactiveControlComponent } from './reactive-control/reactive-control.component';
import { ReactiveMatInputControlComponent } from './reactive-mat-input-control/reactive-mat-input-control.component';
import { ReactiveMatInputComponent } from './reactive-mat-input/reactive-mat-input.component';
import { BindableDatepickerComponent } from './bindable-datepicker/bindable-datepicker.component';
import { SimpleSearchComponent } from './simple-search/simple-search.component';
import { ContentToolbarComponent } from './content-toolbar/content-toolbar.component';
import { BindableTextareaComponent } from './bindable-textarea/bindable-textarea.component';
import { BindableTimepickerComponent } from './bindable-timepicker/bindable-timepicker.component';
import { BindableMultiInputComponent } from './bindable-multi-input/bindable-multi-input.component';

@NgModule({
  declarations: [
    BindableComponent,
    BindableInputComponent,
    BindableSelectComponent,
    BindableSelectMultiComponent,
    BindableCheckboxComponent,
    TypeLabelComponent,
    ReactiveControlComponent,
    ReactiveMatInputControlComponent,
    ReactiveMatInputComponent,
    BindableDatepickerComponent,
    SimpleSearchComponent,
    ContentToolbarComponent,
    BindableTextareaComponent,
    BindableTimepickerComponent,
    BindableMultiInputComponent
  ],
  imports: [CommonModule, NgxMaskModule.forRoot(), MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    BindableComponent,
    BindableInputComponent,
    BindableSelectComponent,
    BindableSelectMultiComponent,
    BindableCheckboxComponent,
    BindableDatepickerComponent,
    ReactiveControlComponent,
    ReactiveMatInputControlComponent,
    ReactiveMatInputComponent,
    SimpleSearchComponent,
    ContentToolbarComponent,
    BindableTextareaComponent,
    BindableTimepickerComponent,
    BindableMultiInputComponent
  ]
})
export class RngInputsModule {}
