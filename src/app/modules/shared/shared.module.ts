import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BaseComponent } from "./base/base.component";
import { MaterialModule } from "../material/material.module";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FinlevitLibraryModule } from "finlevit-library";
import { BtnPrimaryComponent } from "./btn-primary/btn-primary.component";
import { NgxLoadingModule } from "ngx-loading";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { ToastrModule } from "ngx-toastr";
import { TabViewModule } from "primeng/tabview";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { AccordionModule } from "primeng/accordion";
import { CustomDropdownComponent } from "./custom-dropdown.component";
import { PortalModule } from "@angular/cdk/portal";
import { CustomTableComponent } from "./finlevit-custom-table/custom-table.component";
import { ResizableDirective } from "./finlevit-custom-table/table-utils/resizable.directive";
import { PaginationFilterPipe } from "./finlevit-custom-table/table-utils/pagination-filter.pipe";
import { PaginationDirective } from "./finlevit-custom-table/table-utils/pagination.directive";
import { SorterDirective } from "./finlevit-custom-table/table-utils/sorter.directive";
import { SortHeaderComponent } from "./finlevit-custom-table/table-utils/sort-header/sort-header.component";
import { CustomTableFiltersComponent } from "./finlevit-custom-table/table-utils/custom-table-filters/custom-table-filters.component";
import { BtnIconComponent } from "./btn-icon/btn-icon.component";
import { BtnDangerComponent } from "./btn-danger/btn-danger.component";
import { LoaderComponent } from "./loader/loader.component";
import { FilterPipe } from "src/app/pipes/filter.pipe";
import { CustomDatePipe } from "../../pipes/custom-date.pipe";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToSSNFormatPipe } from "../../pipes/to-ssn-format.pipe";
import { ToPhoneFormatPipe } from "../../pipes/to-phone-format.pipe";
import { AddressAutocompleteDirective } from "./address-autocomplete.directive";

@NgModule({
  declarations: [
    BaseComponent,
    BtnPrimaryComponent,
    PageNotFoundComponent,
    CustomDropdownComponent,
    CustomTableComponent,
    ResizableDirective,
    PaginationFilterPipe,
    PaginationDirective,
    SorterDirective,
    SortHeaderComponent,
    CustomTableFiltersComponent,
    BtnIconComponent,
    BtnDangerComponent,
    LoaderComponent,
    FilterPipe,
    CustomDatePipe,
    ToSSNFormatPipe,
    ToPhoneFormatPipe,
    AddressAutocompleteDirective,
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
      closeButton: true,
    }),
    PortalModule,
    ReactiveFormsModule,
    FinlevitLibraryModule,
    AccordionModule,
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
    TabViewModule,
    DialogModule,
    ButtonModule,
    AccordionModule,
    CustomDropdownComponent,
    PortalModule,
    SorterDirective,
    SortHeaderComponent,
    ResizableDirective,
    PaginationFilterPipe,
    PaginationDirective,
    CustomTableComponent,
    CustomTableFiltersComponent,
    BtnIconComponent,
    BtnDangerComponent,
    LoaderComponent,
    FilterPipe,
    CustomDatePipe,
    ConfirmDialogModule,
    ToSSNFormatPipe,
    ToPhoneFormatPipe,
    AddressAutocompleteDirective,
  ],
})
export class SharedModule {}
