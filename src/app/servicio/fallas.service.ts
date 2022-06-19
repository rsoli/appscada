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
    //this.token = JSON.parse(localStorage.getItem('accesos')|| '{}').access_token;
    this.token = '7Dam68wgCVDRfMaKqq09J9Elf4G7MOf/uwPynEPujdM=';
    
    //this.headers_token = { 'headers': { 'content-type': 'application/json',  'Accept': 'application/json', 'Php-Auth-User':this.token,  'Pxp-user':'jjimenez' } }; 



    

    this.headers_token = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Php-Auth-User', this.token)
    .set('Pxp-user', 'jjimenez');

  }
  get_fallas(start:number,limit:number,fecha_hora_evento:string){ 
    //let start=0;
    //let limit=10;
    //const parametros=JSON.stringify([{'start':start,'limit':limit}]);
    try {
      this.actualizar_accesos();
      let parametros = '?start='+start+'&limit='+limit+'&fecha_hora_evento='+fecha_hora_evento;
      console.log("ver url ",this.baseURL+ 'listarFallaNotificacion');
      //return this.http.get(this.baseURL + 'listarFallaNotificacion'+parametros, { this.headers_token});
  
      return this.http.post(this.baseURL + 'listarFallaNotificacion'+parametros, {"start":"0","limit":"50","sort":"id_falla","dir":"ASC"}, {headers:this.headers_token} );

      
    } catch (error) {
      console.log("ver erores ",error);
    }
   
  }





}

//http://appscada.endetransmision.bo/pxp/lib/rest/scada/FallaNotificacion/listarFallaNotificacion?start=0&limit=50