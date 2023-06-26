import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Chart, LegendItem, registerables } from 'chart.js';

Chart.register(...registerables);
 
import { EventosService } from '../../servicio/eventos.service';
import * as moment from 'moment';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.page.html',
  styleUrls: ['./estadistica.page.scss'],
})
export class EstadisticaPage implements OnInit {

  private barra:Chart;

  private torta:Chart;

  private torta_label:any;
  private torta_demanda:any;
  private torta_color:any;
  private torta_total_demanda:number;
 
  private linea:Chart;
  private linea_demanda:any;
  private linea_generacion:any;
  private linea_label_generacion:any;
  private linea_label_demanda:any;
  private linea_ultima_fecha:any;
  private linea_ultima_generacion:number;
  private linea_ultima_demanda:number;

  private anillo:Chart;
  private anillo_tipo_enegia:any;
  private anillo_total_generado:any;
  private anillo_color:any;
  private anillo_ultima_fecha:any;
  private anillo_suma_total:number;

  private tabla_linea_230=[];
  private tabla_linea_115=[];
  private tabla_linea_69=[];

  private tabla_linea_500=[];
  private tabla_linea_132=[];

  fecha_hora_actual:any;
  
  start:number=0;
  limite:number=10;

  ejecucion_automatica:any;
  contador_ejecucion=0;

  loading: HTMLIonLoadingElement;

  constructor(
    private evento_servicio:EventosService,
    private loadingController:LoadingController,
  ) { }

  ngOnInit() {

    //this.GraficoBarra();

    this.get_grafico_servicio();
    this.ejecutarTiempo();
   
  }
  async get_grafico_servicio(){
    await this.mostrar_loading();
    this.getGraficos();
  }
  getGraficos(){

    this.evento_servicio.get_stadistia(this.start,this.limite).subscribe(data=>{
      
      let aux=JSON.parse(JSON.stringify(data)) ;

      // armado de tabla 230
      this.tabla_linea_230=[];
      let linea_230_length = [JSON.parse(aux.datos[0].linea_230)][0].linea.length;
     
      for (let index = 0; index < linea_230_length; index++) {
        let linea_aux = [JSON.parse(aux.datos[0].linea_230)][0].linea[index];
        let valor_aux = [JSON.parse(aux.datos[0].linea_230)][0].valor[index];
        this.tabla_linea_230.push({linea: linea_aux,valor: valor_aux});
      }
      // armado de tabla 115
      this.tabla_linea_115=[];
      let linea_115_length = [JSON.parse(aux.datos[0].linea_115)][0].linea.length;
     
      for (let index = 0; index < linea_115_length; index++) {
        let linea_aux = [JSON.parse(aux.datos[0].linea_115)][0].linea[index];
        let valor_aux = [JSON.parse(aux.datos[0].linea_115)][0].valor[index];
        this.tabla_linea_115.push({linea: linea_aux,valor: valor_aux});
      }
      // armado de tabla 69
      this.tabla_linea_69=[];
      let linea_69_length = [JSON.parse(aux.datos[0].linea_69)][0].linea.length;
     
      for (let index = 0; index < linea_69_length; index++) {
        let linea_aux = [JSON.parse(aux.datos[0].linea_69)][0].linea[index];
        let valor_aux = [JSON.parse(aux.datos[0].linea_69)][0].valor[index];
        this.tabla_linea_69.push({linea: linea_aux,valor: valor_aux});
      }
      // armado de tabla 500
      this.tabla_linea_500=[];
      let linea_500_length = [JSON.parse(aux.datos[0].linea_500)][0].linea.length;
     
      for (let index = 0; index < linea_500_length; index++) {
        let linea_aux = [JSON.parse(aux.datos[0].linea_500)][0].linea[index];
        let valor_aux = [JSON.parse(aux.datos[0].linea_500)][0].valor[index];
        this.tabla_linea_500.push({linea: linea_aux,valor: valor_aux});
      }
      // armado de tabla 132
      this.tabla_linea_132=[];
      let linea_132_length = [JSON.parse(aux.datos[0].linea_132)][0].linea.length;
     
      for (let index = 0; index < linea_132_length; index++) {
        let linea_aux = [JSON.parse(aux.datos[0].linea_132)][0].linea[index];
        let valor_aux = [JSON.parse(aux.datos[0].linea_132)][0].valor[index];
        this.tabla_linea_132.push({linea: linea_aux,valor: valor_aux});
      }
      ////////////////////
      

      this.torta_label=([JSON.parse(aux.datos[0].demanda_departamento)][0].area);
      this.torta_demanda=([JSON.parse(aux.datos[0].demanda_departamento)][0].demanda);
      this.torta_color= ([JSON.parse(aux.datos[0].demanda_departamento)][0].color);
      this.torta_total_demanda =  this.torta_demanda.reduce((a, b) => a + b, 0).toFixed(2);
    

      this.linea_label_demanda=([JSON.parse(aux.datos[0].demanda_bolivia)][0].hora);
      this.linea_demanda=([JSON.parse(aux.datos[0].demanda_bolivia)][0].demanda_total);
      this.linea_generacion= ([JSON.parse(aux.datos[0].demanda_bolivia)][0].generacion_total);


      this.anillo_tipo_enegia=([JSON.parse(aux.datos[0].tipo_energia)][0].tipo);
      this.anillo_total_generado=([JSON.parse(aux.datos[0].tipo_energia)][0].total_generado);
      this.anillo_color= ([JSON.parse(aux.datos[0].tipo_energia)][0].color);
      this.anillo_suma_total = this.anillo_total_generado.reduce((a, b) => a + b, 0).toFixed(2);
      
      // this.torta_label=this.torta_label.replaceAll("\"","\'");
      // console.log("detalle anullo  ",(this.anillo_suma_total) );
      
      let anillo_length =  [JSON.parse(aux.datos[0].tipo_energia)][0].total_generado.length;
      let anillo_fecha_aux =  moment( [JSON.parse(aux.datos[0].tipo_energia)][0].fecha_hora[anillo_length-1] );
      this.anillo_ultima_fecha = anillo_fecha_aux.format('D/M/YYYY HH:mm:ss');
      
      let linea_length =  [JSON.parse(aux.datos[0].demanda_bolivia)][0].demanda_total.length;
      let linea_fecha_aux =  moment( [JSON.parse(aux.datos[0].demanda_bolivia)][0].fecha_hora[linea_length-1] );
      this.linea_ultima_fecha = linea_fecha_aux.format('D/M/YYYY HH:mm:ss');
      this.linea_ultima_generacion=[JSON.parse(aux.datos[0].demanda_bolivia)][0].generacion_total[linea_length-1].toFixed(2);
      this.linea_ultima_demanda = [JSON.parse(aux.datos[0].demanda_bolivia)][0].demanda_total[linea_length-1].toFixed(2);
    
      
      


      
      this.fecha_hora_actual = new Date(); 

      const date = moment(this.fecha_hora_actual);
      this.fecha_hora_actual=date.format('D/M/YYYY HH:mm:ss');

      this.contador_ejecucion++;

      if(this.torta){
        this.torta.destroy();
      }
      if(this.linea){
        this.linea.destroy();
      }
      if(this.anillo){
        this.anillo.destroy();
      }

      this.GraficaTorta();
      this.GraficoLinea();
      this.GraficoAnillo();

      this.ocultar_loading();

    },error=>{

      console.log("ver errores ",JSON.stringify(error));
      this.ocultar_loading();

    }) 
  }
  ejecutarTiempo(){

  
     this.ejecucion_automatica = setInterval( () => {
          try {
            this.getGraficos();
          } catch (error) {
            console.log("erores timer");
            
          }
          
       
     }, 60000);
  }
  ngOnDestroy() {//no es necesario invocarlo se destruye automatico en ionic
    if (this.ejecucion_automatica) {
      clearInterval(this.ejecucion_automatica);
    }
  }
  GraficoAnillo(){
    const data = {
      labels: this.anillo_tipo_enegia,
      datasets: [{
        label: 'Grafico de líneas',
        data: this.anillo_total_generado,
        backgroundColor: this.anillo_color,
        hoverOffset: 4
      }]
    };
    

    const ctx:any = document.getElementById('anillo_falla');

    var item_anillo=[];

    for (let i = 0; i < this.anillo_tipo_enegia.length; i++) {
      item_anillo.push ({
        
        datasetIndex: i,
        text: this.anillo_tipo_enegia[i]+" "+this.anillo_total_generado[i],
        fillStyle: this.anillo_color[i],
        strokeStyle: "white",
        
        lineDash: [70, 70],
        
        });

    }

    let temp_anillo_suma_total=this.anillo_suma_total;
    this.anillo  = new Chart(ctx,{
      type: 'doughnut',
      data: data,
      options: {
        
        plugins: {


            tooltip: {
                
              callbacks: {
                
                  label: function(context) {

                      let aux=((context.parsed*100)/temp_anillo_suma_total).toFixed(2);
                      let texto_tooltip=' '+context.label+' '+String(aux)+' %';

                      return texto_tooltip;

                  },
                  
              }
            },

            legend: {
              
                display: true,
                position :'top',
                labels: {
                  usePointStyle: true,
                    color: 'rgb(75, 70, 70)',
                    generateLabels: (chart) =>  {

                      return item_anillo;
                    },
                    
                    
                },
                 onClick:(e,item,a)=>{console.log(e)
                  a.chart.toggleDataVisibility(item.datasetIndex);
                  a.chart.update();
                 }
            }
        }
      }

    });
    
  }
  GraficaTorta(){

    const data = {
      labels: this.torta_label,
      display: true,
      // fill: true,
      datasets: [{
        label: 'Gráfico Pie',
        data: this.torta_demanda,
        backgroundColor: this.torta_color,
        hoverOffset: 4,
       
      }]
    };
 
    // this.torta.data.


    const ctx:any = document.getElementById('torta_falla');
    
    var item_torta=[];

    for (let i = 0; i < this.torta_label.length; i++) {
      item_torta.push ({
        
        datasetIndex: i,
        text: this.torta_label[i]+" "+this.torta_demanda[i],
        fillStyle: this.torta_color[i],
        strokeStyle: "white",
        
        lineDash: [70, 70],
        
        });

    }
    let temp_total_demanda=this.torta_total_demanda;
    this.torta  = new Chart(ctx, {
      type: 'pie',
      data: data,
      
      options: {
        responsive: true,
        
        plugins: {
          
            tooltip: {
              
              callbacks: {
                
                  label: function(context) {

                       let aux=((context.parsed*100)/temp_total_demanda).toFixed(2);
                       let texto_tooltip=' '+context.label+' '+String(aux)+' %';
                       return texto_tooltip;
                      
                  },
                  
              }
            },

            legend: {
              
                display: true,
                position :'top',
                labels: {
                  usePointStyle: true,
                    color: 'rgb(75, 70, 70)',
                    generateLabels: (chart) =>  {

                      // return [{
                      //   datasetIndex: 0,
                      //   text: "1212",
                      //   fillStyle: "yellow",
                      //   strokeStyle: "white",
                      //   lineDash: [5, 5],
                      //           }];
                      return item_torta;
                    },
                    
                    
                },
                 onClick:(e,item,a)=>{console.log(e)
                  a.chart.toggleDataVisibility(item.datasetIndex);
                  a.chart.update();
                 }
            }
        }
      }
    });

    


  }
  GraficoLinea(){
// console.log("ver linea ",this.linea_label_demanda,this.linea_generacion);

    const data = {
      labels: this.linea_label_demanda,
      datasets: [
        {
        label: 'Generación',
        backgroundColor: 'rgb(255, 99, 122,0.4)',
        borderColor: 'rgb(255, 99, 132)',
        data: this.linea_generacion,
      }
       ,{
        label: 'Demanda',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        data: this.linea_demanda,
       }
    ]
    };
  
    const ctx:any = document.getElementById('linea_falla');

    this.linea  = new Chart(ctx, {
      type: 'line',
      data: data,
      options: { interaction: {
            mode: 'point'
        }}
    });

    

  }
  GraficoBarra(){

    const ctx:any = document.getElementById('barra');
    this.barra = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
          datasets: [{
              label: 'Cantidad de fallas',
              data: [12, 19, 3, 5, 2],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });


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
