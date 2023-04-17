import { Photo } from 'pexels';

import { TipoImovel } from '../tipo-imovel';
import { Endereco } from './endereco';
import { Proprietario } from './proprietario';

export class Imovel {
  public id: number = 0;
  public nome: string = '';
  public tipo: TipoImovel = TipoImovel.APARTAMENTO;
  public valor: number = 0;
  public condominio: number = 0;
  public quartos: number = 0;
  public banheiros: number = 0;
  public mobiliado: boolean = false;
  public area: number = 0;
  public venda: boolean = false;
  public aluguel: boolean = false;
  public dataAnuncio: string = '';
  public endereco: Endereco = new Endereco();
  public proprietarioId: number = 0;
  public fotos: Photo[] = [];
  public proprietario: Proprietario = new Proprietario();
}
