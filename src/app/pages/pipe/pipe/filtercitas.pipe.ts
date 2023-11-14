import { Pipe, PipeTransform } from '@angular/core';
import { Citas } from 'app/model/citas';
import { Pacientes } from 'app/model/pacientes';

@Pipe({
  name: 'filtercitas'
})
export class FiltercitasPipe implements PipeTransform {

  transform(Cirugias: any[], query: string):any {
    if(!Cirugias) return [];
    if(!query) return [];
    query= query.toLocaleLowerCase();

    return Cirugias.filter(c =>{
      return c.name.toLocaleLowerCase().includes(query);
    });
  }
}

