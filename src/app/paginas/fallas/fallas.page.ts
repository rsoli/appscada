import { Component, OnInit, ViewChild } from '@angular/core';
import { FallaModelo } from '../../modelo/falla-modelo';
import { FallasService } from '../../servicio/fallas.service';
import { IonContent } from '@ionic/angular';
//import * as clientRestPxp from 'pxp-client'

import PxpClient from 'pxp-client';
import { LoadingController } from '@ionic/angular';

import * as moment from 'moment';



@Component({
  selector: 'app-fallas',
  templateUrl: './fallas.page.html',
  styleUrls: ['./fallas.page.scss'],
})
export class FallasPage implements OnInit {


  cantidad_pagina:number=0;
  contador_pagina:number=1;
  bandera_inicio:number=0;
  start:number=0;
  limite:number=10;

  lista_fallas :Array<FallaModelo>=[];
  lista_fallas_calendario =[];
  contador_calendario:number=0;

  loading: HTMLIonLoadingElement;
 
  @ViewChild(IonContent) content: IonContent;

  fecha_hora_evento:string='';

  isModalOpen:any=false;
  

  public disabledDatess: Date[] = [new Date(2022, 7, 10)];

  constructor(
    private falla_servicio:FallasService,
    private loadingController:LoadingController
  ) {
    this.activar_fechas = this.activar_fechas.bind(this);
  }

  ngOnInit() {

    this.GetFallas();
    this.GetFechasCalendario();

    //var respuesta = PxpClient.Login('jjimenez','123','');
    //console.log("juan pxp ",respuesta);

  }
  GetFechasCalendario(){

      this.falla_servicio.get_fechas_calendario(0,1).subscribe(data=>{
        
        let aux=JSON.parse(JSON.stringify(data)) ;
        this.lista_fallas_calendario =[ [JSON.parse(aux.datos[0].fechas_calendario)][0] ][0];
        
      },error=>{
  
        console.log("ver errores ",JSON.stringify(error));
  
      }) 
  
  }

  activar_fechas(dateIsoString: string) {
    // const date = new Date(dateIsoString);
    const aux = this.lista_fallas_calendario.find(fecha => fecha == dateIsoString);
    if(aux){
      return true;
    }else{
      return false;
    }
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
    
    this.GetFallas();
    
  }

  pagina_siguiente(){
    
    if(this.contador_pagina+1<=this.cantidad_pagina){
      this.content.scrollToTop();
      this.contador_pagina++;
      this.start=this.start+this.limite;
      this.GetFallas();
    }
  }
  pagina_anterior(){
    
    if(this.contador_pagina-1>=1){
      this.content.scrollToTop();
      this.contador_pagina--;
      this.start=this.start-this.limite;
      this.GetFallas();
    }
  }
  pagina_inicio(){
    
    if(this.contador_pagina!=1){
      this.content.scrollToTop();
      this.contador_pagina=1;
      this.start=0;
      this.GetFallas();
    }

  }
  pagina_final(){
    
    if(this.cantidad_pagina>1 && this.contador_pagina!=this.cantidad_pagina){
      this.content.scrollToTop();
      this.contador_pagina=this.cantidad_pagina;
      this.start=(this.limite*this.cantidad_pagina)-this.limite;
      this.GetFallas();
    }

  }
  async GetFallas(){
    
    await this.mostrar_loading();
    this.get_fallas_servicio();
    
  }
  async mostrar_loading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando ...',
    });
    await this.loading.present();
  }
  get_fallas_servicio(){

    this.falla_servicio.get_fallas(this.start,this.limite,this.fecha_hora_evento).subscribe(data=>{
      
      this.bandera_inicio++;
      this.lista_fallas=JSON.parse(JSON.stringify(data)).datos;
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
  ocultar_loading(){
    try {
      this.loading.dismiss();
    } catch (error) {
      console.log("Error al ocultar loading ",error);
    }
  }



}






export function ServiceRest (url,params) {
  /*Aqui ponemos la condicion de los params*/
  if (params == '' || params == null) {
    var respuesta = PxpClient.doRequest({
                    url: url,
                    params: {
                      start: 0,
                      limit: 50,
                    },
                  });
  } else {
    var respuesta = PxpClient.doRequest({
                    url: url,
                    params:params,
                  });
  }
   return (respuesta);
}