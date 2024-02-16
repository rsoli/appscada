import { Component, OnInit } from '@angular/core';
//import { ViewChild, ElementRef } from '@angular/core';
import { EventosService } from '../../servicio/eventos.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-unifilares',
  templateUrl: './unifilares.page.html',
  styleUrls: ['./unifilares.page.scss'],
})
export class UnifilaresPage implements OnInit {

  //@ViewChild('myCanvas', {static: true}) myCanvas!: ElementRef;
  
   public context: CanvasRenderingContext2D;

   private lista_yaguacua_tartagal:any;
   start:number=0;
   limite:number=100;


    tar_arg_p:string='';
    tar_arg_q:string='';
    tar_arg_u:string='';
    tar_arg_freq:string='';

    // PUERTAS
    tar_arg_1dt02:Boolean=false;
    tar_arg_a732:Boolean=false;
    tar_arg_z739:Boolean=false;

    yag_p:string='';
    yag_q:string='';
    yag_u:string='';
    yag_freq:string='';

    sur_30_p:string='';
    sur_30_q:string='';

    sur_31_p:string='';
    sur_31_q:string='';

    sur_32_p:string='';
    sur_32_q:string='';
    
    ejecucion_automatica:any;
    loading: HTMLIonLoadingElement;

  constructor(
    private evento_servicio:EventosService,
    private loadingController:LoadingController,
  ) { }

  async ngOnInit() {
    await this.mostrar_loading();
    this.get_yaguacua_argentina_servicio();
    this.ejecutarTiempo();

  }
  async mostrar_loading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando ...',
    });
    await this.loading.present();
  }
  ejecutarTiempo(){

  
    this.ejecucion_automatica = setInterval( () => {
         try {
          this.get_yaguacua_argentina_servicio();
         } catch (error) {
           console.log("erores timer");
           
         }
         
      
    }, 30000);
  }
  ngOnDestroy() {//no es necesario invocarlo se destruye automatico en ionic
    if (this.ejecucion_automatica) {
      clearInterval(this.ejecucion_automatica);
    }
  }
  get_yaguacua_argentina_servicio(){
    console.log("llego2");
    this.evento_servicio.get_yaguacua_argentina(this.start,this.limite).subscribe(data=>{
      this.lista_yaguacua_tartagal=[];
      let aux=JSON.parse(JSON.stringify(data)) ;
     
     

      let lista_argentina_tartagal = aux.datos;
      console.log("llego",lista_argentina_tartagal);
      for (let index = 0; index < lista_argentina_tartagal.length; index++) {

        if(lista_argentina_tartagal[index].lado=='YAGUACUA-BOLIVIA' && lista_argentina_tartagal[index].componente=='P'){
          
          this.yag_p=lista_argentina_tartagal[index].valor;
        }
        if(lista_argentina_tartagal[index].lado=='YAGUACUA-BOLIVIA' && lista_argentina_tartagal[index].componente=='Q'){
         
          this.yag_q=lista_argentina_tartagal[index].valor;
          //console.log("llego tar_arg_q ",lista_argentina_tartagal[index].valor);
        }
        if(lista_argentina_tartagal[index].lado=='YAGUACUA-BOLIVIA' && lista_argentina_tartagal[index].componente=='U'){
          
          this.yag_u=lista_argentina_tartagal[index].valor;
        }
        if(lista_argentina_tartagal[index].lado=='YAGUACUA-BOLIVIA' && lista_argentina_tartagal[index].componente=='Frequ'){
          
          this.yag_freq=lista_argentina_tartagal[index].valor;
          // console.log("llego tar_arg_frequ ",lista_argentina_tartagal[index].valor);
        }
        if(lista_argentina_tartagal[index].lado=='TARTAGAL-ARGENTINA' && lista_argentina_tartagal[index].componente=='1DT02'){
          
          if(lista_argentina_tartagal[index].valor==0){
            this.tar_arg_1dt02 = false;// cerrado
          }else{
            this.tar_arg_1dt02 = true;//abierto
          }
        }
        if(lista_argentina_tartagal[index].lado=='YAGUACUA-BOLIVIA' && lista_argentina_tartagal[index].componente=='A732'){
          if(lista_argentina_tartagal[index].valor==0){
            this.tar_arg_a732 = false;// cerrado
          }else{
            this.tar_arg_a732 = true;//abierto
          }
        }
        if(lista_argentina_tartagal[index].lado=='YAGUACUA-BOLIVIA' && lista_argentina_tartagal[index].componente=='Z739'){

          if(lista_argentina_tartagal[index].valor==0){//logica ivertido segun scada
            this.tar_arg_z739 = true; //cerrado logica invertido
          }else{
            this.tar_arg_z739 = false;//abierto
          }
        }
        if(lista_argentina_tartagal[index].lado=='TARTAGAL-ARGENTINA' && lista_argentina_tartagal[index].componente=='P'){
          this.tar_arg_p=lista_argentina_tartagal[index].valor;
        }
        if(lista_argentina_tartagal[index].lado=='TARTAGAL-ARGENTINA' && lista_argentina_tartagal[index].componente=='Q'){
          this.tar_arg_q=lista_argentina_tartagal[index].valor;
        }
        if(lista_argentina_tartagal[index].lado=='TARTAGAL-ARGENTINA' && lista_argentina_tartagal[index].componente=='U'){
          this.tar_arg_u=lista_argentina_tartagal[index].valor;
        }
        if(lista_argentina_tartagal[index].lado=='TARTAGAL-ARGENTINA' && lista_argentina_tartagal[index].componente=='Frequ'){
          this.tar_arg_freq=lista_argentina_tartagal[index].valor;
        }

        if(lista_argentina_tartagal[index].lado=='YAGUACUA-SUR30' && lista_argentina_tartagal[index].componente=='P'){
          this.sur_30_p=lista_argentina_tartagal[index].valor;
        }
        if(lista_argentina_tartagal[index].lado=='YAGUACUA-SUR30' && lista_argentina_tartagal[index].componente=='Q'){
          this.sur_30_q=lista_argentina_tartagal[index].valor;
        }

        if(lista_argentina_tartagal[index].lado=='YAGUACUA-SUR31' && lista_argentina_tartagal[index].componente=='P'){
          this.sur_31_p=lista_argentina_tartagal[index].valor;
        }
        if(lista_argentina_tartagal[index].lado=='YAGUACUA-SUR31' && lista_argentina_tartagal[index].componente=='Q'){
          this.sur_31_q=lista_argentina_tartagal[index].valor;
        }

        if(lista_argentina_tartagal[index].lado=='YAGUACUA-SUR32' && lista_argentina_tartagal[index].componente=='P'){
          this.sur_32_p=lista_argentina_tartagal[index].valor;
        }
        if(lista_argentina_tartagal[index].lado=='YAGUACUA-SUR32' && lista_argentina_tartagal[index].componente=='Q'){
          this.sur_32_q=lista_argentina_tartagal[index].valor;
        }
       this.ocultar_loading();
      }

    },error=>{

      console.log("ver errores2 ",JSON.stringify(error));
      this.ocultar_loading();

    }) 
  
  }
  ocultar_loading(){
    try {
      this.loading.dismiss();
    } catch (error) {
      console.log("Error al ocultar loading ",error);
    }
  }
  ngAfterViewInit(){

   /*
     this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
   
     var ctx = this.context;

    //ctx.strokeStyle = "#28586F";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("Tartagal",60,40); 

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#28586F";
    //dibuja la primera línea  
    ctx.beginPath();
    ctx.moveTo(60, 50); //punto a (marger,altura)
    ctx.lineTo(350, 50); // punto B
    ctx.stroke();
    
    //dibuja la segunda línea  
    ctx.moveTo(175, 50); //punto a (marger,altura)
    ctx.lineTo(175, 150); // punto B
    ctx.stroke();


    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(140, 50); //punto a (marger,altura)
    ctx.lineTo(140, 250); // punto B
    ctx.stroke();
*/
  
 }
 

}
