import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Imovel } from '../shared/entidades/imovel';
import { ImoveisService } from '../shared/services/imoveis.service';
import { ProprietariosService } from '../shared/services/proprietarios.service';

@Component({
  selector: 'app-lista-imoveis',
  templateUrl: './lista-imoveis.component.html',
  styleUrls: ['./lista-imoveis.component.scss'],
})
export class ListaImoveisComponent implements OnInit, OnDestroy {
  public imoveis: Imovel[] = [];
  private subs$: Subscription[] = [];

  constructor(
    private imoveisService: ImoveisService,
    private proprietariosService: ProprietariosService
  ) {}

  public ngOnInit() {
    this.listaImoveis();

    // Exemplo de comunicaçkão via service
    let escutaImovelSendoCriado$ = this.imoveisService
      .imovelFoiCriado()
      .subscribe(() => {
        // Faz refresh da lista de imoveis quando um novo imóvel é cadastrado
        this.listaImoveis();
      });
  }

  public listaImoveis(): void {
    this.imoveisService.get().subscribe((imoveis) => {
      this.imoveis = imoveis;

      // Busca pelos proprietarios dos imóveis encontrados
      this.imoveis.forEach((imovel) => {
        this.proprietariosService
          .getById(imovel.proprietarioId)
          .subscribe((proprietario) => (imovel.proprietario = proprietario));
      });
    });
  }

  public ngOnDestroy(): void {
    this.subs$.forEach((sub$) => sub$.unsubscribe());
  }
}
