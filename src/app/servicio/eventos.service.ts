import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  baseURL: string = "";
  token = "";
  headers_token:any; 

  constructor(
    private http:HttpClient
  ) { }

  actualizar_accesos(){
    this.baseURL = environment.apiUrl+"ImEvento/";
    this.token = '7Dam68wgCVDRfMaKqq09J9Elf4G7MOf/uwPynEPujdM=';

    this.headers_token = new HttpHeaders().set('Content-Type', 'application/json')
    .set('Php-Auth-User', this.token)
    .set('Pxp-user', 'jjimenez');

  }
  get_eventos(start:number,limit:number,fecha_hora_evento:string){ 

    try {
      this.actualizar_accesos();
      let parametros = '?start='+start+'&limit='+limit+'&fecha_inicio='+fecha_hora_evento;
      
      return this.http.post(this.baseURL + 'listarImEvento'+parametros, {}, {headers:this.headers_token} );

    } catch (error) {
      console.log("ver erores ",error);
    }
   
  }
  get_stadistia(start:number,limit:number){ 

    try {
      this.actualizar_accesos();
      let parametros = '?start='+start+'&limit='+limit;
      
      return this.http.post(this.baseURL + 'listaEstadistica'+parametros, {}, {headers:this.headers_token} );

    } catch (error) {
      console.log("ver erores ",error);
    }
   
  }
  get_fechas_calendario(start:number,limit:number){ 

    try {
      this.actualizar_accesos();
      let parametros = '?start='+start+'&limit='+limit;
     
      return this.http.post(this.baseURL + 'listar_fechas_eventos'+parametros, {}, {headers:this.headers_token} );

      
    } catch (error) {
      console.log("ver erores ",error);
    }
   
  }
  get_yaguacua_argentina(start:number,limit:number){ 

    try {
      this.actualizar_accesos();
      let parametros = '?start='+start+'&limit='+limit;
      
      return this.http.post(this.baseURL + 'listaArgentina'+parametros, {}, {headers:this.headers_token} );

    } catch (error) {
      console.log("ver erores ",error);
    }
   
  }

}
