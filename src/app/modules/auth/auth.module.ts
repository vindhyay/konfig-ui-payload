import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/modules/shared/shared.module";
import { LoginComponent } from "./components/login/login.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  imports: [RouterModule.forChild(routes), SharedModule],
})
export class AuthModule {}
