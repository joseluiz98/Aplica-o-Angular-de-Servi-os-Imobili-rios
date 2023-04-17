import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpBaseService } from './http-base.service';
import { Imovel } from '../entidades/imovel';

@Injectable({
  providedIn: 'root',
})
export class ImoveisService extends HttpBaseService<Imovel> {
  constructor(public override http: HttpClient) {
    super(http, 'imovel');
  }
}
