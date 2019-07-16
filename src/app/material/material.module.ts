import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatSortModule,
  MatTableModule,
  MatListModule,
  MatIconModule,
  MatTabsModule,
  MatDialogModule,
  MAT_DATE_LOCALE
} from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const modules = [
  MatDialogModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  FormsModule,
  ReactiveFormsModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatSortModule,
  MatTableModule,
  MatListModule,
  MatIconModule,
  MatTabsModule,
  MatMenuModule,
  CommonModule
];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ]
})
export class MaterialModule { }