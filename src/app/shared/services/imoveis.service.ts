import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { HttpBaseService } from './http-base.service';
import { Imovel } from '../entidades/imovel';

@Injectable({
  providedIn: 'root',
})
export class ImoveisService extends HttpBaseService<Imovel> {
  private imovelCriadoSubject = new Subject<Imovel>();
  private imovelCriado$ = this.imovelCriadoSubject.asObservable();

  constructor(public override http: HttpClient) {
    super(http, 'imovel');
  }

  public notificaImovelCriado(imovel: Imovel): void {
    this.imovelCriadoSubject.next(imovel);
  }

  public imovelFoiCriado(): Observable<Imovel> {
    return this.imovelCriado$;
  }
}
