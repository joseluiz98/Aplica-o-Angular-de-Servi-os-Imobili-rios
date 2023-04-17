import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaImoveisComponent } from './lista-imoveis/lista-imoveis.component';

const routes: Routes = [
  {
    path: 'imoveis/lista',
    component: ListaImoveisComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
