import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core'

import { AppMessagesService } from './services/app-messages.service'

@Directive({
  selector: '[ezShopConfirmableClick]',
})
export class ConfirmableClickDirective {
  @Input('ezShopConfirmableClick') message = 'Are you sure?'
  @Input() actionName = 'Yes'
  @Output() clickConfirmed = new EventEmitter()

  constructor(private el: ElementRef, private messagesService: AppMessagesService) {
    el.nativeElement.style.backgroundColor = 'yellow'
    el.nativeElement.style.color = 'red'
  }

  @HostListener('click') onClick() {
    this.messagesService.confirmAction(this.message, this.actionName, () =>
      this.clickConfirmed.emit()
    )
  }
}
