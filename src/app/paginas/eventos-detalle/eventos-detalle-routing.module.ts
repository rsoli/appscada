import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventosDetallePage } from './eventos-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: EventosDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventosDetallePageRoutingModule {}
