import { Model } from './model';

export class Proprietario extends Model {
  public nome: string = '';
  public imovelId: number = 0;

  constructor(nome: string = '', imovelId: number = 0) {
    super();
    this.nome = nome;
    this.imovelId = imovelId;
  }
}
