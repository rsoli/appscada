import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { PushService } from './servicio/push.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private servicio_push: PushService
  ) {
    this.IniciarPush();
  }
  IniciarPush(){
    this.platform.ready().then(() => {
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();
      this.servicio_push.configuracionInicial();
    });
    
  }

}