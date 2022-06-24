import { EventEmitter, Injectable } from '@angular/core';
import { OneSignal, OSNotification, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
//import{Storage} from '@ionic/storage';
 import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class PushService {


  mensajes:OSNotificationPayload[]=[
    // {
    //   title:'Titulo de la push',
    //   body:'Este es el body de la push',
    //   date: new Date()
    // }
  ];

  pushListener = new EventEmitter<OSNotificationPayload>();
  constructor(
    private oneSignal: OneSignal,
    private storage: Storage
    ) { 

    this.storage.create()
    this.configuracionInicial();
    this.cargarMensajes();
  }
  async getMensajes(){
    
    await this.cargarMensajes();
    return [...this.mensajes];//operador prep verifica que sen siempre nuevo
  }
  configuracionInicial(){
    this.oneSignal.startInit('dfc2e8d2-2218-4551-b17e-76343b8b3014', '890042630033');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    
    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
     // do something when notification is received
     console.log("Notificacion recibida ",noti);
     this.notificacionRecibida(noti);
    });
    
    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      // do something when a notification is opened
      console.log("Notificacion abierta ",noti);
    });
    
    this.oneSignal.endInit();
  }
  async notificacionRecibida(noti:OSNotification){
    await this.cargarMensajes();
    const payload = noti.payload;
    const existePush = this.mensajes.find(mensaje=>mensaje.notificationID===payload.notificationID);
    if(existePush){
      return;
    }
    this.mensajes.unshift(payload);
    this.pushListener.emit(payload);
    this.guardarMensajes();
  }
  guardarMensajes(){
    this.storage.set('mensajes',this.mensajes);
  }
  async cargarMensajes(){
    
     this.mensajes= await this.storage.get('mensajes') || [];
  }
}
