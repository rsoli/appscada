import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  baseURL: string = "";
  token = "";
  headers_token:any; 

  constructor(
    private http:HttpClient
  ) { }
  actualizar_accesos(){
   
    this.headers_token = new HttpHeaders().set('Content-Type', 'application/json');

  }
  get_tiempo(location:string,fields:string,startTime:string,endTime:string,timesteps:string,units:string,timezone:string){ 

    try {
      this.actualizar_accesos();
      //this.baseURL = environment.apiUrl+"&location=-66.1653224, -17.4139766&fields={{fields}}&startTime=2022-11-16T11:20:00Z&endTime=2022-11-20T14:09:50Z&timesteps={{timesteps}}&units={{units}}&timezone=America/La_Paz/";
   
      let parametros = environment.apiUrlTiempo+'&location='+location+'&fields='+fields+'&startTime='+startTime+'&endTime='+endTime+'&timesteps='+timesteps+'&units='+units+'&timezone='+timezone+' ';
   
      console.log("llego url ",parametros);
      
      return this.http.get(this.baseURL+parametros, {headers:this.headers_token} );

    } catch (error) {
      console.log("ver erores ",error);
    }
   
  }
  get_geocoding(location:any){
    try {
      this.actualizar_accesos();
      //this.baseURL = environment.apiUrl+"&location=-66.1653224, -17.4139766&fields={{fields}}&startTime=2022-11-16T11:20:00Z&endTime=2022-11-20T14:09:50Z&timesteps={{timesteps}}&units={{units}}&timezone=America/La_Paz/";
   
      let url= environment.apiGeocodingNominati+'&'+location+'&zoom=27&addressdetails=1';
      console.log("ver url geocoding ",this.baseURL);
      
      return this.http.get(url, {headers:this.headers_token} );

    } catch (error) {
      console.log("ver erores ",error);
    }
  }

}
