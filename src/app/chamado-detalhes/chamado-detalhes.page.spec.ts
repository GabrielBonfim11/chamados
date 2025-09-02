import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChamadoDetalhesPage } from './chamado-detalhes.page';

describe('ChamadoDetalhesPage', () => {
  let component: ChamadoDetalhesPage;
  let fixture: ComponentFixture<ChamadoDetalhesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamadoDetalhesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
