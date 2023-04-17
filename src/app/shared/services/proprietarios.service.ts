import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpBaseService } from './http-base.service';
import { Proprietario } from '../entidades/proprietario';

@Injectable({
  providedIn: 'root',
})
export class ProprietariosService extends HttpBaseService<Proprietario> {
  constructor(public override http: HttpClient) {
    super(http, 'proprietario');
  }
}
