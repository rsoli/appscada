import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(private oneSignal: OneSignal) { 

    this.configuracionInicial();
  }
  configuracionInicial(){
    this.oneSignal.startInit('dfc2e8d2-2218-4551-b17e-76343b8b3014', '890042630033');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
    
    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
     // do something when notification is received
     console.log("Notificacion recibida ",noti);
    });
    
    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      // do something when a notification is opened
      console.log("Notificacion abierta ",noti);
    });
    
    this.oneSignal.endInit();
  }
}
