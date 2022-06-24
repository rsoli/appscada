import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MantenimientosService {

  baseURL: string = "";
  token = "";
  headers_token:any; 

  constructor(private http:HttpClient) { }
  actualizar_accesos(){
    this.baseURL = environment.apiUrl+"MantenimientoNotificacion/";
    //this.token = JSON.parse(localStorage.getItem('accesos')|| '{}').access_token;
    this.token = '7Dam68wgCVDRfMaKqq09J9Elf4G7MOf/uwPynEPujdM=';
    
    this.headers_token = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Php-Auth-User', this.token)
    .set('Pxp-user', 'jjimenez');

  }
  get_mantenimientos(start:number,limit:number,fecha_inicio:string){ 
    //let start=0;
    //let limit=10;
    //const parametros=JSON.stringify([{'start':start,'limit':limit}]);
    try {
      this.actualizar_accesos();
      let parametros = '?start='+start+'&limit='+limit+'&fecha_inicio='+fecha_inicio;
      console.log("ver url ",this.baseURL+ 'listarMantenimientoNotificacion');
      //return this.http.get(this.baseURL + 'listarMantenimientoNotificacion'+parametros, { this.headers_token});
  
      return this.http.post(this.baseURL + 'listarMantenimientoNotificacion'+parametros, {}, {headers:this.headers_token} );

      
    } catch (error) {
      console.log("ver erores ",error);
    }
   
  }
  get_turnos(start:number,limit:number,fecha_inicio:string){ 
    //let start=0;
    //let limit=10;
    //const parametros=JSON.stringify([{'start':start,'limit':limit}]);
    try {
      this.actualizar_accesos();
      let parametros = '?start='+start+'&limit='+limit+'&fecha_inicio='+fecha_inicio;
      console.log("ver url ",this.baseURL+ 'listarTurnos');
      //return this.http.get(this.baseURL + 'listarMantenimientoNotificacion'+parametros, { this.headers_token});
  
      return this.http.post(this.baseURL + 'listarTurnos'+parametros, {}, {headers:this.headers_token} );

      
    } catch (error) {
      console.log("ver erores ",error);
    }
   
  }

}
