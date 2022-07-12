import { ApplicationRef, Component, OnInit } from '@angular/core';
import { OSNotificationPayload } from '@ionic-native/onesignal';
import { PushService } from '../../servicio/push.service';
import { App } from '@capacitor/app';
import { IonRouterOutlet, Platform } from '@ionic/angular';

interface Componente{
  icon: string;
  name: string;
  redirecTo: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  componentes:Componente[]=[
    {
      icon: 'american-football',
      name:'Fallas',
      redirecTo:'/fallas'
    }
  ];

  mensajes:OSNotificationPayload[]=[];
  constructor(
    public pushService:PushService,
    private applicationRef: ApplicationRef,
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
    
    
  ) { 
    
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }

    });
    
  }

  ngOnInit() {
    this.pushService.pushListener.subscribe(noti=>{
      this.mensajes.unshift(noti);
      this.applicationRef.tick(); //verifica de nuevo que tenga datos
    });

  }
  async ionViewWillEnter(){
    this.mensajes= await this.pushService.getMensajes();
  }
  async borrarMensajes(){
    await this.pushService.borrarMensajes();
    this.mensajes=[];
  }
}
