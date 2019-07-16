import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './user/login/login-form.component';
import { RegistrationFormComponent } from './user/registration/registration-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserGridComponent } from './user/user-list-ag-grid/user-grid.component';
import { LogoutComponent } from './shared/logout.component';

const routes: Routes = [
  { path: '', component: LoginFormComponent },
  { path: 'register', component: RegistrationFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'users', component: UserListComponent },
  { path: 'usersGrid', component: UserGridComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }