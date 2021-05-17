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
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ToastrModule} from 'ngx-toastr';
import { TabViewModule } from 'primeng/tabview';
import {FinlevitFileUploadComponent} from "./finlevit-file-upload/finlevit-file-upload.component";


@NgModule({
  declarations: [BaseComponent, BtnPrimaryComponent, LoaderComponent, PageNotFoundComponent, FinlevitFileUploadComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      closeButton: true
    }),
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
    LoaderComponent,
    TabViewModule,
    FinlevitFileUploadComponent
  ]
})
export class SharedModule { }
