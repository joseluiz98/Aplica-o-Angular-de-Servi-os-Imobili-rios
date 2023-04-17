import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Imovel } from '../../shared/entidades/imovel';
import { PhotosService } from '../../shared/services/photos.service';

@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.scss'],
})
export class ImovelComponent implements OnChanges {
  @Input() public imovel: Imovel = new Imovel();

  constructor(private photosService: PhotosService) {}

  // Busca a foto exemplo do imóvel em API de terceiros
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['imovel'] && changes['imovel'].currentValue.id) {
      this.photosService.getImages().subscribe((photos) => {
        this.imovel.fotos = photos;
      });
    }
  }
}
