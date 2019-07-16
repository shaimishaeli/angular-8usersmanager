import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginFormComponent } from './user/login/login-form.component';
import { RegistrationFormComponent } from './user/registration/registration-form.component';
import { UserDataFormComponent } from './user/user-data-form/user-data-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserGridComponent } from './user/user-list-ag-grid/user-grid.component';
import { SharedModule } from './shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { EditUserDialogComponent } from './user/edit-user-dialog/edit-user-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    UserDataFormComponent,
    UserListComponent,
    UserGridComponent,
    EditUserDialogComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [EditUserDialogComponent],
  entryComponents: [EditUserDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
