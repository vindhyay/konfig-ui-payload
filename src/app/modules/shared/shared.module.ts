import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseComponent} from "./base/base.component";
import {MaterialModule} from "../material/material.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FinlevitLibraryModule} from "../../../../lib/finlevit-library/src/lib/finlevit-library.module";
import {BtnPrimaryComponent} from "./btn-primary/btn-primary.component";



@NgModule({
  declarations: [BaseComponent, BtnPrimaryComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FinlevitLibraryModule,
  ],
  exports: [
    MaterialModule,
    BaseComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FinlevitLibraryModule,
    BtnPrimaryComponent]
})
export class SharedModule { }
