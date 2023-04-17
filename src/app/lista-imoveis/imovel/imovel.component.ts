import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Imovel } from '../../shared/entidades/imovel';
import { ImoveisService } from '../../shared/services/imoveis.service';
import { PhotosService } from '../../shared/services/photos.service';
import { ProprietariosService } from '../../shared/services/proprietarios.service';

@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.scss'],
})
export class ImovelComponent implements OnChanges {
  @Input() public imovel: Imovel = new Imovel();
  @Output() public refreshList = new EventEmitter();

  constructor(
    private imoveisService: ImoveisService,
    private proprietariosService: ProprietariosService,
    private photosService: PhotosService,
    private _snackBar: MatSnackBar
  ) {}

  // Busca a foto exemplo do imóvel em API de terceiros
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['imovel'] && changes['imovel'].currentValue.id) {
      this.photosService.getImages(this.imovel.id).subscribe((photos) => {
        this.imovel.fotos = photos;
      });
    }
  }

  public alugarOuComprar(imovel: Imovel) {
    // Remove o imóvel
    this.imoveisService.delete(imovel.id).subscribe(
      () => {
        // Remove o proprietario
        this.proprietariosService
          .delete(imovel.proprietarioId)
          .subscribe(() => {
            // Conclui o processo de deleção
            this._snackBar.open('Imóvel adquirido com sucesso!!', 'Okay!', {
              horizontalPosition: 'right',
            });
            this.refreshList.emit();
          });
      },
      () => {
        this._snackBar.open('Houve um erro, tente novamente', 'Okay!', {
          horizontalPosition: 'right',
        });
      }
    );
  }

  public remove(imovel: Imovel) {
    // Remove o imóvel
    this.imoveisService.delete(imovel.id).subscribe(
      () => {
        // Remove o proprietario
        this.proprietariosService
          .delete(imovel.proprietarioId)
          .subscribe(() => {
            // Conclui o processo de deleção
            this._snackBar.open('Anúncio removido com sucesso!!', 'Okay!', {
              horizontalPosition: 'right',
            });
            this.refreshList.emit();
          });
      },
      () => {
        this._snackBar.open('Houve um erro, tente novamente', 'Okay!', {
          horizontalPosition: 'right',
        });
      }
    );
  }
}
