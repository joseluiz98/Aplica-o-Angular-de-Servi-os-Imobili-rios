import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Imovel } from '../shared/entidades/imovel';
import { ImoveisService } from '../shared/services/imoveis.service';
import { ProprietariosService } from '../shared/services/proprietarios.service';
import { CadastrarImovelComponent } from './imovel/cadastrar-imovel/cadastrar-imovel.component';

@Component({
  selector: 'app-lista-imoveis',
  templateUrl: './lista-imoveis.component.html',
  styleUrls: ['./lista-imoveis.component.scss'],
})
export class ListaImoveisComponent implements OnInit {
  public imoveis: Imovel[] = [];

  constructor(
    public dialog: MatDialog,
    private imoveisService: ImoveisService,
    private proprietariosService: ProprietariosService,
    private _snackBar: MatSnackBar
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CadastrarImovelComponent, {
      data: { name: 'teste' },
    });

    dialogRef.afterClosed().subscribe((form) => {
      if (!!form) {
        this.imoveisService.create(form).subscribe(
          (value) => {
            debugger;

            this._snackBar.open('Anúncio salvo com sucesso!!', 'Okay!', {
              horizontalPosition: 'right',
            });
          },
          () => {
            this._snackBar.open('Dados inválidos!', 'Okay!', {
              horizontalPosition: 'right',
            });
          }
        );
      }
    });
  }

  public ngOnInit() {
    this.openDialog();
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
}
