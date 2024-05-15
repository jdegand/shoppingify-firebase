import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../interfaces/item.interface';

@Pipe({
  name: 'nameFilter',
  standalone: true
})
export class NameFilterPipe implements PipeTransform {

  transform(data: Item[], searchTerm: string) {
    if (!data || !searchTerm) {
      return data;
    }

    return data.filter((item:Item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}
