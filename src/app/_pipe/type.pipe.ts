import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {

  transform(items: any[], terms: string): any[] {
		if(!items) return [];
		if(!terms) return items;
		terms = terms;
		console.log(typeof terms);
		if(terms == "name" || terms == "tipo"){
			return items.filter( it => {
				return it.typeName.length > 0 || it.typeName.length == 0
			});
		} else{
			return items.filter( it => {
				return it.typeName[0] == terms
			});
		}
		
	}

}
