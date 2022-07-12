import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EventosDetalleService {

  baseURL: string = "";
  token = "";
  headers_token:any; 

  constructor(
    private http:HttpClient
  ) { }

  actualizar_accesos(){
    this.baseURL = environment.apiUrl+"ImEventoDetalle/";
    this.token = '7Dam68wgCVDRfMaKqq09J9Elf4G7MOf/uwPynEPujdM=';

    this.headers_token = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Php-Auth-User', this.token)
    .set('Pxp-user', 'jjimenez');

  }
  get_evento_detalle(start:number,limit:number,id_evento:number){ 

    try {
      this.actualizar_accesos();
      let parametros = '?start='+start+'&limit='+limit+'&id_evento='+id_evento;
      console.log("ver url ",this.baseURL+ 'listarImEventoDetalle');

      return this.http.post(this.baseURL + 'listarImEventoDetalle'+parametros, {}, {headers:this.headers_token} );

    } catch (error) {
      console.log("ver erores ",error);
    }
   
  }

}
