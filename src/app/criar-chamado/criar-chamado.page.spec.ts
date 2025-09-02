import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CriarChamadoPage } from './criar-chamado.page';

describe('CriarChamadoPage', () => {
  let component: CriarChamadoPage;
  let fixture: ComponentFixture<CriarChamadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarChamadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
