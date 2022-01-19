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
import { ModalComponent } from "./payload-form-field/modal/modal.component";
import { CollapseContainerComponent } from "./payload-form-field/collapse-container/collapse-container.component";
import { PasswordFieldComponent } from "./payload-form-field/password-field/password-field.component";
import { PhonenumberFieldComponent } from "./payload-form-field/phonenumber-field/phonenumber-field.component";
import { ssnInputFieldComponent } from "./payload-form-field/ssninput-field/ssninput-field.component";
import { VerticalStepperComponent } from "./payload-form-field/vertical-stepper/vertical-stepper.component";
import { DividerComponent } from "./payload-form-field/divider/divider.component";
import { SpacerComponent } from "./payload-form-field/spacer/spacer.component";
import { ContainerComponent } from "./payload-form-field/container/container.component";
import { IconComponent } from "./payload-form-field/icon/icon.component";
import { CustomAdvTableComponent } from "./payload-form-field/custom-adv-table/custom-adv-table.component";
import { ImageComponent } from "./payload-form-field/image/image.component";
import { AvatarComponent } from "./payload-form-field/avatar/avatar.component";
import { TooltipModule } from "primeng/tooltip";
import { AvatarModule } from "primeng/avatar";

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
    PhonenumberFieldComponent,
    ssnInputFieldComponent,
    PasswordFieldComponent,
    VerticalStepperComponent,
    DividerComponent,
    SpacerComponent,
    ContainerComponent,
    IconComponent,
    CustomAdvTableComponent,
    ImageComponent,
    AvatarComponent,
  ],
  imports: [CommonModule, GridsterModule, SharedModule, ExtendedModule, TooltipModule, AvatarModule],
  providers: [TaskService, AuthService],
})
export class TaskModule {}
