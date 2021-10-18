import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PayloadDetailsComponent } from "./payload-details/payload-details.component";
import { PayloadViewFormComponent } from "./payload-details/view-form/payload-view-form.component";
import { PayloadFormFieldComponent } from "./payload-form-field/payload-form-field.component";
import { FinlevitGridComponent } from "./finlevit-grid/finlevit-grid.component";
import { DropdownFieldComponent } from "./payload-form-field/dropdown-field/dropdown-field.component";
import { CheckboxGroupComponent } from "./payload-form-field/checkbox-group/checkbox-group.component";
import { GridsterModule } from "../../../../lib/angular-gridster2/src/lib/gridster.module";
import { TaskService } from "./services/task.service";
import { AuthService } from "../auth/services/auth.service";
import { SharedModule } from "../shared/shared.module";
import { ExtendedModule } from "@angular/flex-layout";
import { UploadComponent } from "./payload-form-field/upload/upload.component";
import { TransactionTableComponent } from "./payload-form-field/transaction-table/transaction-table.component";
import { TextFieldComponent } from "./payload-form-field/text-field/text-field.component";
import { ModalComponent } from './payload-form-field/modal/modal.component';
import { CollapseContainerComponent } from './payload-form-field/collapse-container/collapse-container.component';
import { AdvTableComponent } from './payload-form-field/adv-table/adv-table.component';

@NgModule({
  declarations: [
    PayloadDetailsComponent,
    PayloadViewFormComponent,
    PayloadFormFieldComponent,
    FinlevitGridComponent,
    DropdownFieldComponent,
    CheckboxGroupComponent,
    UploadComponent,
    TransactionTableComponent,
    TextFieldComponent,
    ModalComponent,
    CollapseContainerComponent,
    AdvTableComponent
  ],
  imports: [CommonModule, GridsterModule, SharedModule, ExtendedModule],
  providers: [TaskService, AuthService]
})
export class TaskModule {}
