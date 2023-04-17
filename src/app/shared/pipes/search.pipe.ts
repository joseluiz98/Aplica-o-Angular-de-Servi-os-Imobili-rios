import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any[], termToSearch: string): any[] {
    if (!value || value.length <= 0) {
      return value;
    }

    if (value.length > 0 && termToSearch !== '') {
      return value.filter((x) =>
        x.nome.toLowerCase().includes(termToSearch.toLowerCase())
      );
    }

    return value;
  }
}
