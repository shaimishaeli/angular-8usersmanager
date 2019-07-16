import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DialogComponent } from './dialog/dialog.component';
import { LogoutComponent } from './logout.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    DialogComponent,
    LogoutComponent
  ],
  declarations: [
    DialogComponent,
    LogoutComponent
  ],
  entryComponents: [
    DialogComponent
  ]
})
export class SharedModule { }
