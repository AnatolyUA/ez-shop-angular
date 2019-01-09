import { InjectorInstance } from '../app.module'
import { AppMessagesService } from './services/app-messages.service'

export function confirmable(
  messageTemplate: string = 'Are you sure?',
  confirmActionName = 'Yes'
): MethodDecorator {
  const messagesService = InjectorInstance.get<AppMessagesService>(AppMessagesService)
  const processTemplate = (template: string, arg: any) => {
    const getArgAsString = (propertyName: string) => {
      if (!arg) {
        return ''
      }

      if (!propertyName) {
        return '' + arg
      }

      return arg[propertyName] ? '' + arg[propertyName] : ''
    }

    let result = template
    const myregexp = /\{(.*?)\}/gi
    let match = myregexp.exec(template)
    while (match != null) {
      for (let i = 0; i < match.length; i++) {
        result = result.replace(match[0], getArgAsString(match[1]))
      }
      match = myregexp.exec(template)
    }

    return result
  }

  return (target: Function, key: string, descriptor: any) => {
    const originalMethod = descriptor.value

    descriptor.value = function(...args: any[]) {
      const message = processTemplate(messageTemplate, args[0])
      messagesService.confirmAction(message, confirmActionName, () =>
        originalMethod.apply(this, args)
      )
    }
    return descriptor
  }
}

export function log(): MethodDecorator {
  return function(target: Function, key: string, descriptor: any) {
    const originalMethod = descriptor.value

    descriptor.value = function(...args: any[]) {
      console.log(`Entering ${key} method`)
      const result = originalMethod.apply(this, args)
      console.log(`Leaving ${key} method`)

      return result
    }

    return descriptor
  }
}
