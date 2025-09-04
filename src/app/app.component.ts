import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { testarFirebase } from './test-firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor() {}
  
  async ngOnInit() {
    // Testar Firebase na inicialização
    console.log('🚀 Iniciando teste do Firebase...');
    const resultado = await testarFirebase();
    
    if (resultado.success) {
      console.log('✅ Firebase funcionando:', resultado.message);
    } else {
      console.error('❌ Problema com Firebase:', resultado.message, resultado.error);
    }
  }
}
