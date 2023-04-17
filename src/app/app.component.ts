import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CadastrarImovelComponent } from './lista-imoveis/imovel/cadastrar-imovel/cadastrar-imovel.component';
import { Proprietario } from './shared/entidades/proprietario';
import { ImoveisService } from './shared/services/imoveis.service';
import { ProprietariosService } from './shared/services/proprietarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'jose-imoveis';

  constructor(
    public dialog: MatDialog,
    private imoveisService: ImoveisService,
    private proprietariosService: ProprietariosService,
    private _snackBar: MatSnackBar
  ) {}

  public anunciar(): void {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CadastrarImovelComponent, {});

    dialogRef.afterClosed().subscribe((imovel) => {
      if (!!imovel) {
        this.imoveisService.create(imovel).subscribe(
          (imovelCriado) => {
            let proprietario = new Proprietario(
              imovel.proprietario,
              imovelCriado.id
            );

            // Cria o proprietario
            this.proprietariosService
              .create(proprietario)
              .subscribe((proprietarioCriado) => {
                this._snackBar.open('Anúncio salvo com sucesso!!', 'Okay!', {
                  horizontalPosition: 'right',
                });

                // Vincula o proprietario ao imovel
                imovelCriado.proprietarioId = proprietarioCriado.id;
                this.imoveisService.update(imovelCriado).subscribe(() => {
                  // Finaliza o processo de criação
                  this.imoveisService.notificaImovelCriado(imovelCriado);
                });
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
}
