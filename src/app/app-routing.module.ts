import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import('./paginas/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'fallas',
    loadChildren: () => import('./paginas/fallas/fallas.module').then( m => m.FallasPageModule)
  },
  {
    path: 'mantenimiento',
    loadChildren: () => import('./paginas/mantenimiento/mantenimiento.module').then( m => m.MantenimientoPageModule)
  },
  {
    path: 'deuda',
    loadChildren: () => import('./paginas/deuda/deuda.module').then( m => m.DeudaPageModule)
  },
  {
    path: 'turno',
    loadChildren: () => import('./paginas/turno/turno.module').then( m => m.TurnoPageModule)
  },
  {
    path: 'estadistica',
    loadChildren: () => import('./paginas/estadistica/estadistica.module').then( m => m.EstadisticaPageModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./paginas/eventos/eventos.module').then( m => m.EventosPageModule)
  },
  {
    path: 'eventos-detalle/:id/:origen_destino',
    loadChildren: () => import('./paginas/eventos-detalle/eventos-detalle.module').then( m => m.EventosDetallePageModule)
  },
  {
    path: 'lineas',
    loadChildren: () => import('./paginas/lineas/lineas.module').then( m => m.LineasPageModule)
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'clima',
    loadChildren: () => import('./paginas/clima/clima.module').then( m => m.ClimaPageModule)
  }


];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
