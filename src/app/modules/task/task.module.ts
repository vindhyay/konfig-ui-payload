import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PayloadDetailsComponent} from "./payload-details/payload-details.component";
import {PayloadViewFormComponent} from "./payload-details/view-form/payload-view-form.component";
import {PayloadFormFieldComponent} from "./payload-form-field/payload-form-field.component";
import {FinlevitGridComponent} from "./finlevit-grid/finlevit-grid.component";
import {DropdownFieldComponent} from "./payload-form-field/dropdown-field/dropdown-field.component";
import {CheckboxGroupComponent} from "./payload-form-field/checkbox-group/checkbox-group.component";
import {GridsterModule} from "../../../../lib/angular-gridster2/src/lib/gridster.module";
import {TaskService} from "./services/task.service";
import {AuthService} from "../auth/services/auth.service";
import {SharedModule} from "../shared/shared.module";
import {ExtendedModule} from "@angular/flex-layout";


@NgModule({
    declarations: [PayloadDetailsComponent, PayloadViewFormComponent, PayloadFormFieldComponent, FinlevitGridComponent,DropdownFieldComponent, CheckboxGroupComponent],
    imports: [CommonModule, GridsterModule,
        SharedModule, ExtendedModule],
    providers: [TaskService, AuthService]
})
export class TaskModule { }