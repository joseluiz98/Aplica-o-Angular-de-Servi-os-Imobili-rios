import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarImovelComponent } from './cadastrar-imovel.component';

describe('CadastrarImovelComponent', () => {
  let component: CadastrarImovelComponent;
  let fixture: ComponentFixture<CadastrarImovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarImovelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
