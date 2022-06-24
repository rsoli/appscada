import { Component, OnInit,ViewChild  } from '@angular/core';
import { TurnoModelo } from '../../modelo/turno-modelo';
import { MantenimientosService } from '../../servicio/mantenimientos.service';
import { IonContent } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';
import * as moment from 'moment';

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

  lista_turnos :Array<TurnoModelo>=[];

  loading: HTMLIonLoadingElement;
 
  @ViewChild(IonContent) content: IonContent;

  fecha_inicio_turno:string='';

  constructor(
    private mantenimiento_servicio:MantenimientosService,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {
    this.GetTurno();
  }
  GetTurno(){
    
    this.mostrar_loading();
    this.get_fallas_servicio();
    
  }
  get_fallas_servicio(){

    this.mantenimiento_servicio.get_turnos(this.start,this.limite,this.fecha_inicio_turno).subscribe(data=>{
      console.log("lista mante ",data);
      
      this.bandera_inicio++;
      this.lista_turnos=JSON.parse(JSON.stringify(data)).datos;
console.log(this.lista_turnos);

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
