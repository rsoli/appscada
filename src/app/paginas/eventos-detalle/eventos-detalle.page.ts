import { Component, OnInit, ViewChild } from '@angular/core';
import { EventoDetalleModelo } from '../../modelo/evento-detalle-modelo';
import { EventosDetalleService } from '../../servicio/eventos-detalle.service';
import { IonContent } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-eventos-detalle',
  templateUrl: './eventos-detalle.page.html',
  styleUrls: ['./eventos-detalle.page.scss'],
})
export class EventosDetallePage implements OnInit {

  start:number=0;
  limite:number=10000;

  lista_eventos_detalle :Array<EventoDetalleModelo>=[];

  loading: HTMLIonLoadingElement;
 
  @ViewChild(IonContent) content: IonContent;

  fecha_hora_evento:string='';
  id_evento:number=0;
  origen_destino:string='';
  constructor(
    private evento_detalle_servicio:EventosDetalleService,
    private loadingController:LoadingController,
    private rutaActiva: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id_evento=this.rutaActiva.snapshot.params.id;
    this.origen_destino=this.rutaActiva.snapshot.params.origen_destino;
    this.GetEventosDetalle();
   
  }
  async GetEventosDetalle(){
    
    await this.mostrar_loading();
    this.get_eventos_detalle_servicio();
    
  }
  get_eventos_detalle_servicio(){

    this.evento_detalle_servicio.get_evento_detalle(this.start,this.limite,this.id_evento).subscribe(data=>{
      
      this.lista_eventos_detalle=JSON.parse(JSON.stringify(data)).datos;
      console.log(data);

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
