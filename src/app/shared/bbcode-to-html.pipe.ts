import { Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'
import { bbCodeParser } from 'js-bbcode-parser'

@Pipe({
  name: 'bbcodeToHtml',
})
export class BbcodeToHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    value = bbCodeParser.parse(value)
    return this.sanitizer.bypassSecurityTrustHtml(value)
  }
}
