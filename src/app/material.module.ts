import { NgModule } from '@angular/core'
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material'
import { MatCheckboxModule } from '@angular/material/checkbox'

@NgModule({
  imports: [
    MatPaginatorModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatTableModule,
    MatCheckboxModule,
  ],
  exports: [
    MatPaginatorModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatTooltipModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTableModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
  ],
})
export class MaterialModule {}
