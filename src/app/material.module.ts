import { NgModule } from '@angular/core'
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material'
import { MatCheckboxModule } from '@angular/material/checkbox'

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
  ],
})
export class MaterialModule {}
