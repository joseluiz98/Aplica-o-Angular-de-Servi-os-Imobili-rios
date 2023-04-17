import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { filter, Subscription } from 'rxjs';
import { Endereco } from '../../../shared/entidades/endereco';

import { Imovel } from '../../../shared/entidades/imovel';
import { Estados } from '../../../shared/estados';
import { BuscaCepService } from '../../../shared/services/busca-cep.service';

@Component({
  selector: 'app-cadastrar-imovel',
  templateUrl: './cadastrar-imovel.component.html',
  styleUrls: ['./cadastrar-imovel.component.scss'],
})
export class CadastrarImovelComponent {
  public form: FormGroup = new FormGroup('');
  public cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  private subs$: Subscription[] = [];
  public estados = Estados;

  constructor(
    public dialogRef: MatDialogRef<CadastrarImovelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Imovel,
    private _snackBar: MatSnackBar,
    private cepService: BuscaCepService,
    private fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.form = this.fb.group({
      id: '',
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      valor: ['', Validators.required],
      condominio: ['', Validators.required],
      quartos: ['', Validators.required],
      banheiros: ['', Validators.required],
      mobiliado: ['', Validators.required],
      area: ['', Validators.required],
      venda: ['', Validators.required],
      aluguel: ['', Validators.required],
      dataAnuncio: '',
      proprietario: ['', Validators.required],
      endereco: this.fb.group({
        id: '',
        rua: ['', Validators.required],
        numero: ['', Validators.required],
        bairro: ['', Validators.required],
        cidade: ['', Validators.required],
        uf: ['', Validators.required],
        cep: ['', Validators.required],
      }),
    });

    let control$ = this.form
      ?.get('endereco.cep')
      ?.valueChanges.pipe(
        filter((value) => value !== '' && !value.includes('_'))
      )
      .subscribe((value) => this.buscaCep());

    this.form.valueChanges.subscribe(() => {
      console.clear();
      console.log(this.form.value);
    });

    if (!!control$) this.subs$.push(control$);
  }

  public onClose(submit?: boolean): void {
    if (!!submit) {
      // Insere a data do ankúncio (poderia ser feito no backend também, seria inclusive mais correto)
      this.form.get('dataAnuncio')?.patchValue(new Date().toISOString());
      this.dialogRef.close(this.form.value);
    } else {
      this.dialogRef.close();
    }
  }

  public buscaCep(): void {
    let cep: string = this.form?.get('endereco.cep')?.value;

    if (cep.includes('-')) {
      cep = cep.replaceAll('-', '');
    }

    this.cepService.buscar(cep).subscribe(
      (response) => {
        let endereco: Endereco = response;
        endereco.rua = response.logradouro;
        endereco.cidade = response.localidade;
        this.form?.patchValue({ endereco }, { emitEvent: false });
      },
      () => {
        this._snackBar.open('Dados inválidos!', 'Okay!', {
          horizontalPosition: 'right',
        });
      }
    );
  }

  public compareFn(a: string, b: string): boolean {
    return a === b;
  }

  public escolheTipoContrato(valor: string): void {
    if (valor === 'aluguel') {
      this.form.get('aluguel')?.patchValue(true);
      this.form.get('venda')?.patchValue(false);
    } else {
      this.form.get('aluguel')?.patchValue(false);
      this.form.get('venda')?.patchValue(true);
    }
  }

  public ngOnDestroy(): void {
    this.subs$.forEach((sub) => sub.unsubscribe());
  }
}
