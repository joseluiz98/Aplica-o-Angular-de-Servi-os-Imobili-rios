import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { HttpBaseService } from './http-base.service';
import { Endereco } from '../entidades/endereco';

@Injectable({
  providedIn: 'root',
})
export class BuscaCepService extends HttpBaseService<Endereco> {
  constructor(public override http: HttpClient) {
    super(http, 'ws', 'http://viacep.com.br');
  }

  public buscar(value: string): Observable<any> {
    return this.getById(`${value}/json`).pipe(map((value) => value));
  }
}
