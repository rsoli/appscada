import { Component, OnInit, ViewChild } from '@angular/core';
import { MantenimientoModelo } from '../../modelo/mantenimiento-modelo';
import { MantenimientosService } from '../../servicio/mantenimientos.service';
import { IonContent } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';
import * as moment from 'moment';


@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.page.html',
  styleUrls: ['./mantenimiento.page.scss'],
})
export class MantenimientoPage implements OnInit {

  cantidad_pagina:number=0;
  contador_pagina:number=1;
  bandera_inicio:number=0;
  start:number=0;
  limite:number=10;

  lista_mantenimientos :Array<MantenimientoModelo>=[];

  loading: HTMLIonLoadingElement;
 
  @ViewChild(IonContent) content: IonContent;

  fecha_inicio_mantenimiento:string='';

  isModalOpen:any=false;
  constructor(
    private mantenimiento_servicio:MantenimientosService,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {
    this.GetMantenimiento();
  }
  abrir_filtros(){
    this.fecha_inicio_mantenimiento=new Date().toISOString();
    this.isModalOpen=true;
  }
  aplicar_filtros(){

    this.formatDate(this.fecha_inicio_mantenimiento);
    this.isModalOpen=false;
  }

  cerrar_filtros(){
    this.isModalOpen=false;
  }
  formatDate(fecha:any){
    const date = moment(fecha);

    this.fecha_inicio_mantenimiento=date.format('D/M/YYYY');
    this.bandera_inicio=0;
    this.contador_pagina=1;
    console.log( this.fecha_inicio_mantenimiento);
    
    this.GetMantenimiento();

  }

  
  pagina_siguiente(){
    
    if(this.contador_pagina+1<=this.cantidad_pagina){
      this.content.scrollToTop();
      this.contador_pagina++;
      this.start=this.start+this.limite;
      this.GetMantenimiento();
    }
  }
  pagina_anterior(){
    
    if(this.contador_pagina-1>=1){
      this.content.scrollToTop();
      this.contador_pagina--;
      this.start=this.start-this.limite;
      this.GetMantenimiento();
    }
  }
  pagina_inicio(){
    
    if(this.contador_pagina!=1){
      this.content.scrollToTop();
      this.contador_pagina=1;
      this.start=0;
      this.GetMantenimiento();
    }

  }
  pagina_final(){
    
    if(this.cantidad_pagina>1 && this.contador_pagina!=this.cantidad_pagina){
      this.content.scrollToTop();
      this.contador_pagina=this.cantidad_pagina;
      this.start=this.limite*this.cantidad_pagina;
      this.GetMantenimiento();
    }

  }

  GetMantenimiento(){
    
    this.mostrar_loading();
    this.get_fallas_servicio();
    
  }
  get_fallas_servicio(){

    this.mantenimiento_servicio.get_mantenimientos(this.start,this.limite,this.fecha_inicio_mantenimiento).subscribe(data=>{
      console.log("lista mante ",data);
      
      this.bandera_inicio++;
      this.lista_mantenimientos=JSON.parse(JSON.stringify(data)).datos;

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
