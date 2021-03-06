import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FallaModelo } from '../modelo/falla-modelo';
//import { clientRestPxp } from 'pxp-client';
import * as clientRestPxp from 'pxp-client'


@Injectable({
  providedIn: 'root'
})
export class FallasService {

  baseURL: string = "";
  token = "";
  headers_token:any; 

  constructor(private http:HttpClient) { }

  actualizar_accesos(){
    this.baseURL = environment.apiUrl+"FallaNotificacion/";
    this.token = '7Dam68wgCVDRfMaKqq09J9Elf4G7MOf/uwPynEPujdM=';
    
    this.headers_token = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Php-Auth-User', this.token)
    .set('Pxp-user', 'jjimenez');

  }
  get_fallas(start:number,limit:number,fecha_hora_evento:string){ 

    try {
      this.actualizar_accesos();
      let parametros = '?start='+start+'&limit='+limit+'&fecha_hora_evento='+fecha_hora_evento;
     
      return this.http.post(this.baseURL + 'listarFallaNotificacion'+parametros, {"start":"0","limit":"50","sort":"id_falla","dir":"ASC"}, {headers:this.headers_token} );

      
    } catch (error) {
      console.log("ver erores ",error);
    }
   
  }
  get_fechas_calendario(start:number,limit:number){ 

    try {
      this.actualizar_accesos();
      let parametros = '?start='+start+'&limit='+limit;
     
      return this.http.post(this.baseURL + 'listar_fechas_fallas'+parametros, {}, {headers:this.headers_token} );

      
    } catch (error) {
      console.log("ver erores ",error);
    }
   
  }





}

//http://appscada.endetransmision.bo/pxp/lib/rest/scada/FallaNotificacion/listarFallaNotificacion?start=0&limit=50