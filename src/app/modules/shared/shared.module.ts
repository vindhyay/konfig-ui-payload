import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BaseComponent } from "./base/base.component";
import { MaterialModule } from "../material/material.module";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FinlevitLibraryModule } from "../../../../lib/finlevit-library/src/lib/finlevit-library.module";
import { BtnPrimaryComponent } from "./btn-primary/btn-primary.component";
import { NgxLoadingModule } from "ngx-loading";
import { LoaderComponent } from "./loader/loader.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ToastrModule } from "ngx-toastr";
import { TabViewModule } from "primeng/tabview";
import { FinlevitFileUploadComponent } from "./finlevit-file-upload/finlevit-file-upload.component";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { AccordionModule } from "primeng/accordion";
import { CustomDropdownComponent } from "./custom-dropdown.component";
import { PortalModule } from '@angular/cdk/portal';
import { CustomTableComponent } from "./finlevit-custom-inputs/finlevit-custom-table/custom-table.component";
import { ResizableDirective } from "./finlevit-custom-inputs/finlevit-custom-table/table-utils/resizable.directive";
import { PaginationFilterPipe } from "./finlevit-custom-inputs/finlevit-custom-table/table-utils/pagination-filter.pipe";
import { PaginationDirective } from "./finlevit-custom-inputs/finlevit-custom-table/table-utils/pagination.directive";
import { SorterDirective } from "./finlevit-custom-inputs/finlevit-custom-table/table-utils/sorter.directive";
import { SortHeaderComponent } from "./finlevit-custom-inputs/finlevit-custom-table/table-utils/sort-header/sort-header.component";
import { CustomTableFiltersComponent } from "./finlevit-custom-inputs/finlevit-custom-table/table-utils/custom-table-filters/custom-table-filters.component";

@NgModule({
  declarations: [
    BaseComponent,
    BtnPrimaryComponent,
    LoaderComponent,
    PageNotFoundComponent,
    FinlevitFileUploadComponent,
    CustomDropdownComponent,
    CustomTableComponent,
    ResizableDirective,
    PaginationFilterPipe,
    PaginationDirective,
    SorterDirective,
    SortHeaderComponent,
    CustomTableFiltersComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-top-center",
      preventDuplicates: true,
      closeButton: true
    }),
    PortalModule,
    ReactiveFormsModule,
    FinlevitLibraryModule,
    AccordionModule,
    NgxLoadingModule.forRoot({})
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
    DialogModule,
    ButtonModule,
    FinlevitFileUploadComponent,
    AccordionModule,
    CustomDropdownComponent,
    PortalModule,
    SorterDirective,
    SortHeaderComponent,
    ResizableDirective,
    PaginationFilterPipe,
    PaginationDirective,
    CustomTableComponent,
    CustomTableFiltersComponent
  ]
})
export class SharedModule {}
