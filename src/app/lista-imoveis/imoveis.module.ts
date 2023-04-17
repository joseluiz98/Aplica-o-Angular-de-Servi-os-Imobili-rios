import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListaImoveisComponent } from './lista-imoveis.component';
import { ImovelComponent } from './imovel/imovel.component';
import { SharedModule } from '../shared/shared.module';
import { CadastrarImovelComponent } from './imovel/cadastrar-imovel/cadastrar-imovel.component';

@NgModule({
  declarations: [ListaImoveisComponent, ImovelComponent, CadastrarImovelComponent],
  imports: [CommonModule, SharedModule],
  exports: [ListaImoveisComponent, ImovelComponent],
})
export class ImoveisModule {}
