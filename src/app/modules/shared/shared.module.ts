import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseComponent} from "./base/base.component";
import {MaterialModule} from "../material/material.module";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FinlevitLibraryModule} from "../../../../lib/finlevit-library/src/lib/finlevit-library.module";
import {BtnPrimaryComponent} from "./btn-primary/btn-primary.component";
import {NgxLoadingModule} from "ngx-loading";
import {LoaderComponent} from "./loader/loader.component";



@NgModule({
  declarations: [BaseComponent, BtnPrimaryComponent, LoaderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FinlevitLibraryModule,
    NgxLoadingModule.forRoot({}),
  ],
  exports: [
    MaterialModule,
    BaseComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FinlevitLibraryModule,
    BtnPrimaryComponent,
    LoaderComponent]
})
export class SharedModule { }
