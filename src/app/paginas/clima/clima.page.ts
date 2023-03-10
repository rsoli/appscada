import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../../servicio/clima.service';
import { LoadingController } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var google;

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
      let DATA_FIELD = "precipitationIntensity";
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