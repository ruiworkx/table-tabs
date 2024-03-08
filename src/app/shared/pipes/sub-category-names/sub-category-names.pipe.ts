import { Pipe, PipeTransform } from '@angular/core';
import { SubCategory } from '../../models';

@Pipe({
  name: 'subCategoryNames'
})
export class SubCategoryNamesPipe implements PipeTransform {
  transform(subCategories: Array<SubCategory>): string {
    return subCategories.map(sub => sub.name).join(', ');
  }
}