import { Component, OnInit, ViewChild } from '@angular/core';
import { EventoModelo } from '../../modelo/evento-modelo';
import { EventosService } from '../../servicio/eventos.service';
import { IonContent } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { Router } from '@angular/router';



@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {


  cantidad_pagina:number=0;
  contador_pagina:number=1;
  bandera_inicio:number=0;
  start:number=0;
  limite:number=10;

  lista_eventos :Array<EventoModelo>=[];
  lista_fallas_calendario =[];

  loading: HTMLIonLoadingElement;
 
  @ViewChild(IonContent) content: IonContent;

  fecha_hora_evento:string='';

  isModalOpen:any=false;

  constructor(
    private evento_servicio:EventosService,
    private loadingController:LoadingController,
    private router: Router,

  ) { 
    this.activar_fechas = this.activar_fechas.bind(this);
  }

  ngOnInit() {
    this.GetEventos();
    this.GetFechasCalendario();
  }
  GetFechasCalendario(){

    this.evento_servicio.get_fechas_calendario(0,1).subscribe(data=>{
      
      let aux=JSON.parse(JSON.stringify(data)) ;
      this.lista_fallas_calendario =[ [JSON.parse(aux.datos[0].fechas_calendario)][0] ][0];
    },error=>{

      console.log("ver errores ",JSON.stringify(error));

    }) 

  }
  activar_fechas(dateIsoString: string) {
    const date = new Date(dateIsoString);
    console.log("fecha ac",dateIsoString);
    
    const aux = this.lista_fallas_calendario.find(fecha => fecha == dateIsoString);
    if(aux){
      return true;
    }else{
      return false;
    }
  }
  ver_detalle(id:number,origen:string,destino:string){

    this.router.navigate(['/eventos-detalle/'+id,origen+' - '+destino]);

  }
  abrir_filtros(){
    this.fecha_hora_evento=new Date().toISOString();
    this.isModalOpen=true;
  }
  aplicar_filtros(){

    this.formatDate(this.fecha_hora_evento);
    this.isModalOpen=false;
  }

  cerrar_filtros(){
    this.isModalOpen=false;
  }
  formatDate(fecha:any){
    const date = moment(fecha);

    this.fecha_hora_evento=date.format('D/M/YYYY');
    this.bandera_inicio=0;
    this.contador_pagina=1;
    console.log( this.fecha_hora_evento);
    
    this.GetEventos();

  }
  pagina_siguiente(){
    
    if(this.contador_pagina+1<=this.cantidad_pagina){
      this.content.scrollToTop();
      this.contador_pagina++;
      this.start=this.start+this.limite;
      this.GetEventos();
    }
  }
  pagina_anterior(){
    
    if(this.contador_pagina-1>=1){
      this.content.scrollToTop();
      this.contador_pagina--;
      this.start=this.start-this.limite;
      this.GetEventos();
    }
  }
  pagina_inicio(){
    
    if(this.contador_pagina!=1){
      this.content.scrollToTop();
      this.contador_pagina=1;
      this.start=0;
      this.GetEventos();
    }

  }
  pagina_final(){
    
    if(this.cantidad_pagina>1 && this.contador_pagina!=this.cantidad_pagina){
      this.content.scrollToTop();
      this.contador_pagina=this.cantidad_pagina;
      this.start=(this.limite*this.cantidad_pagina)-this.limite;
      this.GetEventos();
    }

  }

  async GetEventos(){
    
    await this.mostrar_loading();
    this.get_eventos_servicio(); 
    
  }
  get_eventos_servicio(){

    this.evento_servicio.get_eventos(this.start,this.limite,this.fecha_hora_evento).subscribe(data=>{
      
      this.bandera_inicio++;
      this.lista_eventos=JSON.parse(JSON.stringify(data)).datos;
      console.log(data);

      if(this.bandera_inicio==1){
        if(Number(this.cantidad_pagina=Math.round(JSON.parse(JSON.stringify(data)).total)) <10){
          this.cantidad_pagina=1;
        }else{
          this.cantidad_pagina=Math.ceil((JSON.parse(JSON.stringify(data)).total)/this.limite);
          
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
