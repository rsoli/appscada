import { Component, OnInit,ViewChild  } from '@angular/core';
import { TurnoModelo } from '../../modelo/turno-modelo';
import { MantenimientosService } from '../../servicio/mantenimientos.service';
import { IonContent } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-turno',
  templateUrl: './turno.page.html',
  styleUrls: ['./turno.page.scss'],
})
export class TurnoPage implements OnInit {


  cantidad_pagina:number=0;
  contador_pagina:number=1;
  bandera_inicio:number=0;
  start:number=0;
  limite:number=10;
  fecha_turno:any;

  lista_turnos :Array<TurnoModelo>=[];

  loading: HTMLIonLoadingElement;
 
  @ViewChild(IonContent) content: IonContent;

  fecha_inicio_turno:string='';
  isModalOpen:any=false;
  
  constructor(
    private mantenimiento_servicio:MantenimientosService,
    private loadingController:LoadingController,
    private callNumber: CallNumber,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.preparar_turnos();
  }
  async alerta(mensaje:string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }
  abrir_filtros(){
    this.isModalOpen=true;
  }
  aplicar_filtros(){

    this.formatDate(this.fecha_turno);
    this.isModalOpen=false;
  }

  cerrar_filtros(){
    this.isModalOpen=false;
  }
  formatDate(fecha:any){

    const date = moment(fecha);
    this.fecha_inicio_turno=String(date.format('D/M/YYYY') );
    this.preparar_turnos();

  }
  llamarContacto(contacto:string){
    if( String(contacto) !='' || String(contacto) != 'No asignado' ){
      this.callNumber.callNumber(contacto, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    }else{
      this.alerta('Personal sin contacto');
    }

  }
  async preparar_turnos(){
    
    await this.mostrar_loading();
    this.get_servicio_turnos();
    
  }
  get_servicio_turnos(){

    this.mantenimiento_servicio.get_turnos(this.start,this.limite,this.fecha_inicio_turno).subscribe(data=>{

      this.bandera_inicio++;
      this.lista_turnos=JSON.parse(JSON.stringify(data)).datos;
      
      this.fecha_inicio_turno = (moment(String(this.lista_turnos[0].fecha))).format('D/M/YYYY');
     
      if(this.bandera_inicio==1){
        if(Number(this.cantidad_pagina=Math.round(JSON.parse(JSON.stringify(data)).total)) <10){
          this.cantidad_pagina=1;
        }else{
          this.cantidad_pagina=Math.round(JSON.parse(JSON.stringify(data)).total/this.limite);
        }
        
      }
      this.ocultar_loading();
     
    },error=>{

      this.ocultar_loading();
      console.log("ver errores ",JSON.stringify(error));

    }) 

  }
  async mostrar_loading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando ...',
    });
    await this.loading.present();
  }
  ocultar_loading(){
    try {
      this.loading.dismiss();
    } catch (error) {
      console.log("Error al ocultar loading ",error);
    }
  }
}
