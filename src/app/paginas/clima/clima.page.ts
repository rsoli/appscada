import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../../servicio/clima.service';
import { LoadingController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var google;
import * as moment from 'moment';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.page.html',
  styleUrls: ['./clima.page.scss'],
})
export class ClimaPage implements OnInit {

  API_KEY = '81dHjlMAp8TTJ5Mk77R23mL7cnj2iRRD'; 
  DATA_FIELD = 'precipitationIntensity';
  TIMESTAMP = (new Date()).toISOString(); 

  map=null;

  constructor(
  ) { }

  ngOnInit() {
    this.loadMap();
    //this.prueba();
  }
  prueba(){


    // const fetch = require("node-fetch");
    // const queryString = require('query-string');
    //const moment = require("moment");
    
    // set the Timelines GET endpoint as the target URL
    const getTimelineURL = "https://api.tomorrow.io/v4/timelines";
    
    // get your key from app.tomorrow.io/development/keys
    const apikey = "81dHjlMAp8TTJ5Mk77R23mL7cnj2iRRD";
    
    // pick the location, as a latlong pair
    let location = [40.758, -73.9855];
    
    // list the fields
    const fields = [
      "precipitationIntensity",
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
    ];
    
    // choose the unit system, either metric or imperial
    const units = "imperial";
    
    // set the timesteps, like "current", "1h" and "1d"
    const timesteps = ["current", "1h", "1d"];
    
    // configure the time frame up to 6 hours back and 15 days out
    const now = moment.utc();
    const startTime = moment.utc(now).add(0, "minutes").toISOString();
    const endTime = moment.utc(now).add(1, "days").toISOString();
    
    // specify the timezone, using standard IANA timezone format
    const timezone = "America/La_Paz";
    
    // request the timelines with all the query string parameters as options
    const getTimelineParameters =  {
        apikey,
        location,
        fields,
        units,
        timesteps,
        startTime,
        endTime,
        timezone,
    };

    let API_KEY = 'kgKdoIiNMsWmIFVLwmdnvuBq4UAryObm'; 


     fetch(getTimelineURL + '/?token=' + API_KEY+'&'+JSON.stringify(getTimelineParameters)+ '/?token=' + API_KEY+'&', { method: 'GET'})
     .then(response => response.json())
     .then(data => {
      console.log(data);
      
         //alert(JSON.stringify(data));
     })
     .catch(error => {
      console.log("error",error);
         //alert(JSON.stringify(error));
     })


  }
  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map2');
    // create LatLng object
    const myLatLng = {lat: -17.20649164, lng:  -64.52166218};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 5,
      //mapTypeId: google.maps.MapTypeId.HYBRID
    });
  
    
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');

    });
  // inject the tile layer
  let imageMapType = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      if (zoom > 12) {
        return null;
      }

      
      let TIMESTAMP = (new Date()).toISOString(); 
      let DATA_FIELD = "cloudCover";
      var postTimelinesParameters = {
        location: [40.758, -73.9855],
        fields: [
          "precipitationIntensity",
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
        ],
        units: "imperial",
        timesteps: ["current"],
        timezone: "America/New_York",
      };

      // console.log("zoom ",zoom);
      //console.log("coord ",coord.x);
      //console.log("coord ",coord.y);
     // console.log("data field ",this.DATA_FIELD);
      //console.log("TIMESTAMP ",TIMESTAMP);
     // console.log("api key  ",this.API_KEY);

      //lightningFlashRateDensity  probalidad de rayo
     // precipitationIntensity    calor
     //hailBinary hielo solido no relevante
     //fireIndex  fuego
     //soilMoistureVolumetric0To10  soilMoistureVolumetric10To40 soilMoistureVolumetric40To100  soilMoistureVolumetric100To200 soilMoistureVolumetric0To200  volumen de agua retenido en los espacios de las partículas
     //temperatura suelo soilTemperature0To10   soilTemperature10To40  soilTemperature40To100  soilTemperature100To200  soilTemperature0To200
     //descargas
     //cloudCover cloudBase cloudCeiling

     //key endemaps 81dHjlMAp8TTJ5Mk77R23mL7cnj2iRRD

      let API_KEY = 'kgKdoIiNMsWmIFVLwmdnvuBq4UAryObm'; 

      //return 'https://api.tomorrow.io/v4/map/tile/'+zoom+'/'+coord.x+'/'+'/'+coord.y+'/'+'/'+DATA_FIELD+'/'+TIMESTAMP+'.png?apikey=61dec0f9a896790008924ef7';
      return `https://api.tomorrow.io/v4/map/tile/${zoom}/${coord.x}/${coord.y}/${DATA_FIELD}/${TIMESTAMP}.png?apikey=${API_KEY}`;
    },
    tileSize: new google.maps.Size(256, 256)
  });


  this.map.overlayMapTypes.push(imageMapType);
  

  }



}