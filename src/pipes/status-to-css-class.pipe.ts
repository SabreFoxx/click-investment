import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusToCssClass'
})
export class StatusToCssClassPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if (value == 'SUCCESS' || value == 'DISBURSED')
      return 'success'
    else if (value == 'PENDING')
      return 'pending'
    else if (value == 'FAILED' || value == 'REJECTED')
      return 'failure'
    else
      return ''
  }

}
