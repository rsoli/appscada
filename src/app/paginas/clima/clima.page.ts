import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../../servicio/clima.service';
import { LoadingController } from '@ionic/angular';
import { Chart, LegendItem, registerables } from 'chart.js';
import * as moment from 'moment';

Chart.register(...registerables);

@Component({
  selector: 'app-clima',
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
})
export class ClimaPage implements OnInit {

  location:string='';
  fields:any=[ "precipitationIntensity",
  "precipitationType",
  "windSpeed",
  "windGust",
  "windDirection",
  "temperature",
  "temperatureApparent",
  "cloudCover",
  "cloudBase",
  "cloudCeiling",
  "weatherCode",
  "humidity"
];

  startTime:string='';
  endTime:string='';
  timesteps:any=["current", "1h", "1d"];
  units:string='imperial';
  timezone:string='America/La_Paz';

  loading: HTMLIonLoadingElement;


  private linea_generacion:any;
  private linea_label_demanda:any;

  temperatura:string='';
  precipitacion_intencidad:string = '';
  velocidad_viento:string ='';
  nubes:string='';
  direccion_viento:string='';
  humedad:string='';
  fecha_hora_actual='';

  constructor(
    private ClimaService:ClimaService,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {
    this.GetClima();
  }


  async GetClima(){

    const date =moment.utc(new Date()).add(0, 'minutes');
    this.startTime=date.format('YYYY-M-D')+'T'+date.format('HH:mm:ss')+'Z';
    this.fecha_hora_actual='Fecha '+date.format('D-M-YYYY');
    const dateStart = moment.utc(date).add(1, 'day'); 
    const date2= moment(dateStart).add(1, 'days');
    this.endTime = date2.format('YYYY-M-D')+'T'+date.format('HH:mm:ss')+'Z';
    console.log("FECHA MAÑANA ",this.endTime);
                     
    // this.startTime = '2022-11-17T16:48:00Z';
    // this.endTime = this.startTime;



    // this.startTime = '2022-11-17T16:16:00Z';
    //this.endTime = '2022-11-20T16:16:00Z';

    this.LocationCochabamba();
    await this.mostrar_loading();
    this.ClimaService.get_tiempo(this.location,this.fields,this.startTime,this.endTime,this.timesteps,this.units,this.timezone).subscribe(data=>{
      
      this.ocultar_loading();
      // console.log("tiempo ", data );
      
      console.log("tiempo ", JSON.parse(JSON.stringify(data)).data.timelines[0].intervals );
      console.log("tiempo2 ", JSON.parse(JSON.stringify(data)).data);

      let linea_label= JSON.parse(JSON.stringify(data)).data.timelines[0].intervals;

      this.linea_label_demanda=[];
      this.linea_generacion=[];


      this.temperatura = (JSON.parse(JSON.stringify(data)).data.timelines[0].intervals[0].values.temperature)+ 'º';
      this.precipitacion_intencidad =(JSON.parse(JSON.stringify(data)).data.timelines[0].intervals[0].values.precipitationIntensity)+ ' pulg./h';
      this.velocidad_viento = (JSON.parse(JSON.stringify(data)).data.timelines[0].intervals[0].values.windSpeed)+ ' mph';
      this.nubes = (JSON.parse(JSON.stringify(data)).data.timelines[0].intervals[0].values.cloudCover)+ '%';
      this.direccion_viento = (JSON.parse(JSON.stringify(data)).data.timelines[0].intervals[0].values.windDirection)+ ' grados';
      this.humedad = (JSON.parse(JSON.stringify(data)).data.timelines[0].intervals[0].values.humidity)+ '%';
   /*   for (let index = 0; index < linea_label.length; index++) {
      
        let anillo_fecha_aux =  moment( linea_label[index].startTime );
        let fecha= anillo_fecha_aux.format('D/M/YYYY');

        this.linea_label_demanda.push(fecha);
        this.linea_generacion.push(linea_label[index].values.temperature);
      }



      if(this.linea){
        this.linea.destroy();
      }
*/
      console.log("generado ",this.linea_label_demanda,this.linea_generacion);
      
   
    },error=>{

      this.ocultar_loading();
      console.log("ver errores ",JSON.stringify(error));

    }) 


  }

  LocationCochabamba(){
    this.location='-66.1653224, -17.4139766';
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
