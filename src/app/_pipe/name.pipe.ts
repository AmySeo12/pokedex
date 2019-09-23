import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(items: any[], terms: string): any[] {
		if(!items) return [];
		if(!terms) return items;
		terms = terms;
		return items.filter( it => {
      return  it.name.toLowerCase().includes(terms);
      })
		});
	}

}
