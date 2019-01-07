import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material'

@Injectable({
  providedIn: 'root',
})
export class AppMessagesService {
  constructor(private snackBar: MatSnackBar) {}

  public confirmAction(message: string, actionName: string, action: Function): void {
    const snack = this.snackBar.open(message, actionName, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'danger',
    })
    snack.onAction().subscribe(() => action())
  }
}
