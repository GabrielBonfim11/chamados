import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonInput, IonTextarea, IonSelect, IonSelectOption, IonButton, IonIcon, IonList, IonRadioGroup, IonRadio } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ChamadosService } from '../services/chamados.service';
import { addIcons } from 'ionicons';
import { cloudUploadOutline, imageOutline, videocamOutline, closeCircleOutline, checkmarkCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-criar-chamado',
  templateUrl: './criar-chamado.page.html',
  styleUrls: ['./criar-chamado.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonBackButton, 
    IonItem, 
    IonLabel, 
    IonInput, 
    IonTextarea, 
    IonSelect, 
    IonSelectOption, 
    IonButton, 
    IonIcon,
    IonList,
    IonRadioGroup,
    IonRadio
  ]
})
export class CriarChamadoPage implements OnInit {
  chamadoForm!: FormGroup;
  categorias: string[] = ['TI', 'Elétrica', 'Manutenção Predial', 'Transporte', 'Outro'];
  prioridades: string[] = ['Alta', 'Média', 'Baixa'];
  anexos: { nome: string; tipo: 'imagem' | 'video'; arquivo: File; url?: string }[] = [];
  anexoSelecionado: File | null = null;
  mensagem: string = '';
  tipoMensagem: 'sucesso' | 'erro' | '' = '';
  document: any;

  constructor(
    private formBuilder: FormBuilder,
    private chamadosService: ChamadosService,
    private router: Router
  ) {
    addIcons({
      cloudUploadOutline,
      imageOutline,
      videocamOutline,
      closeCircleOutline,
      checkmarkCircleOutline
    });
  }

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {
    this.chamadoForm = this.formBuilder.group({
      solicitante: ['', [Validators.required]],
      local: ['', [Validators.required]],
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      prioridade: ['Média', [Validators.required]],
      categoria: ['', [Validators.required]],
      contato: ['', [Validators.required]]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Verifica se é imagem ou vídeo
      let tipo: 'imagem' | 'video' = 'imagem';
      if (file.type.startsWith('video/')) {
        tipo = 'video';
      } else if (file.type.startsWith('image/')) {
        tipo = 'imagem';
      }
      
      const anexo = {
        nome: file.name,
        tipo: tipo,
        arquivo: file,
        url: URL.createObjectURL(file) // Cria URL temporária para preview
      };
      this.anexos.push(anexo);
      this.anexoSelecionado = file.name;
      
      // Limpa o input para permitir selecionar o mesmo arquivo novamente
      event.target.value = '';
    }
  }

  adicionarAnexo() {
    if (this.anexoSelecionado) {
      const tipo = this.anexoSelecionado.type.startsWith('image/') ? 'imagem' : 'video';
      this.anexos.push({
        nome: this.anexoSelecionado.name,
        tipo: tipo,
        arquivo: this.anexoSelecionado
      });
      this.anexoSelecionado = null;
      // Limpar o input de arquivo
      const fileInput = document.getElementById('anexo-input') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
  }

  removerAnexo(index: number) {
    this.anexos.splice(index, 1);
  }

  salvarChamado() {
    if (this.chamadoForm.valid) {
      const formData = this.chamadoForm.value;
      
      // Criar objeto de anexos no formato esperado pelo serviço
      const anexosFormatados = this.anexos.map((anexo, index) => ({
        id: index + 1,
        nome: anexo.nome,
        tipo: anexo.tipo,
        url: anexo.url || (anexo.tipo === 'imagem' ? 'assets/images/exemplo-erro-rede.svg' : 'assets/placeholder-video.mp4')
      }));
      
      // Adicionar chamado usando o serviço
      this.chamadosService.adicionarChamado({
        titulo: `Chamado de ${formData.categoria} - ${formData.local}`,
        descricao: formData.descricao,
        data: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        prioridade: formData.prioridade,
        status: 'aberto',
        solicitante: formData.solicitante,
        local: formData.local,
        contato: formData.contato,
        categoria: formData.categoria,
        comentarios: [],
        anexos: anexosFormatados
      });
      
      this.tipoMensagem = 'sucesso';
      this.mensagem = 'Chamado criado com sucesso!';
      
      // Limpar formulário e anexos
      setTimeout(() => {
        this.router.navigate(['/chamados']);
      }, 2000);
    } else {
      this.tipoMensagem = 'erro';
      this.mensagem = 'Por favor, preencha todos os campos obrigatórios.';
      this.marcarCamposInvalidos();
    }
  }

  marcarCamposInvalidos() {
    Object.keys(this.chamadoForm.controls).forEach(campo => {
      const controle = this.chamadoForm.get(campo);
      if (controle?.invalid) {
        controle.markAsTouched();
      }
    });
  }

  fecharMensagem() {
    this.mensagem = '';
    this.tipoMensagem = '';
  }
}
