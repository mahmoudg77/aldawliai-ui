import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockPipe'
})
export class StockPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
