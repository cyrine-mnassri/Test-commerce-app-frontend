import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'filterBycode'
})
export class FilterProductByProductCode implements PipeTransform{

    transform(items: any[], searchText: string, productCode: string): any[] {

        if (!items) { return []; }
    
        if (!searchText) { return items; }
    
        searchText = searchText.toLowerCase();
    
        return items.filter(item => {
          if (item && item[productCode]) {
            return item[productCode].toLowerCase().includes(searchText);
          }
          return false;
        });
       }






}