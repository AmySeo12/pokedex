import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'order'
})
export class OrdePipe implements PipeTransform {

  transform(items: any[], terms: string): any[] {
		console.log(items)
		if(!items) return [];
		if(!terms) return items;
		terms = terms;
    return items.filter( it => {
      return it==it;
		});
		
	}

}
