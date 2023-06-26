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
    this.token = '7Dam68wgCVDRfMaKqq09J9Elf4G7MOf/uwPynEPujdM=';
    
    this.headers_token = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Php-Auth-User', this.token)
    .set('Pxp-user', 'jjimenez');

  }
  get_mantenimientos(start:number,limit:number,fecha_inicio:string){ 

    try {
      this.actualizar_accesos();
      let parametros = '?start='+start+'&limit='+limit+'&fecha_inicio='+fecha_inicio;

      return this.http.post(this.baseURL + 'listarMantenimientoNotificacion'+parametros, {}, {headers:this.headers_token} );

      
    } catch (error) {
      console.log("ver erores ",error);
    }
   
  }
  actualizar_accesos_subestaciones(){
    this.baseURL = environment.apiUrl+"ImEvento/";
    this.token = '7Dam68wgCVDRfMaKqq09J9Elf4G7MOf/uwPynEPujdM=';
    
    this.headers_token = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Php-Auth-User', this.token)
    .set('Pxp-user', 'jjimenez');

  }
  get_subestaciones(){
    try {
      let startTime:string='';
      this.actualizar_accesos_subestaciones();
      let parametros = '?start=0&limit=10000';

      return this.http.post(this.baseURL + 'listaSubestaciones'+parametros, {}, {headers:this.headers_token} );

      
    } catch (error) {
      console.log("ver erores ",error);
    }
  }
  get_turnos(start:number,limit:number,fecha_inicio:string){ 

    try {
      this.actualizar_accesos();
      let parametros = '?start='+start+'&limit='+limit+'&fecha_inicio='+fecha_inicio;
      return this.http.post(this.baseURL + 'listarTurnos'+parametros, {}, {headers:this.headers_token} );

      
    } catch (error) {
      console.log("ver erores ",error);
    }
   
  }
  get_detalle_lineas(start:number,limit:number,tension:string){ 

    try {
      this.actualizar_accesos();
      let parametros = '?start='+start+'&limit='+limit+'&tension='+tension;
      return this.http.post(this.baseURL + 'listar_detalle_linea'+parametros, {}, {headers:this.headers_token} );

      
    } catch (error) {
      console.log("ver erores ",error);
    }
   
  }
  get_fechas_calendario(start:number,limit:number){ 

    try {
      this.actualizar_accesos();
      let parametros = '?start='+start+'&limit='+limit;
     
      return this.http.post(this.baseURL + 'listar_fechas_mantenimientos'+parametros, {}, {headers:this.headers_token} );

      
    } catch (error) {
      console.log("ver erores ",error);
    }
   
  }

}
